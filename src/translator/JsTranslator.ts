import TextTranslator from '~/translator/TextTranslator';
import * as ast from '~/ast';
import { Builtin } from '~/builtin';
import { JsTargetCompiler } from '~/compiler';

// runtime
import prelude from 'raw-loader!~/runtime/js/prelude';

export default class JsTranslator extends TextTranslator {
    runtime: { [key: string]: boolean } = {};
    useModule = false;
    functionNameIndex = 0;
    functionNameMap: Map<ast.Def, string> = new Map();

    async init() {
        await super.init();
        this.runtime = {};
        this.useModule = false;
        this.functionNameIndex = 0;
        this.functionNameMap = new Map(); // key: ast yaksok node, value: function name string
    }
    getFunctionNameFromDef(def: ast.Def | Builtin): string {
        const builtinDefs = this.compiler?.builtinDefs ?? {};
        if (def instanceof Builtin) {
            switch (def) {
            case builtinDefs.보여주기: {
                this.runtime['log'] = true;
                return 'yaksokLog';
            }
            case builtinDefs.호출하기:
            case builtinDefs.호출하기2:{
                this.runtime['call'] = true;
                return 'yaksokCall';
            }
            default: throw new Error('unimplemented builtin');
            }
        }
        let functionName = this.functionNameMap.get(def);
        if (functionName == null) {
            functionName = `ys_${ this.functionNameIndex++ }_${ yaksokDescriptionToJsIdentifier(def.description) }`;
            this.functionNameMap.set(def, functionName);
        }
        return functionName;
    }
    getFunctionExprFromCall(call: ast.CallLike | ast.ModuleCallLike) {
        if (call.callInfo == null) {
            throw new Error('call이 분석 단계를 통과하지 않았습니다');
        }
        let functionName = this.getFunctionNameFromDef(call.callInfo.def);
        if (call instanceof ast.ModuleCall || call instanceof ast.ModuleCallBind)
            return `ys_m_${ call.target.value }.${ functionName }`;
        return functionName;
    }
    async prologue() {}
    async epilogue() {}
    async translate(astRoot: ast.YaksokRoot) {
        await this.init();
        this.write('(function () {\n');
        this.write(prelude);
        await this.prologue();
        this.lazyWrite(() => {
            let runtimes = [];
            for (let key in this.runtime) {
                if (this.runtime[key]) {
                    let runtime = require('raw-loader!~/runtime/js/' + key).default;
                    runtimes.push(runtime);
                }
            }
            return runtimes.join('');
        });
        if (this.compiler?.moduleOrder != null && this.compiler.moduleOrder.length > 0) {
            this.useModule = true;
            this.writeIndent();
            this.write('let yaksokModules = {\n');
            ++this.indent;
            for (let moduleHash of this.compiler.moduleOrder) {
                this.writeIndent();
                this.write(`${ JSON.stringify(moduleHash) }: {},\n`);
            }
            this.writeIndent();
            this.write(`${ JSON.stringify(astRoot.hash) }: {} // entry point\n`);
            --this.indent;
            this.write('};\n');
            for (let moduleHash of this.compiler.moduleOrder) {
                this.write('\n');
                this.writeIndent();
                this.write(`// module: ${ moduleHash }\n`);
                await this.visitYaksokRoot(this.compiler.getAstRoot(moduleHash));
            }
            this.write('\n');
            this.writeIndent();
            this.write(`// entry point: ${ astRoot.hash }\n`);
            await this.visitYaksokRoot(astRoot);
            this.write('\n');
        } else {
            await this.visitYaksokRoot(astRoot);
        }
        let exports = this.compiler instanceof JsTargetCompiler ? this.compiler?.exports : null;
        if (exports) {
            for (let [key, call] of Object.entries(exports)) {
                this.writeIndent();
                this.write(`export var ${ key } = `);
                await this.visit(call);
                this.write(';\n');
            }
        }
        await this.epilogue();
        this.write('})();');
        return this.result.join('');
    }
    async visitYaksokRoot(node: ast.YaksokRoot) {
        if (this.useModule) {
            this.write('(function () {\n');
            for (let submoduleName in node.modules) {
                this.writeIndent();
                this.write(`var ys_m_${ submoduleName } = `);
                this.write(`yaksokModules[${ JSON.stringify(node.modules[submoduleName]) }];\n`);
            }
        }
        await super.visitYaksokRoot(node);
        if (this.useModule) {
            this.writeIndent();
            this.write('{ // exports\n');
            ++this.indent;
            this.writeIndent();
            this.write(`var ys_m = yaksokModules[${ JSON.stringify(node.hash) }];\n`);
            for (let def of node.moduleScope?.defs ?? []) {
                let functionName = this.getFunctionNameFromDef(def);
                this.writeIndent();
                this.write(`ys_m.${ functionName } = ${ functionName };\n`);
            }
            --this.indent;
            this.writeIndent();
            this.write('}\n');
            this.writeIndent();
            this.write('})();\n');
        }
    }
    async visitPlainStatement(node: ast.PlainStatement) {
        this.writeIndent();
        await this.visit(node.expression);
        this.write(';\n');
    }
    async visitAssign(node: ast.Assign) {
        this.writeIndent();
        if (node.lvalue instanceof ast.Name) {
            let name = node.lvalue;
            if (node.isDeclaration) {
                this.write(`var ${ name.value } = `);
            } else {
                this.write(`${ name.value } = `);
            }
            await this.visit(node.rvalue);
        } else {
            await this.visit(node.lvalue);
            this.write(' = ');
            await this.visit(node.rvalue);
        }
        this.write(';\n');
    }
    async visitOutside(node: ast.Outside) {
        this.writeIndent();
        this.write('// nonlocal ');
        await this.visit(node.name);
        this.write('\n');
    }
    async visitCall(node: ast.Call) {
        if (node.callInfo == null) {
            throw new Error('call이 분석 단계를 통과하지 않았습니다');
        }
        let { def, args } = node.callInfo;
        let expressions = node.expressions.childNodes;
        let functionExpr = this.getFunctionExprFromCall(node);
        this.write(functionExpr);
        this.write('(');
        let first = true;
        for (let arg of args) {
            if (!first) this.write(', '); else first = false;
            await this.visit(arg);
        }
        this.write(')');
    }
    async visitModuleCall(node: ast.ModuleCall) {
        return await this.visitCall(node);
    }
    async visitCallBind(node: ast.CallBind) {
        if (node.callInfo == null) {
            throw new Error('call이 분석 단계를 통과하지 않았습니다');
        }
        let { def, args } = node.callInfo;
        let expressions = node.expressions.childNodes;
        let functionExpr = this.getFunctionExprFromCall(node);
        if (args.find(arg => arg instanceof ast.Question)) {
            let q = args.reduce(
                (prev, arg) => arg instanceof ast.Question ? prev + 1 : prev,
                0
            );
            this.write('((');
            for (let i = 0; i < q; ++i) {
                if (i > 0) this.write(',');
                this.write('_' + i);
            }
            this.write(')=>');
        } else {
            this.write('(_=>');
        }
        this.write(functionExpr);
        { // arguments
            let i = 0;
            let first = true;
            this.write('(');
            for (let arg of args) {
                if (first) first = false; else this.write(',');
                if (arg instanceof ast.Question) {
                    this.write('_' + (i++));
                } else {
                    await this.visit(arg);
                }
            }
            this.write(')');
        }
        this.write(')');
    }
    async visitModuleCallBind(node: ast.ModuleCallBind) {
        return await this.visitCallBind(node);
    }
    async visitIf(node: ast.If) {
        this.writeIndent();
        this.write('if ');
        this.write('('); await this.visit(node.condition); this.write(') ');
        this.write('{\n');
        ++this.indent;
        await this.visit(node.ifBlock);
        --this.indent;
        this.writeIndent();
        this.write('}');
        if (node.elseBlock) {
            this.write(' else {\n');
            ++this.indent;
            await this.visit(node.elseBlock);
            --this.indent;
            this.writeIndent();
            this.write('}\n');
        } else {
            this.write('\n');
        }
    }
    async visitIfNot(node: ast.IfNot) {
        this.writeIndent();
        this.write('if ');
        this.write('(!('); await this.visit(node.condition); this.write(')) ');
        this.write('{\n');
        ++this.indent;
        await this.visit(node.ifBlock);
        --this.indent;
        this.writeIndent();
        this.write('}');
        if (node.elseBlock) {
            this.write(' else {\n');
            ++this.indent;
            await this.visit(node.elseBlock);
            --this.indent;
            this.writeIndent();
            this.write('}\n');
        } else {
            this.write('\n');
        }
    }
    async visitLoop(node: ast.Loop) {
        this.writeIndent();
        this.write('while (true) {\n')
        ++this.indent;
        await this.visit(node.block);
        --this.indent;
        this.writeIndent();
        this.write('}\n');
    }
    async visitIterate(node: ast.Iterate) {
        this.writeIndent();
        this.write('for (let '); await this.visit(node.iteratee);
        this.write(' of '); await this.visit(node.iterator); this.write(') {\n');
        ++this.indent;
        await this.visit(node.block);
        --this.indent;
        this.writeIndent();
        this.write('}\n');
    }
    async visitLoopEnd(node: ast.LoopEnd) {
        this.writeIndent();
        this.write('break;\n');
    }
    async visitName(node: ast.Name) { this.write(node.value); }
    async visitString(node: ast.String) { this.write(JSON.stringify(node.value)); }
    async visitInteger(node: ast.Integer) { this.write(node.value); }
    async visitFloat(node: ast.Float) { this.write(node.value); }
    async visitBoolean(node: ast.Boolean) { this.write(node.value); }
    async visitVoid(_node: ast.Void) { this.write('void 0'); }
    async visitRange(node: ast.Range) {
        this.runtime['range'] = true;
        this.write('yaksokRange(');
        await this.visit(node.start);
        this.write(', ');
        await this.visit(node.stop);
        this.write(')');
    }
    async visitList(node: ast.List) {
        this.runtime['list'] = true;
        this.write('yaksokList([void 0');
        for (let item of node) {
            if (item == null) continue;
            this.write(', ');
            await this.visit(item);
        }
        this.write('])');
    }
    async visitDict(node: ast.Dict) {
        this.write('{');
        let first = true;
        for (let item of node) {
            if (item == null) continue;
            if (!first) this.write(', ');
            first = false;
            await this.visitDictKeyValue(item);
        }
        this.write('}');
    }
    async visitDictKeyValue(node: ast.DictKeyValue) {
        await this.visitName(node.key);
        this.write(': ');
        await this.visitExpression(node.value);
    }
    async visitUnaryPlus(node: ast.UnaryPlus) { await uop.call(this, node, '+'); }
    async visitUnaryMinus(node: ast.UnaryMinus) { await uop.call(this, node, '-'); }
    async visitBinaryOperator(node: ast.BinaryOperator) {
        switch (node.kind) {
        case ast.OperatorKind.Access:
            await this.visit(node.lhs);
            this.write('[');
            await this.visit(node.rhs);
            this.write(']');
            break;
        case ast.OperatorKind.DotAccess:
            await this.visit(node.lhs);
            this.write('.');
            await this.visit(node.rhs);
            break;
        default:
            this.write('(');
            await this.visit(node.lhs);
            this.write(` ${ reprOp(node.kind) } `);
            await this.visit(node.rhs);
            this.write(')');
        }
    }
    async visitYaksok(node: ast.Yaksok) {
        let functionName = this.getFunctionNameFromDef(node);
        let parameters = node.description.parameters.map(parameter => parameter.value);
        this.writeIndent();
        this.write(`function ${ functionName }(${ parameters.join(', ') }) `);
        this.write('{\n');
        ++this.indent;
        this.writeIndent(); this.write('var 결과;\n');
        await this.visit(node.block);
        this.writeIndent(); this.write('return 결과;\n');
        --this.indent;
        this.writeIndent();
        this.write('}\n');
    }
    async visitYaksokEnd(node: ast.YaksokEnd) {
        this.writeIndent();
        this.write('return 결과;\n');
    }
    async visitTranslate(node: ast.Translate) {
        if (this.compiler?.translateTargets.indexOf(node.target) === -1) return;
        let functionName = this.getFunctionNameFromDef(node);
        let parameters = node.description.parameters.map(parameter => parameter.value);
        this.writeIndent();
        this.write(`function ${ functionName }(${ parameters.join(', ') }) `);
        this.write('{'); this.write(node.code); this.write('}\n');
    }
}

async function uop(this: JsTranslator, node: ast.UnaryOperator, op: string) {
    this.write('(');
    this.write(`${ op } `);
    await this.visit(node.rhs);
    this.write(')');
}

function reprOp(op: ast.OperatorKind): string {
    switch (op) {
    case ast.OperatorKind.Or:
        return '||';
    case ast.OperatorKind.And:
        return '&&';
    case ast.OperatorKind.Equal:
        return '===';
    case ast.OperatorKind.NotEqual:
        return '!==';
    case ast.OperatorKind.GreaterThan:
        return '>';
    case ast.OperatorKind.LessThan:
        return '<';
    case ast.OperatorKind.GreaterThanEqual:
        return '>=';
    case ast.OperatorKind.LessThanEqual:
        return '<=';
    case ast.OperatorKind.Plus:
        return '+';
    case ast.OperatorKind.Minus:
        return '-';
    case ast.OperatorKind.Multiply:
        return '*';
    case ast.OperatorKind.Divide:
        return '/';
    case ast.OperatorKind.Modular:
        return '%';
    default:
        throw new Error('invalid operator: ' + ast.OperatorKind[op]);
    }
}

function yaksokNameToJsIdentifier(name: ast.DescriptionName) {
    let nameString = name.names[0];
    if (name.needWhiteSpace) return '_' + nameString;
    return nameString;
}

function yaksokDescriptionToJsIdentifier(description: ast.Description) {
    return description.childNodes.map(item => {
        if (item instanceof ast.DescriptionName) return yaksokNameToJsIdentifier(item);
        if (item instanceof ast.DescriptionParameter) return `_${ item.value }`;
    }).join('');
}

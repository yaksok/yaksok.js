import TextTranslator from 'translator/TextTranslator';
import * as ast from 'ast';
import { Builtin } from 'builtin';

// runtime
import prelude from 'raw!runtime/js/prelude';

export default class JsTranslator extends TextTranslator {
    async init() {
        await super.init();
        this.runtime = {};
        this.useModule = false;
        this.functionNameIndex = 0;
        this.functionNameMap = new Map(); // key: ast yaksok node, value: function name string
    }
    getFunctionNameFromDef(def) {
        if (def instanceof Builtin) {
            switch (def) {
            case this.compiler.builtinDefs.보여주기: {
                this.runtime['log'] = true;
                return 'yaksokLog';
            }
            case this.compiler.builtinDefs.호출하기:
            case this.compiler.builtinDefs.호출하기2:{
                this.runtime['call'] = true;
                return 'yaksokCall';
            }
            default: throw new Error('unimplemented builtin');
            }
        }
        if (this.functionNameMap.has(def)) {
            return this.functionNameMap.get(def);
        }
        let functionName = `ys_${ this.functionNameIndex++ }_${ yaksokDescriptionToJsIdentifier(def.description) }`;
        this.functionNameMap.set(def, functionName);
        return functionName;
    }
    getFunctionExprFromCall(call) {
        let functionName = this.getFunctionNameFromDef(call.callInfo.def);
        if (call instanceof ast.ModuleCall || call instanceof ast.ModuleCallBind)
            return `ys_m_${ call.target.value }.${ functionName }`;
        return functionName;
    }
    async translate(astRoot) {
        await this.init();
        this.write('(function () {\n');
        this.write(prelude);
        this.lazyWrite(_=> {
            let runtimes = [];
            for (let key in this.runtime) {
                if (this.runtime[key]) {
                    let runtime = require('raw!runtime/js/' + key);
                    runtimes.push(runtime);
                }
            }
            return runtimes.join('');
        });
        if (this.compiler.moduleOrder.length > 0) {
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
        let { exports } = this.compiler;
        if (exports) {
            for (let [key, call] of Object.entries(exports)) {
                this.writeIndent();
                this.write(`export var ${ key } = `);
                await this.visit(call);
                this.write(';\n');
            }
        }
        this.write('})();');
        return this.result.join('');
    }
    async visitYaksokRoot(node) {
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
            for (let def of node.moduleScope.defs) {
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
    async visitPlainStatement(node) {
        this.writeIndent();
        await this.visit(node.expression);
        this.write(';\n');
    }
    async visitAssign(node) {
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
    async visitOutside(node) {
        this.writeIndent();
        this.write('// nonlocal ');
        await this.visit(node.name);
        this.write('\n');
    }
    async visitCall(node) {
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
    async visitModuleCall(node) {
        return await this.visitCall(node);
    }
    async visitCallBind(node) {
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
    async visitModuleCallBind(node) {
        return await this.visitCallBind(node);
    }
    async visitIf(node) {
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
    async visitIfNot(node) {
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
    async visitLoop(node) {
        this.writeIndent();
        this.write('while (true) {\n')
        ++this.indent;
        await this.visit(node.block);
        --this.indent;
        this.writeIndent();
        this.write('}\n');
    }
    async visitIterate(node) {
        this.writeIndent();
        this.write('for (let '); await this.visit(node.iteratee);
        this.write(' of '); await this.visit(node.iterator); this.write(') {\n');
        ++this.indent;
        await this.visit(node.block);
        --this.indent;
        this.writeIndent();
        this.write('}\n');
    }
    async visitLoopEnd(node) {
        this.writeIndent();
        this.write('break;\n');
    }
    async visitName(node) { this.write(node.value); }
    async visitString(node) { this.write(JSON.stringify(node.value)); }
    async visitInteger(node) { this.write(node.value); }
    async visitFloat(node) { this.write(node.value); }
    async visitBoolean(node) { this.write(node.value); }
    async visitVoid(node) { this.write('void 0'); }
    async visitRange(node) {
        this.runtime['range'] = true;
        this.write('yaksokRange(');
        await this.visit(node.start);
        this.write(', ');
        await this.visit(node.stop);
        this.write(')');
    }
    async visitList(node) {
        this.runtime['list'] = true;
        this.write('yaksokList([void 0');
        for (let item of node) {
            this.write(', ');
            await this.visit(item);
        }
        this.write('])');
    }
    async visitDict(node) {
        this.write('{');
        let first = true;
        for (let item of node) {
            if (!first) this.write(', ');
            first = false;
            await this.visitDictKeyValue(item);
        }
        this.write('}');
    }
    async visitDictKeyValue(node) {
        await this.visitName(node.key);
        this.write(': ');
        await this.visitExpression(node.value);
    }
    async visitAccess(node) {
        await this.visit(node.lhs);
        this.write('[');
        await this.visit(node.rhs);
        this.write(']');
    }
    async visitDotAccess(node) {
        await this.visit(node.lhs);
        this.write('.');
        await this.visit(node.rhs);
    }
    async visitOr(node) { await op.call(this, node, '||'); }
    async visitAnd(node) { await op.call(this, node, '&&'); }
    async visitEqual(node) { await op.call(this, node, '==='); }
    async visitNotEqual(node) { await op.call(this, node, '!=='); }
    async visitGreaterThan(node) { await op.call(this, node, '>'); }
    async visitLessThan(node) { await op.call(this, node, '<'); }
    async visitGreaterThanEqual(node) { await op.call(this, node, '>='); }
    async visitLessThanEqual(node) { await op.call(this, node, '<='); }
    async visitPlus(node) { await op.call(this, node, '+'); }
    async visitMinus(node) { await op.call(this, node, '-'); }
    async visitMultiply(node) { await op.call(this, node, '*'); }
    async visitDivide(node) { await op.call(this, node, '/'); }
    async visitModular(node) { await op.call(this, node, '%'); }
    async visitYaksok(node) {
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
    async visitYaksokEnd(node) {
        this.writeIndent();
        this.write('return 결과;\n');
    }
    async visitTranslate(node) {
        if (this.compiler.translateTargets.indexOf(node.target) === -1) return;
        let functionName = this.getFunctionNameFromDef(node);
        let parameters = node.description.parameters.map(parameter => parameter.value);
        this.writeIndent();
        this.write(`function ${ functionName }(${ parameters.join(', ') }) `);
        this.write('{'); this.write(node.code); this.write('}\n');
    }
}

async function op(node, op) {
    this.write('(');
    await this.visit(node.lhs);
    this.write(` ${ op } `);
    await this.visit(node.rhs);
    this.write(')');
}

function yaksokNameToJsIdentifier(name) {
    let nameString = name.names[0];
    if (name.needWhiteSpace) return '_' + nameString;
    return nameString;
}

function yaksokDescriptionToJsIdentifier(description) {
    return description.childNodes.map(item => {
        if (item instanceof ast.DescriptionName) return yaksokNameToJsIdentifier(item);
        if (item instanceof ast.DescriptionParameter) return `_${ item.value }`;
    }).join('');
}

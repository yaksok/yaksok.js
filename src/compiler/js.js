import * as ast from 'ast';
import {
    Builtin,
    yaksok as builtinYaksok
} from 'builtin';
import YaksokCompiler from 'compiler';

// runtime
import prelude from 'raw!runtime/js/prelude';

export default class JsTargetCompiler extends YaksokCompiler {
    constructor() {
        super();
        this.translateTargets = ['js', 'javascript', '자바스크립트'];
    }
    writeIndent() { this.result.push(Array(this.indent + 1).join('    ')); }
    init() {
        super.init();
        this.indent = 0;
        this.runtime = {};
        this.functionNameIndex = 0;
        this.functionNameMap = new Map(); // key: ast yaksok node, value: function name string
    }
    getFunctionNameFromDef(def) {
        if (this.functionNameMap.has(def)) {
            return this.functionNameMap.get(def);
        }
        let functionName = `y${ this.functionNameIndex++ }s${ yaksokDescriptionToJsIdentifier(def.description) }`;
        this.functionNameMap.set(def, functionName);
        return functionName;
    }
    async compile(code) {
        this.init();
        const astRoot = await this.prepareAstRoot(code);
        this.write('(function () {\n');
        this.write(prelude);
        this.write({toString: () => {
            let runtimes = [];
            for (let key in this.runtime) {
                if (this.runtime[key]) {
                    let runtime = require('raw!runtime/js/' + key);
                    runtimes.push(runtime);
                }
            }
            return runtimes.join('');
        }});
        await this.visit(astRoot);
        this.write('})();');
        return this.result.join('');
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
        this.write('// global ');
        await this.visit(node.name);
        this.write('\n');
    }
    async visitCall(node) {
        let { def, args } = node.callInfo;
        let expressions = node.expressions.childNodes;
        if (def instanceof Builtin) {
            switch (def) {
            case builtinYaksok.보여주기: {
                let arg = args[0];
                switch (arg.type) {
                case ast.Integer: case ast.Float: case ast.String: {
                    this.write('console.log(');
                    await this.visit(args[0]);
                    this.write(')');
                } return;
                case ast.Void: {
                    this.write('console.log("()"');
                } return;
                case ast.Boolean: {
                    this.write('console.log("' + (arg.value ? '참' : '거짓') + '")');
                } return;
                default: {
                    this.runtime['log'] = true;
                    this.write('yaksokLog(');
                    await this.visit(arg);
                    this.write(')');
                } return;
                }
            } return;
            default: throw new Error('unimplemented builtin yaksok');
            }
        }
        let functionName = this.getFunctionNameFromDef(def);
        this.write(functionName);
        this.write('(');
        let first = true;
        for (let arg of args) {
            if (!first) this.write(', ');
            first = false;
            await this.visit(arg);
        }
        this.write(')');
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
        if (this.translateTargets.indexOf(node.target) === -1) return;
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

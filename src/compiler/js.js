import * as ast from 'ast';
import {
    NodeVisitor,
    Name,
} from 'ast';
import parser from 'parser';

// runtime
import prelude from 'raw!runtime/js/prelude';

export default class JsCompiler extends NodeVisitor {
    constructor() {
        super();
        this.init();
    }
    write(code) { this.result.push(code); }
    writeIndent() { this.result.push(Array(this.indent + 1).join('    ')); }
    init() {
        this.result = [];
        this.indent = 0;
        this.runtime = {};
        this.globalScope = new Scope(); this.globalScope.global = this.globalScope;
        this.currentScope = this.globalScope;
        this.functionNameIndex = 0;
        this.functionNameMap = new Map(); // key: ast yaksok node, value: function name string
    }
    getFunctionNameFromYaksok(yaksok) {
        if (this.functionNameMap.has(yaksok)) {
            return this.functionNameMap.get(yaksok);
        }
        let functionName = `y${ this.functionNameIndex++ }s${ yaksokDescriptionToJsIdentifier(yaksok.description) }`;
        this.functionNameMap.set(yaksok, functionName);
        return functionName;
    }
    async compile(code) {
        this.init();
        let root = parser.parse(code);
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
        await this.visit(root); 
        this.write('})();');
        return this.result.join('');
    }
    async visitStatement(node) {
        this.writeIndent();
        await this.visit(node.expression);
        this.write(';\n');
    }
    async visitCall(node) {
        let expressions = node.expressions;
        if (expressions.length === 2) {
            let name = expressions[1];
            if (name instanceof Name && name.value === '보여주기') {
                this.runtime['log'] = true;
                this.write('yaksokLog(');
                await this.visit(expressions[0]);
                this.write(')');
                return;
            }
        }
        let { def, args } = this.currentScope.getCallInfo(node);
        let functionName = this.getFunctionNameFromYaksok(def);
        this.write(functionName);
        this.write('(');
        let first = true;
        for (let arg of args) {
            if (!first) this.write(',');
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
    async visitRange(node) {
        this.runtime['range'] = true;
        this.write('yaksokRange(');
        await this.visit(node.start);
        this.write(',');
        await this.visit(node.stop);
        this.write(')');
    }
    async visitList(node) {
        this.runtime['list'] = true;
        this.write('yaksokList([void 0');
        for (let item of node) {
            this.write(',');
            await this.visit(item);
        }
        this.write('])');
    }
    async visitAccess(node) {
        this.write('(');
        await this.visit(node.lhs);
        this.write('[');
        await this.visit(node.rhs);
        this.write('])');
    }
    async visitAssignStatement(node) {
        this.writeIndent();
        if (node.lhs instanceof Name) {
            let name = node.lhs;
            let scope = this.currentScope;
            if (scope.hasVariable(name, true)) {
                this.write(`${ name.value } = `);
            } else {
                scope.addVariable(name);
                this.write(`var ${ name.value } = `);
            }
            await this.visit(node.rhs);
        } else {
            await op.call(this, node, '=');
        }
        this.write(';\n');
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
        let functionName = this.getFunctionNameFromYaksok(node);
        let parameters = node.description.parameters.map(parameter => parameter.value);
        this.writeIndent();
        this.write(`function ${ functionName }(${ parameters.join(', ') }) `);
        this.write('{\n');
        ++this.indent;
        {
            let scope = this.currentScope;
            scope.addDef(node);
            this.currentScope = scope.newChildScope();
            await this.visit(node.block);
            this.currentScope = scope;
        }
        this.writeIndent(); this.write('return 결과;\n');
        --this.indent;
        this.writeIndent();
        this.write('}\n');
    }
    async visitYaksokEnd(node) {
        this.writeIndent();
        this.write('return 결과;\n');
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
    let nameString = name[0];
    if (name.needWhiteSpace) return '_' + nameString;
    return nameString;
}

function yaksokDescriptionToJsIdentifier(description) {
    return description.map(item => {
        if (item instanceof ast.YaksokName) return yaksokNameToJsIdentifier(item);
        if (item instanceof ast.YaksokParameter) return `_${ item.value }`;
    }).join('');
}

class Scope {
    variables = [];
    defs = [];
    parent = null;
    global = null;
    addVariable(name) {
        this.variables.push(name);
    }
    hasVariable(name, local=false) {
        let hasLocal = this.variables.some(item => item.value === name.value);
        if (local) {
            return hasLocal;
        } else {
            if (hasLocal) return true;
            if (this.parent) return this.parent.hasVariable(name);
        }
        return false;
    }
    addDef(def) { this.defs.push(def); }
    getCallInfo(call) {
        let matchDef = null;
        let args = null;
        for (let def of this.defs) {
            args = def.match(call);
            if (args) {
                if (matchDef) throw new Error('호출 가능한 정의가 여러개입니다');
                matchDef = def;
            }
        }
        if (matchDef) {
            return new CallInfo(matchDef, args);
        }
        if (this.parent) {
            return this.parent.getCallInfo(call);
        }
        throw new Error('호출 가능한 정의를 찾지 못했습니다');
    }
    newChildScope() {
        let child = new Scope();
        child.global = this.global;
        child.parent = this;
        return child;
    }
}

class CallInfo {
    constructor(def, args) {
        this.def = def;
        this.args = args;
    }
}

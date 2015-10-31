import * as ast from 'ast';
import {
    NodeVisitor,
    Name,
} from 'ast';

export default class Analyzer extends NodeVisitor {
    init() {
        super.init();
        this.globalScope = new Scope(); this.globalScope.global = this.globalScope;
        this.currentScope = this.globalScope;
    }
    async analyze(astRoot) {
        this.init();
        astRoot.statements.scope = this.globalScope;
        await this.visit(astRoot);
    }
    async visitCall(node) {
        let callInfo = this.currentScope.getCallInfo(node);
        node.callInfo = callInfo;
        for (let arg of callInfo.args) await this.visit(arg);
    }
    async visitAssign(node) {
        if (node.lvalue instanceof Name) {
            let name = node.lvalue;
            let scope = this.currentScope;
            if (!scope.hasVariable(name, true)) {
                scope.addVariable(name);
                node.isDeclaration = true;
            }
        } else {
            await this.visit(node.lvalue);
        }
        await this.visit(node.rvalue);
    }
    async visitYaksok(node) {
        let scope = this.currentScope;
        scope.addDef(node);
        let currentScope = scope.newChildScope();
        this.currentScope = currentScope;
        node.block.scope = currentScope;
        currentScope.addVariable(new Name('결과'));
        await this.visit(node.block);
        this.currentScope = scope;
    }
    async visitTranslate(node) {
        if (this.translateTargets.indexOf(node.target) === -1) return;
        this.currentScope.addDef(node);
    }
}

export class Scope {
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
                if (matchDef) throw new Error('같은 스코프 안에서 호출 가능한 정의가 여러개입니다');
                matchDef = def;
            }
        }
        if (matchDef) {
            return new CallInfo(matchDef, args);
        }
        if (this.parent) {
            return this.parent.getCallInfo(call);
        }
        { // 임시 빌트인
            let expressions = call.expressions.childNodes;
            if (expressions.length === 2) {
                let name = expressions[1];
                if (name instanceof Name && name.value === '보여주기') {
                    // TODO: 빌트인 약속은 어떻게?
                    return new CallInfo(null, [expressions[0]]);
                }
            }
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

export class CallInfo {
    constructor(def, args) {
        this.def = def;
        this.args = args;
    }
}

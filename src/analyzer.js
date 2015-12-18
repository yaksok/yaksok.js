import * as ast from 'ast';
import {
    NodeVisitor,
    Name,
} from 'ast';
import { yaksok as builtinYaksok } from 'builtin';

export default class Analyzer extends NodeVisitor {
    async prepare(moduleHash) {
        this.currentScope = new Scope();
        this.currentAstRoot = await this.compiler.getAstRoot(moduleHash);
        this.currentAstRoot.statements.scope = this.currentScope;
        return this.currentAstRoot;
    }
    async analyze(astRoot) {
        await this.init();
        // analyze modules
        for (let moduleHash of this.compiler.moduleOrder) {
            await this.visit(await this.prepare(moduleHash));
        }
        // analyze entry point
        await this.visit(await this.prepare());
    }
    async visitCall(node) {
        let callInfo = this.currentScope.getCallInfo(node, this.compiler.builtinDefs);
        node.callInfo = callInfo;
        for (let arg of callInfo.args) {
            await this.visit(arg);
            if (arg instanceof Name) {
                let name = arg;
                name.type = this.currentScope.getVariableType(name);
            }
        }
    }
    async visitModuleCall(node) {
        let moduleHash = this.currentAstRoot.modules[node.target.value];
        let moduleAstRoot = await this.compiler.getAstRoot(moduleHash);
        let { moduleScope } = moduleAstRoot;
        let callInfo = moduleScope.getCallInfo(node);
        node.callInfo = callInfo;
        for (let arg of callInfo.args) {
            await this.visit(arg);
            if (arg instanceof Name) {
                let name = arg;
                name.type = this.currentScope.getVariableType(name);
            }
        }
    }
    async visitOutside(node) {
        let scope = this.currentScope;
        let { name } = node;
        if (scope.hasVariable(name, false)) {
            scope.addVariable(name);
        } else {
            throw new Error('해당하는 바깥 변수를 찾지 못했습니다');
        }
    }
    async visitAssign(node) {
        await this.visit(node.rvalue);
        if (node.lvalue instanceof Name) {
            let name = node.lvalue;
            name.type = node.rvalue.type;
            let scope = this.currentScope;
            if (!scope.hasVariable(name)) {
                scope.addVariable(name);
                node.isDeclaration = true;
            } else {
                scope.updateVariable(name);
            }
        } else {
            await this.visit(node.lvalue);
        }
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
        if (this.compiler.translateTargets.indexOf(node.target) === -1) return;
        this.currentScope.addDef(node);
    }
}

export class Scope {
    variables = [];
    defs = [];
    parent = null;
    updateVariable(name) { // for static type analysis
        let localIndex = this.variables.findIndex(item => item.value === name.value);
        if (localIndex === -1) {
            throw new Error('cannot update variable')
        } else {
            this.variables[localIndex] = name;
        }
    }
    addVariable(name) {
        this.variables.push(name);
    }
    hasVariable(name, local=true) {
        let hasLocal = this.variables.some(item => item.value === name.value);
        if (local) {
            return hasLocal;
        } else {
            if (hasLocal) return true;
            if (this.parent) return this.parent.hasVariable(name);
        }
        return false;
    }
    getVariableType(name, local=true) {
        let localVariable = this.variables.find(item => item.value === name.value);
        if (!localVariable) return null;
        let localType = localVariable.type;
        if (local) {
            return localType;
        } else {
            if (localType) return localType;
            if (this.parent) return this.parent.getVariableType(name);
        }
        return null;
    }
    addDef(def) { this.defs.push(def); }
    getCallInfo(call, builtinDefs={}) {
        let matchArgs = null;
        let matchDefs = [];
        for (let def of this.defs) {
            let args = def.match(call);
            if (args) {
                matchArgs = args;
                matchDefs.push(def);
            }
        }
        if (matchDefs.length === 1) {
            return new CallInfo(matchDefs[0], matchArgs);
        } else if (matchDefs.length > 1) {
            throw new Error(
                '같은 스코프 안에서 호출 가능한 정의가 여러개입니다:\n' +
                matchDefs.map(def => '    ' + def.repr).join('\n')
            );
        }
        if (this.parent) {
            return this.parent.getCallInfo(call, builtinDefs);
        }
        for (const key of Object.keys(builtinDefs)) {
            let def = builtinDefs[key];
            let args = def.match(call);
            if (args) return new CallInfo(def, args);
        }
        throw new Error('호출 가능한 정의를 찾지 못했습니다');
    }
    newChildScope() {
        let child = new Scope();
        child.parent = this;
        return child;
    }
}

export class ModuleScope extends Scope {}

export class CallInfo {
    constructor(def, args) {
        this.def = def;
        this.args = args;
    }
}

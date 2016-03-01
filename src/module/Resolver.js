import NodeVisitor from 'ast/NodeVisitor';
import { Def } from 'ast';
import { ModuleScope } from 'analyzer';
import { CommonContext } from 'module/context';

export default class Resolver extends NodeVisitor {
    constructor() {
        super();
        this.loader = null; // see compiler.Compiler init method
    }
    async init() {
        await super.init();
        this.submoduleNames = [];
    }
    pushModuleOrder(moduleHash) {
        let entryHash = this.compiler.entryContext.hash();
        if (entryHash === moduleHash) return;
        let index = this.compiler.moduleOrder.indexOf(moduleHash);
        if (index === -1) this.compiler.moduleOrder.push(moduleHash);
    }
    async resolve(context) {
        let moduleHash = context.hash();
        { // pragma once
            if (this.compiler.astMap[moduleHash])
                return this.compiler.astMap[moduleHash];
        }
        await this.init();
        let astRoot = await this.loader.get(context);
        this.compiler.astMap[moduleHash] = astRoot;
        astRoot.hash = moduleHash;
        { // module scope
            let moduleScope = new ModuleScope();
            for (let statement of astRoot.statements) {
                if (statement instanceof Def) {
                    moduleScope.addDef(statement);
                }
            }
            astRoot.moduleScope = moduleScope;
        }
        { // dependency
            await this.visit(astRoot);
            for (let submoduleName of this.submoduleNames) {
                let submoduleResolver = new Resolver();
                submoduleResolver.compiler = this.compiler;
                submoduleResolver.loader = this.loader;
                let submoduleContext = new CommonContext();
                submoduleContext.from = context;
                submoduleContext.name = submoduleName;
                let submoduleHash = submoduleContext.hash();
                let submoduleAstRoot = submoduleResolver.resolve(submoduleContext);
                this.compiler.astMap[submoduleHash] = submoduleAstRoot;
                astRoot.modules[submoduleName] = submoduleHash;
                this.pushModuleOrder(submoduleHash);
            }
        }
        return astRoot;
    }
    // analyzer 패스를 거치지 않았으면 callInfo에 접근할 수가 없다.
    // module resolve 패스는 analyzer 패스보다 먼저 돌기 때문에
    // callInfo를 통해 args에 접근하는 대신,
    // call expression, module call expression안의 expressions를 직접 순회한다.
    // module resolve 패스에서는
    // module call expression에 대해서만 부수효과를 발생시키기 때문에
    // 유효하지 않은 expression을 순회하더라도 큰 문제가 없기 때문이다.
    async visitCall(node) {
        for (let expression of node.expressions) {
            await this.visit(expression);
        }
    }
    async visitModuleCall(node) {
        this.submoduleNames.push(node.target.value);
        for (let expression of node.expressions) {
            await this.visit(expression);
        }
    }
};

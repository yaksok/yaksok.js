import * as ast from 'ast';

export default class NodeVisitor {
    constructor() {
        this.translateTargets = [];
    }
    async init() {}
    async visit(node) {
        if (node instanceof ast.YaksokRoot) return await this.visitYaksokRoot(node);
        if (node instanceof ast.Statements) return await this.visitStatements(node);
        if (node instanceof ast.Statement) return await this.visitStatement(node);
        if (node instanceof ast.Expressions) return await this.visitExpressions(node);
        if (node instanceof ast.Expression) return await this.visitExpression(node);
        if (node instanceof ast.Description) return await this.visitDescription(node);
        if (node instanceof ast.DescriptionParameter) return await this.visitDescriptionParameter(node);
        if (node instanceof ast.DescriptionName) return await this.visitDescriptionName(node);
        throw new Error('unknown node type');
    }
    async visitYaksokRoot(node) { await this.visitStatements(node.statements); }
    async visitStatements(node) { for (let statement of Array.from(node)) await this.visitStatement(statement); }
    async visitStatement(node) {
        if (node instanceof ast.PlainStatement) return await this.visitPlainStatement(node);
        if (node instanceof ast.Assign) return await this.visitAssign(node);
        if (node instanceof ast.Outside) return await this.visitOutside(node);
        if (node instanceof ast.Condition) return await this.visitCondition(node);
        if (node instanceof ast.Loop) return await this.visitLoop(node);
        if (node instanceof ast.Iterate) return await this.visitIterate(node);
        if (node instanceof ast.LoopEnd) return await this.visitLoopEnd(node);
        if (node instanceof ast.YaksokEnd) return await this.visitYaksokEnd(node);
        if (node instanceof ast.Def) return await this.visitDef(node);
        throw new Error('unknown node type');
    }
    async visitPlainStatement(node) { await this.visitExpression(node.expression); }
    async visitAssign(node) {
        await this.visit(node.rvalue); // attention: evaluation order
        await this.visit(node.lvalue);
    }
    async visitOutside(node) {
        await this.visit(node.name);
    }
    async visitCall(node) {}
    async visitModuleCall(node) {}
    async visitCallBind(node) {}
    async visitModuleCallBind(node) {}
    async visitCondition(node) {
        if (node instanceof ast.If) return await this.visitIf(node);
        if (node instanceof ast.IfNot) return await this.visitIfNot(node);
        throw new Error('unknown node type');
    }
    async visitIf(node) {
        await this.visit(node.condition);
        await this.visitStatements(node.ifBlock);
        if (node.elseBlock) {
            await this.visitStatements(node.elseBlock);
        }
    }
    async visitIfNot(node) {
        await this.visit(node.condition);
        await this.visitStatements(node.ifBlock);
        if (node.elseBlock) {
            await this.visitStatements(node.elseBlock);
        }
    }
    async visitLoop(node) { await this.visit(node.block); }
    async visitIterate(node) {
        await this.visit(node.iteratee);
        await this.visit(node.iterator);
        await this.visit(node.block);
    }
    async visitLoopEnd(node) {}
    async visitYaksokEnd(node) {}
    async visitExpressions(node) { for (let expression of Array.from(node)) await this.visitExpression(expression); }
    async visitExpression(node) {
        if (node instanceof ast.Call) return await this.visitCall(node);
        if (node instanceof ast.ModuleCall) return await this.visitModuleCall(node);
        if (node instanceof ast.CallBind) return await this.visitCallBind(node);
        if (node instanceof ast.ModuleCallBind) return await this.visitModuleCallBind(node);
        if (node instanceof ast.Primitive) return await this.visitPrimitive(node);
        if (node instanceof ast.Range) return await this.visitRange(node);
        if (node instanceof ast.List) return await this.visitList(node);
        if (node instanceof ast.Dict) return await this.visitDict(node);
        if (node instanceof ast.UnaryOperator) return await this.visitUnaryOperator(node);
        if (node instanceof ast.BinaryOperator) return await this.visitBinaryOperator(node);
        if (node instanceof ast.Question) return await this.visitQuestion(node);
        throw new Error('unknown node type');
    }
    async visitPrimitive(node) {
        if (node instanceof ast.Name) return await this.visitName(node);
        if (node instanceof ast.String) return await this.visitString(node);
        if (node instanceof ast.Integer) return await this.visitInteger(node);
        if (node instanceof ast.Float) return await this.visitFloat(node);
        if (node instanceof ast.Boolean) return await this.visitBoolean(node);
        if (node instanceof ast.Void) return await this.visitVoid(node);
        throw new Error('unknown node type');
    }
    async visitName(node) {}
    async visitString(node) {}
    async visitInteger(node) {}
    async visitFloat(node) {}
    async visitBoolean(node) {}
    async visitVoid(node) {}
    async visitQuestion(node) {}
    async visitRange(node) {
        await this.visit(node.start);
        await this.visit(node.stop);
    }
    async visitList(node) { for (let item of Array.from(node)) await this.visitExpression(item); }
    async visitDict(node) { for (let item of Array.from(node)) await this.visitDictKeyValue(item); }
    async visitDictKeyValue(node) {
        await this.visitName(node.key);
        await this.visitExpression(node.value);
    }
    async visitUnaryOperator(node) {
        if (node instanceof ast.UnaryPlus) return await this.visitUnaryPlus(node);
        if (node instanceof ast.UnaryMinus) return await this.visitUnaryMinus(node);
    }
    async visitUnaryPlus(node) { await visitUnaryOperator.call(this, node); }
    async visitUnaryMinus(node) { await visitUnaryOperator.call(this, node); }
    async visitBinaryOperator(node) {
        if (node instanceof ast.Access) return await this.visitAccess(node);
        if (node instanceof ast.DotAccess) return await this.visitDotAccess(node);
        if (node instanceof ast.Or) return await this.visitOr(node);
        if (node instanceof ast.And) return await this.visitAnd(node);
        if (node instanceof ast.Equal) return await this.visitEqual(node);
        if (node instanceof ast.NotEqual) return await this.visitNotEqual(node);
        if (node instanceof ast.GreaterThan) return await this.visitGreaterThan(node);
        if (node instanceof ast.LessThan) return await this.visitLessThan(node);
        if (node instanceof ast.GreaterThanEqual) return await this.visitGreaterThanEqual(node);
        if (node instanceof ast.LessThanEqual) return await this.visitLessThanEqual(node);
        if (node instanceof ast.Plus) return await this.visitPlus(node);
        if (node instanceof ast.Minus) return await this.visitMinus(node);
        if (node instanceof ast.Multiply) return await this.visitMultiply(node);
        if (node instanceof ast.Divide) return await this.visitDivide(node);
        if (node instanceof ast.Modular) return await this.visitModular(node);
        throw new Error('unknown node type');
    }
    async visitAccess(node) { await visitOperator.call(this, node); }
    async visitDotAccess(node) { await visitOperator.call(this, node); }
    async visitOr(node) { await visitOperator.call(this, node); }
    async visitAnd(node) { await visitOperator.call(this, node); }
    async visitEqual(node) { await visitOperator.call(this, node); }
    async visitNotEqual(node) { await visitOperator.call(this, node); }
    async visitGreaterThan(node) { await visitOperator.call(this, node); }
    async visitLessThan(node) { await visitOperator.call(this, node); }
    async visitGreaterThanEqual(node) { await visitOperator.call(this, node); }
    async visitLessThanEqual(node) { await visitOperator.call(this, node); }
    async visitPlus(node) { await visitOperator.call(this, node); }
    async visitMinus(node) { await visitOperator.call(this, node); }
    async visitMultiply(node) { await visitOperator.call(this, node); }
    async visitDivide(node) { await visitOperator.call(this, node); }
    async visitModular(node) { await visitOperator.call(this, node); }
    async visitDescription(node) {}
    async visitDescriptionParameter(node) {}
    async visitDescriptionName(node) {}
    async visitDef(node) {
        if (node instanceof ast.Yaksok) return await this.visitYaksok(node);
        if (node instanceof ast.Translate) return await this.visitTranslate(node);
        throw new Error('unknown node type');
    }
    async visitYaksok(node) {}
    async visitTranslate(node) {}
}

async function visitUnaryOperator(node) {
    await this.visit(node.rhs);
}

async function visitOperator(node) {
    await this.visit(node.lhs);
    await this.visit(node.rhs);
}

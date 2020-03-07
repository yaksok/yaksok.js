import * as ast from '~/ast';

export default class NodeVisitor {
    translateTargets: any[];

    constructor() {
        this.translateTargets = [];
    }
    async init() {}
    async visit(node: ast.AstNode) {
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
    async visitYaksokRoot(node: ast.YaksokRoot) { await this.visitStatements(node.statements); }
    async visitStatements(node: ast.Statements) { for (let statement of Array.from(node)) if (statement != null) await this.visitStatement(statement); }
    async visitStatement(node: ast.Statement) {
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
    async visitPlainStatement(node: ast.PlainStatement) { await this.visitExpression(node.expression); }
    async visitAssign(node: ast.Assign) {
        await this.visit(node.rvalue); // attention: evaluation order
        await this.visit(node.lvalue);
    }
    async visitOutside(node: ast.Outside) {
        await this.visit(node.name);
    }
    async visitCall(node: ast.Call) {}
    async visitModuleCall(node: ast.ModuleCall) {}
    async visitCallBind(node: ast.CallBind) {}
    async visitModuleCallBind(node: ast.ModuleCallBind) {}
    async visitCondition(node: ast.Condition) {
        if (node instanceof ast.If) return await this.visitIf(node);
        if (node instanceof ast.IfNot) return await this.visitIfNot(node);
        throw new Error('unknown node type');
    }
    async visitIf(node: ast.If) {
        await this.visit(node.condition);
        await this.visitStatements(node.ifBlock);
        if (node.elseBlock) {
            await this.visitStatements(node.elseBlock);
        }
    }
    async visitIfNot(node: ast.IfNot) {
        await this.visit(node.condition);
        await this.visitStatements(node.ifBlock);
        if (node.elseBlock) {
            await this.visitStatements(node.elseBlock);
        }
    }
    async visitLoop(node: ast.Loop) { await this.visit(node.block); }
    async visitIterate(node: ast.Iterate) {
        await this.visit(node.iteratee);
        await this.visit(node.iterator);
        await this.visit(node.block);
    }
    async visitLoopEnd(node: ast.LoopEnd) {}
    async visitYaksokEnd(node: ast.YaksokEnd) {}
    async visitExpressions(node: ast.Expressions) { for (let expression of Array.from(node)) if (expression != null) await this.visitExpression(expression); }
    async visitExpression(node: ast.Expression) {
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
    async visitPrimitive(node: ast.Primitive) {
        if (node instanceof ast.Name) return await this.visitName(node);
        if (node instanceof ast.String) return await this.visitString(node);
        if (node instanceof ast.Integer) return await this.visitInteger(node);
        if (node instanceof ast.Float) return await this.visitFloat(node);
        if (node instanceof ast.Boolean) return await this.visitBoolean(node);
        if (node instanceof ast.Void) return await this.visitVoid(node);
        throw new Error('unknown node type');
    }
    async visitName(node: ast.Name) {}
    async visitString(node: ast.String) {}
    async visitInteger(node: ast.Integer) {}
    async visitFloat(node: ast.Float) {}
    async visitBoolean(node: ast.Boolean) {}
    async visitVoid(node: ast.Void) {}
    async visitQuestion(node: ast.Question) {}
    async visitRange(node: ast.Range) {
        await this.visit(node.start);
        await this.visit(node.stop);
    }
    async visitList(node: ast.List) { for (let item of Array.from(node)) if (item != null) await this.visitExpression(item); }
    async visitDict(node: ast.Dict) { for (let item of Array.from(node)) if (item != null) await this.visitDictKeyValue(item); }
    async visitDictKeyValue(node: ast.DictKeyValue) {
        await this.visitName(node.key);
        await this.visitExpression(node.value);
    }
    async visitUnaryOperator(node: ast.UnaryOperator) {
        if (node instanceof ast.UnaryPlus) return await this.visitUnaryPlus(node);
        if (node instanceof ast.UnaryMinus) return await this.visitUnaryMinus(node);
    }
    async visitUnaryPlus(node: ast.UnaryPlus) { await visitUnaryOperator.call(this, node); }
    async visitUnaryMinus(node: ast.UnaryMinus) { await visitUnaryOperator.call(this, node); }
    async visitBinaryOperator(node: ast.BinaryOperator) {
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
    async visitAccess(node: ast.Access) { await visitOperator.call(this, node); }
    async visitDotAccess(node: ast.DotAccess) { await visitOperator.call(this, node); }
    async visitOr(node: ast.Or) { await visitOperator.call(this, node); }
    async visitAnd(node: ast.And) { await visitOperator.call(this, node); }
    async visitEqual(node: ast.Equal) { await visitOperator.call(this, node); }
    async visitNotEqual(node: ast.NotEqual) { await visitOperator.call(this, node); }
    async visitGreaterThan(node: ast.GreaterThan) { await visitOperator.call(this, node); }
    async visitLessThan(node: ast.LessThan) { await visitOperator.call(this, node); }
    async visitGreaterThanEqual(node: ast.GreaterThanEqual) { await visitOperator.call(this, node); }
    async visitLessThanEqual(node: ast.LessThanEqual) { await visitOperator.call(this, node); }
    async visitPlus(node: ast.Plus) { await visitOperator.call(this, node); }
    async visitMinus(node: ast.Minus) { await visitOperator.call(this, node); }
    async visitMultiply(node: ast.Multiply) { await visitOperator.call(this, node); }
    async visitDivide(node: ast.Divide) { await visitOperator.call(this, node); }
    async visitModular(node: ast.Modular) { await visitOperator.call(this, node); }
    async visitDescription(node: ast.Description) {}
    async visitDescriptionParameter(node: ast.DescriptionParameter) {}
    async visitDescriptionName(node: ast.DescriptionName) {}
    async visitDef(node: ast.Def) {
        if (node instanceof ast.Yaksok) return await this.visitYaksok(node);
        if (node instanceof ast.Translate) return await this.visitTranslate(node);
        throw new Error('unknown node type');
    }
    async visitYaksok(node: ast.Yaksok): Promise<any> {
        return await this.visit(node.block);
    }
    async visitTranslate(node: ast.Translate) {}
}

async function visitUnaryOperator(this: NodeVisitor, node: ast.UnaryOperator) {
    await this.visit(node.rhs);
}

async function visitOperator(this: NodeVisitor, node: ast.BinaryOperator) {
    await this.visit(node.lhs);
    await this.visit(node.rhs);
}

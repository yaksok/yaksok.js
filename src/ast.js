export class YaksokRoot {
    constructor(statements) {
        this.statements = statements;
    }
}
// block is statements
export class Statements extends Array {
    constructor() {
        super();
        this.scope = null;
    }
}
export class Expressions extends Array {}

// statement
export class Statement { constructor(expression) { this.expression = expression; } }
export class Call {
    constructor(expressions) {
        this.expressions = expressions;
        this.callInfo = null;
    }
}
export class If {
    constructor(condition, ifBlock, elseBlock) {
        this.condition = condition;
        this.ifBlock = ifBlock;
        this.elseBlock = elseBlock;
    }
}
export class Loop { constructor(block) { this.block = block; } }
export class Iterate {
    constructor(iterator, iteratee, block) {
        this.iterator = iterator;
        this.iteratee = iteratee;
        this.block = block;
    }
}
export class LoopEnd {}

// primitive
export class Primitive { constructor(value) { this.value = value; } }
export class Name extends Primitive {}
export class String extends Primitive {}
export class Integer extends Primitive {}
export class Float extends Primitive {}
export class Boolean extends Primitive {}
export class Void extends Primitive {}

// etc
export class Range { constructor(start, stop) { this.start = start; this.stop = stop; } }
export class List extends Array {}

// binary opeartor
export class BinaryOperator { constructor(lhs, rhs) { this.lhs = lhs; this.rhs = rhs; } }
export class Access extends BinaryOperator {}
// logical
export class AssignStatement extends BinaryOperator {
    constructor(lhs, rhs) {
        super(lhs, rhs);
        this.isDeclaration = false;
    }
}
export class Or extends BinaryOperator {}
export class And extends BinaryOperator {}
export class Equal extends BinaryOperator {}
export class NotEqual extends BinaryOperator {}
export class GreaterThan extends BinaryOperator {}
export class LessThan extends BinaryOperator {}
export class GreaterThanEqual extends BinaryOperator {}
export class LessThanEqual extends BinaryOperator {}
// arithmetical
export class Plus extends BinaryOperator {}
export class Minus extends BinaryOperator {}
export class Multiply extends BinaryOperator {}
export class Divide extends BinaryOperator {}
export class Modular extends BinaryOperator {}

// description
export class Description extends Array {
    match(expressions) {
        if (expressions.length > this.length) return null;
        let args = [];
        for (let [i, j] = [0, 0]; i < this.length; ++i, ++j) {
            let curr = this[i];
            let expression = expressions[j];
            if (curr instanceof DescriptionName) {
                if (curr.match(expression)) continue;
                return null;
            }
            if (curr instanceof DescriptionParameter) {
                if (!(expression instanceof Name)) {
                    args.push(expression);
                    continue;
                }
                let next = this[++i];
                let nextExpression = expressions[j + 1];
                if (next.match(nextExpression) || next.needWhiteSpace) {
                    ++j;
                    args.push(expression);
                    continue;
                }
                let matchLength = next.postMatch(expression);
                if (matchLength) {
                    let name = expression.value;
                    args.push(new Name(name.substr(0, name.length - matchLength)));
                    continue;
                }
                return null;
            }
        }
        return args;
    }
    get parameters() {
        return this.filter(item => item instanceof DescriptionParameter);
    }
}
export class DescriptionParameter { constructor(value) { this.value = value; } }
export class DescriptionName extends Array {
    needWhiteSpace = false;
    match(name) {
        if (!(name instanceof Name)) return false;
        return this.some(potential => name.value === potential);
    }
    postMatch(param) {
        if (!(param instanceof Name)) return 0;
        return this.find(potential => param.value.endsWith(potential)).length;
    }
}

//defs
export class Def {
    constructor() {
        this.scope = null;
    }
    match(call) { // return match arguments else null
        return this.description.match(call.expressions);
    }
}

export class Yaksok extends Def {
    constructor(description, block) {
        super();
        this.description = description;
        this.block = block;
    }
}
export class YaksokEnd {}

export class Translate extends Def {
    constructor(description, target, code) {
        super();
        this.description = description;
        this.target = target;
        this.code = code;
    }
}

export class NodeVisitor {
    constructor() {
        this.translateTargets = [];
    }
    init() {}
    async visit(node) {
        if (node instanceof YaksokRoot) return await this.visitYaksokRoot(node);
        if (node instanceof Statements) return await this.visitStatements(node);
        if (node instanceof Expressions) return await this.visitExpressions(node);
        if (node instanceof Statement) return await this.visitStatement(node);
        if (node instanceof Call) return await this.visitCall(node);
        if (node instanceof If) return await this.visitIf(node);
        if (node instanceof Loop) return await this.visitLoop(node);
        if (node instanceof Iterate) return await this.visitIterate(node);
        if (node instanceof LoopEnd) return await this.visitLoopEnd(node);
        if (node instanceof Primitive) return await this.visitPrimitive(node);
        if (node instanceof Range) return await this.visitRange(node);
        if (node instanceof List) return await this.visitList(node);
        if (node instanceof BinaryOperator) return await this.visitBinaryOperator(node);
        if (node instanceof Description) return await this.visitDescription(node);
        if (node instanceof DescriptionParameter) return await this.visitDescriptionParameter(node);
        if (node instanceof DescriptionName) return await this.visitDescriptionName(node);
        if (node instanceof Def) return await this.visitDef(node);
        if (node instanceof YaksokEnd) return await this.visitYaksokEnd(node);
        throw new Error('unknown node type');
    }
    async visitYaksokRoot(node) { await this.visit(node.statements); }
    async visitStatements(node) { for (let statement of node) await this.visit(statement); }
    async visitExpressions(node) { for (let expression of node) await this.visit(expression); }
    async visitStatement(node) { await this.visit(node.expression); }
    async visitCall(node) {}
    async visitIf(node) {
        await this.visit(node.condition);
        await this.visit(node.ifBlock);
        if (node.elseBlock) {
            await this.visit(node.elseBlock);
        }
    }
    async visitLoop(node) { await this.visit(node.block); }
    async visitIterate(node) {
        await this.visit(node.iteratee);
        await this.visit(node.iterator);
        await this.visit(node.block);
    }
    async visitLoopEnd(node) {}
    async visitPrimitive(node) {
        if (node instanceof Name) return await this.visitName(node);
        if (node instanceof String) return await this.visitString(node);
        if (node instanceof Integer) return await this.visitInteger(node);
        if (node instanceof Float) return await this.visitFloat(node);
        if (node instanceof Boolean) return await this.visitBoolean(node);
        if (node instanceof Void) return await this.visitVoid(node);
        throw new Error('unknown node type');
    }
    async visitName(node) {}
    async visitString(node) {}
    async visitInteger(node) {}
    async visitFloat(node) {}
    async visitBoolean(node) {}
    async visitVoid(node) {}
    async visitRange(node) {
        await this.visit(node.start);
        await this.visit(node.stop);
    }
    async visitList(node) { for (let item of node) await this.visit(item); }
    async visitBinaryOperator(node) {
        if (node instanceof Access) return await this.visitAccess(node);
        if (node instanceof AssignStatement) return await this.visitAssignStatement(node);
        if (node instanceof Or) return await this.visitOr(node);
        if (node instanceof And) return await this.visitAnd(node);
        if (node instanceof Equal) return await this.visitEqual(node);
        if (node instanceof NotEqual) return await this.visitNotEqual(node);
        if (node instanceof GreaterThan) return await this.visitGreaterThan(node);
        if (node instanceof LessThan) return await this.visitLessThan(node);
        if (node instanceof GreaterThanEqual) return await this.visitGreaterThanEqual(node);
        if (node instanceof LessThanEqual) return await this.visitLessThanEqual(node);
        if (node instanceof Plus) return await this.visitPlus(node);
        if (node instanceof Minus) return await this.visitMinus(node);
        if (node instanceof Multiply) return await this.visitMultiply(node);
        if (node instanceof Divide) return await this.visitDivide(node);
        if (node instanceof Modular) return await this.visitModular(node);
        throw new Error('unknown node type');
    }
    async visitAccess(node) { await visitOperator.call(this, node); }
    async visitAssignStatement(node) { await visitOperator.call(this, node); }
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
        if (node instanceof Yaksok) return await this.visitYaksok(node);
        if (node instanceof Translate) return await this.visitTranslate(node);
        throw new Error('unknown node type');
    }
    async visitYaksok(node) {}
    async visitYaksokEnd(node) {}
    async visitTranslate(node) {}
}

async function visitOperator(node) {
    await this.visit(node.lhs);
    await this.visit(node.rhs);
}

export class YaksokRoot { constructor(statements) { this.statements = statements; } }
export class Statements extends Array {}
export class Expressions extends Array {}

// statement
export class Statement { constructor(expression) { this.expression = expression; } }
export class Call { constructor(expressions) { this.expressions = expressions; } }
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
export class AssignStatement extends BinaryOperator {}
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
            if (curr instanceof YaksokName) {
                if (curr.match(expression)) continue;
                return null;
            }
            if (curr instanceof YaksokParameter) {
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
        return this.filter(item => item instanceof YaksokParameter);
    }
}

//yaksok
export class Yaksok {
    constructor(description, block) {
        this.description = description;
        this.block = block;
    }
    match(call) { // return match arguments else null
        return this.description.match(call.expressions);
    }
}
export class YaksokParameter { constructor(value) { this.value = value; } }
export class YaksokName extends Array {
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
export class YaksokEnd {}

export class NodeVisitor {
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
        if (node instanceof Yaksok) return await this.visitYaksok(node);
        if (node instanceof YaksokParameter) return await this.visitYaksokParameter(node);
        if (node instanceof YaksokName) return await this.visitYaksokName(node);
        if (node instanceof YaksokEnd) return await this.visitYaksokEnd(node);
        throw new Error('unknown node type');
    }
    async visitYaksokRoot(node) { await this.visit(node.statements); }
    async visitStatements(node) { for (let statement of node) await this.visit(statement); }
    async visitExpressions(node) {}
    async visitStatement(node) {}
    async visitCall(node) {}
    async visitIf(node) {}
    async visitLoop(node) {}
    async visitIterate(node) {}
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
    async visitRange(node) {}
    async visitList(node) {}
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
    async visitAccess(node) {}
    async visitAssignStatement(node) {}
    async visitOr(node) {}
    async visitAnd(node) {}
    async visitEqual(node) {}
    async visitNotEqual(node) {}
    async visitGreaterThan(node) {}
    async visitLessThan(node) {}
    async visitGreaterThanEqual(node) {}
    async visitLessThanEqual(node) {}
    async visitPlus(node) {}
    async visitMinus(node) {}
    async visitMultiply(node) {}
    async visitDivide(node) {}
    async visitModular(node) {}
    async visitDescription(node) {}
    async visitYaksok(node) {}
    async visitYaksokParameter(node) {}
    async visitYaksokName(node) {}
    async visitYaksokEnd(node) {}
}

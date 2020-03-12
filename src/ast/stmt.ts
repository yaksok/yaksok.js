import { AstListMixin, AstNode, AstNodeList, astList, child } from './base';
import * as expr from './expr';
import { Expression, Name } from './expr';

// block is statements
export class Statements extends AstNodeList<Statement> {
    scope: unknown;

    constructor() {
        super();
        this.scope = null; // analyzer 패스를 거친 뒤부터 접근 가능
    }
}

// statement
export class Statement extends AstNode {
    eliminateDeadCode(): AstNode | boolean { // return boolean or replacement node
        return false; // prevent elimination
    }
}

export class PlainStatement extends Statement {
    @child expression: Expression;

    constructor(expression: Expression) {
        super();
        this.expression = expression;
    }
}

export class Assign extends Statement {
    @child lvalue: AstNode;
    @child rvalue: Expression;
    isDeclaration: boolean;

    constructor(lvalue: AstNode, rvalue: Expression) {
        super();
        this.lvalue = lvalue;
        this.rvalue = rvalue;
        this.isDeclaration = false;
    }
}

export class Outside extends Statement {
    @child name: Name;

    constructor(name: Name) {
        super();
        this.name = name;
    }
}

export abstract class Condition extends Statement {}

export class If extends Condition {
    @child condition: Expression;
    @child ifBlock: Statements;
    @child elseBlock: Statements | null;

    constructor(condition: Expression, ifBlock: Statements, elseBlock: Statements | null = null) {
        super();
        this.condition = condition;
        this.ifBlock = ifBlock;
        this.elseBlock = elseBlock;
    }
    eliminateDeadCode(): Statements | boolean {
        let bool = this.condition.fold();
        if (bool instanceof expr.Boolean) {
            return (bool.value ? this.ifBlock : this.elseBlock) || true;
        }
        return false;
    }
}

export class IfNot extends Condition {
    @child condition: Expression;
    @child ifBlock: Statements;
    @child elseBlock: Statements | null;

    constructor(condition: Expression, ifBlock: Statements, elseBlock: Statements | null = null) {
        super();
        this.condition = condition;
        this.ifBlock = ifBlock;
        this.elseBlock = elseBlock;
    }
    eliminateDeadCode(): Statements | boolean {
        let bool = this.condition.fold();
        if (bool instanceof expr.Boolean) {
            return (bool.value ? this.ifBlock : this.elseBlock) || true;
        }
        return false;
    }
}

export class Loop extends Statement {
    @child block: Statements;

    constructor(block: Statements) {
        super();
        this.block = block;
    }
}

export class Iterate extends Statement {
    @child iterator: AstNode;
    @child iteratee: AstNode;
    @child block: Statements;

    constructor(iterator: AstNode, iteratee: AstNode, block: Statements) {
        super();
        this.iterator = iterator;
        this.iteratee = iteratee;
        this.block = block;
    }
}

export class LoopEnd extends Statement {}

export class YaksokEnd extends Statement {}

// NOTE: 이 파일에서 String, Number, Boolean은 javascript builtin object가 아닙니다.
import { AstListMixin, AstNode, AstNodeList, astList, child } from './base';
import { Type } from '~/type';

// expression
export class Expressions extends AstNodeList<Expression> {
    get repr() {
        return this.childNodes.map(childNode => childNode.repr).join(' ');
    }
}
export class Expression extends AstNode {
    type = Type.Any;
    get isConstant() { return false; }
    fold(): Expression { return this; }
    get repr(): string {
        throw new Error('unimplemented');
    }
}

@astList('args')
export class CallInfo extends AstNode {
    def: AstNode;
    args: Expression[];
    constructor(def: AstNode) {
        super();
        this.def = def;
        this.args = [];
    }
}
export interface CallInfo extends AstListMixin<Expression> {}

export interface CallLike extends Expression {
    expressions: Expressions;
    callInfo: CallInfo | null;
}

export interface ModuleCallLike extends CallLike {
    target: Name;
}

export class Call extends Expression implements CallLike {
    @child expressions: Expressions;
    @child callInfo: CallInfo | null;

    constructor(expressions: Expressions) {
        super();
        this.expressions = expressions; // analyzer 패스를 거친 뒤로는 무의미
        this.callInfo = null; // analyzer 패스를 거친 뒤부터 접근 가능
    }
    fold() {
        for (let arg of this.callInfo?.args || []) {
            arg.fold();
        }
        return this; // TODO: fold call
    }
    get repr() {
        return this.expressions?.repr ?? '';
    }
}

export class ModuleCall extends Expression implements ModuleCallLike {
    @child target: Name;
    @child expressions: Expressions;
    @child callInfo: CallInfo | null;

    constructor(target: Name, expressions: Expressions) {
        super();
        this.target = target;
        this.expressions = expressions; // analyzer 패스를 거친 뒤로는 무의미
        this.callInfo = null; // analyzer 패스를 거친 뒤부터 접근 가능
    }
    fold() {
        for (let arg of this.callInfo?.args || []) {
            arg.fold();
        }
        return this; // TODO: fold call
    }
    get repr() {
        return `@${ this.target.repr } ${ this.expressions?.repr }`;
    }
}

export class CallBind extends Expression implements CallLike {
    @child expressions: Expressions;
    @child callInfo: CallInfo | null;

    constructor(expressions: Expressions) {
        super();
        this.expressions = expressions;
        this.callInfo = null;
    }
    get repr() {
        return `결속 ${ this.expressions?.repr }`;
    }
}

export class ModuleCallBind extends Expression implements ModuleCallLike {
    @child target: any;
    @child expressions: Expressions;
    @child callInfo: CallInfo | null;

    constructor(target: any, expressions: Expressions) {
        super();
        this.target = target;
        this.expressions = expressions;
        this.callInfo = null;
    }
    get repr() {
        return `결속 @${ this.target.repr } ${ this.expressions?.repr }`;
    }
}
export class Question extends Expression {
    get repr() {
        return '?';
    }
}

// primitive
export class Primitive extends Expression {
    value: any;
    constructor(value: any) { super(); this.value = value; }
    get isConstant() { return true; }
    clone() { return new (this.constructor as any)(this.value); }
    get repr() {
        return `${ this.value }`;
    }
}
export class Name extends Primitive {
    call: boolean;
    constructor(value: any) {
        super(value);
        this.call = false; // true: 식별자 하나짜리 약속일지도 모름
                           // analyzer 패스에서 사용되고 난 이후에는 의미가 없다.
    }
    get isConstant() {
        // TODO: 상수 접기 구현
        return false;
    }
}
export class String extends Primitive {
    type = Type.String;
    get repr() {
        return `"${ this.value }"`;
    }
}

export abstract class Number extends Primitive {}

export class Integer extends Number { type = Type.Integer; }
export class Float extends Number { type = Type.Float; }

export class Boolean extends Primitive { type = Type.Boolean; }
export class Void extends Primitive {
    type = Type.Void;
    get repr() {
        return '()';
    }
}

// etc
export class Range extends Expression {
    type = Type.Range;
    @child start: Expression;
    @child stop: Expression;
    constructor(start: Expression, stop: Expression) {
        super();
        this.start = start;
        this.stop = stop;
    }
}

@astList('items')
export class List extends Expression {
    type = Type.List;
    items: Expression[];
    constructor() {
        super();
        this.items = [];
    }
}
export interface List extends AstListMixin<Expression> {}

@astList('items')
export class Dict extends Expression {
    type = Type.Dict;
    items: DictKeyValue[];
    constructor() {
        super();
        this.items = [];
    }
}
export interface Dict extends AstListMixin<DictKeyValue> {}

export class DictKeyValue extends AstNode {
    @child key: Name;
    @child value: Expression;
    constructor(key: Name, value: Expression) {
        super();
        this.key = key;
        this.value = value;
    }
}

// unary operator
export abstract class UnaryOperator extends Expression {
    @child rhs: Expression;
    constructor(rhs: Expression) {
        super();
        this.rhs = rhs;
    }
    get isConstant() { return this.rhs.isConstant; }
}
// arithmetical
export class UnaryPlus extends UnaryOperator {
    fold() {
        if (this.isConstant) {
            let rhs = this.rhs.fold();
            if (rhs instanceof Integer)
                return this.replace(new Integer(rhs.value));
            if (rhs instanceof Number)
                return this.replace(new Float(rhs.value));
        }
        return this;
    }
}
export class UnaryMinus extends UnaryOperator {
    fold() {
        if (this.isConstant) {
            let rhs = this.rhs.fold();
            if (rhs instanceof Integer)
                return this.replace(new Integer(-rhs.value));
            if (rhs instanceof Number)
                return this.replace(new Float(-rhs.value));
        }
        return this;
    }
}

// binary opeartor
export abstract class BinaryOperator extends Expression {
    @child lhs: Expression;
    @child rhs: Expression;
    constructor(lhs: Expression, rhs: Expression) {
        super();
        this.lhs = lhs;
        this.rhs = rhs;
    }
    get isConstant() { return this.lhs.isConstant && this.rhs.isConstant; }
}
export class Access extends BinaryOperator {}
export class DotAccess extends BinaryOperator {}
// logical
export class Or extends BinaryOperator { type = Type.Boolean; }
export class And extends BinaryOperator { type = Type.Boolean; }
export class Equal extends BinaryOperator {
    type = Type.Boolean;
    fold() {
        if (this.isConstant) {
            let lhs = this.lhs.fold();
            let rhs = this.rhs.fold();
            if (lhs instanceof Primitive && rhs instanceof Primitive) {
                return this.replace(new Boolean(lhs.value === rhs.value));
            }
        }
        return this;
    }
}
export class NotEqual extends BinaryOperator {
    type = Type.Boolean;
    fold() {
        if (this.isConstant) {
            let lhs = this.lhs.fold();
            let rhs = this.rhs.fold();
            if (lhs instanceof Primitive && rhs instanceof Primitive) {
                return this.replace(new Boolean(lhs.value !== rhs.value));
            }
        }
        return this;
    }
}
export class GreaterThan extends BinaryOperator {
    type = Type.Boolean;
    fold() {
        if (this.isConstant) {
            let lhs = this.lhs.fold();
            let rhs = this.rhs.fold();
            if (lhs instanceof Number && rhs instanceof Number)
                return this.replace(new Boolean(lhs.value > rhs.value));
        }
        return this;
    }
}
export class LessThan extends BinaryOperator {
    type = Type.Boolean;
    fold() {
        if (this.isConstant) {
            let lhs = this.lhs.fold();
            let rhs = this.rhs.fold();
            if (lhs instanceof Number && rhs instanceof Number)
                return this.replace(new Boolean(lhs.value < rhs.value));
        }
        return this;
    }
}
export class GreaterThanEqual extends BinaryOperator {
    type = Type.Boolean;
    fold() {
        if (this.isConstant) {
            let lhs = this.lhs.fold();
            let rhs = this.rhs.fold();
            if (lhs instanceof Number && rhs instanceof Number)
                return this.replace(new Boolean(lhs.value >= rhs.value));
        }
        return this;
    }
}
export class LessThanEqual extends BinaryOperator {
    type = Type.Boolean;
    fold() {
        if (this.isConstant) {
            let lhs = this.lhs.fold();
            let rhs = this.rhs.fold();
            if (lhs instanceof Number && rhs instanceof Number)
                return this.replace(new Boolean(lhs.value <= rhs.value));
        }
        return this;
    }
}
// arithmetical
export class Plus extends BinaryOperator {
    fold() {
        if (this.isConstant) {
            let lhs = this.lhs.fold();
            let rhs = this.rhs.fold();
            if (lhs instanceof String && rhs instanceof String)
                return this.replace(new String(lhs.value + rhs.value));
            if (lhs instanceof Integer && rhs instanceof Integer)
                return this.replace(new Integer(lhs.value + rhs.value));
            if (lhs instanceof Number && rhs instanceof Number)
                return this.replace(new Float(lhs.value + rhs.value));
        }
        return this;
    }
}
export class Minus extends BinaryOperator {
    fold() {
        if (this.isConstant) {
            let lhs = this.lhs.fold();
            let rhs = this.rhs.fold();
            if (lhs instanceof Integer && rhs instanceof Integer)
                return this.replace(new Integer(lhs.value - rhs.value));
            if (lhs instanceof Number && rhs instanceof Number)
                return this.replace(new Float(lhs.value - rhs.value));
        }
        return this;
    }
}
export class Multiply extends BinaryOperator {
    fold() {
        if (this.isConstant) {
            let lhs = this.lhs.fold();
            let rhs = this.rhs.fold();
            if (lhs instanceof Integer && rhs instanceof Integer)
                return this.replace(new Integer(lhs.value * rhs.value));
            if (lhs instanceof Number && rhs instanceof Number)
                return this.replace(new Float(lhs.value * rhs.value));
        }
        return this;
    }
}
export class Divide extends BinaryOperator {
    type = Type.Float;
    fold() {
        if (this.isConstant) {
            let lhs = this.lhs.fold();
            let rhs = this.rhs.fold();
            if (lhs instanceof Number && rhs instanceof Number)
                return this.replace(new Float(lhs.value / rhs.value));
        }
        return this;
    }
}
export class Modular extends BinaryOperator {
    fold() {
        if (this.isConstant) {
            let lhs = this.lhs.fold();
            let rhs = this.rhs.fold();
            if (lhs instanceof Integer && rhs instanceof Integer)
                return this.replace(new Integer(lhs.value % rhs.value));
            if (lhs instanceof Number && rhs instanceof Number)
                return this.replace(new Float(lhs.value % rhs.value));
        }
        return this;
    }
}

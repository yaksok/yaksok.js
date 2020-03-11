// NOTE: 이 파일에서 String, Number, Boolean은 javascript builtin object가 아닙니다.

import { AstNode, AstListMixin, astList, child } from './base';
import { ModuleScope } from '~/analyzer';

export { AstNode, child };

// ast
@astList('childNodes')
export abstract class AstNodeList<T extends AstNode = AstNode> extends AstNode {
    childNodes: T[];

    constructor() {
        super();
        this.childNodes = [];
    }
}
export interface AstNodeList<T> extends AstListMixin<T> {}

export class YaksokRoot extends AstNode {
    hash: any;
    modules: { [name: string]: string };
    moduleScope: ModuleScope | null;
    @child statements: Statements;

    constructor(statements: Statements) {
        super();
        this.hash = null; // module resolver 패스를 거친 뒤부터 사용 가능
        this.modules = {}; // key: module name, value: module hash
                           // module resolver 패스를 거친 뒤부터 사용 가능
        this.moduleScope = null; // module resolver 패스를 거친 뒤부터 사용 가능
        this.statements = statements;
    }
}
// block is statements
export class Statements extends AstNodeList<Statement> {
    scope: any;

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
    @child lvalue: any;
    @child rvalue: any;
    isDeclaration: boolean;

    constructor(lvalue: any, rvalue: any) {
        super();
        this.lvalue = lvalue;
        this.rvalue = rvalue;
        this.isDeclaration = false;
    }
}

export class Outside extends Statement {
    @child name: any;

    constructor(name: any) {
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
        if (bool instanceof Boolean) {
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
        if (bool instanceof Boolean) {
            return (bool.value ? this.ifBlock : this.elseBlock) || true;
        }
        return false;
    }
}

export class Loop extends Statement {
    @child block: any;

    constructor(block: any) {
        super();
        this.block = block;
    }
}

export class Iterate extends Statement {
    @child iterator: any;
    @child iteratee: any;
    @child block: any;

    constructor(iterator: any, iteratee: any, block: any) {
        super();
        this.iterator = iterator;
        this.iteratee = iteratee;
        this.block = block;
    }
}

export class LoopEnd extends Statement {}

export class YaksokEnd extends Statement {}

// expression
export class Expressions extends AstNodeList<Expression> {
    get repr() {
        return this.childNodes.map(childNode => childNode.repr).join(' ');
    }
}
export class Expression extends AstNode {
    type: any;
    get isConstant() { return false; }
    fold(): Expression { return this; }
    get repr(): string {
        throw new Error('unimplemented');
    }
}
Expression.prototype.type = null;

export interface CallLike extends Expression {
    expressions: Expressions;
    callInfo: CallInfo | null;
}

export interface ModuleCallLike extends CallLike {
    target: any;
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
    @child target: any;
    @child expressions: Expressions;
    @child callInfo: CallInfo | null;

    constructor(target: any, expressions: Expressions) {
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
    get repr() {
        return `"${ this.value }"`;
    }
} String.prototype.type = String;

export abstract class Number extends Primitive {}

export class Integer extends Number {} Integer.prototype.type = Integer;
export class Float extends Number {} Float.prototype.type = Float;

export class Boolean extends Primitive {} Boolean.prototype.type = Boolean;
export class Void extends Primitive {
    get repr() {
        return '()';
    }
} Void.prototype.type = Void;

// etc
export class Range extends Expression {
    @child start: any;
    @child stop: any;
    constructor(start: any, stop: any) {
        super();
        this.start = start;
        this.stop = stop;
    }
}
Range.prototype.type = Range;

@astList('items')
export class List extends Expression {
    items: Expression[];
    constructor() {
        super();
        this.items = [];
    }
}
List.prototype.type = List;
export interface List extends AstListMixin<Expression> {}

@astList('items')
export class Dict extends Expression {
    items: DictKeyValue[];
    constructor() {
        super();
        this.items = [];
    }
}
Dict.prototype.type = Dict;
export interface Dict extends AstListMixin<DictKeyValue> {}

export class DictKeyValue extends AstNode {
    @child key: any;
    @child value: any;
    constructor(key: any, value: any) {
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
export class Or extends BinaryOperator {}
Or.prototype.type = Boolean;
export class And extends BinaryOperator {}
And.prototype.type = Boolean;
export class Equal extends BinaryOperator {
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
Equal.prototype.type = Boolean;
export class NotEqual extends BinaryOperator {
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
NotEqual.prototype.type = Boolean;
export class GreaterThan extends BinaryOperator {
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
GreaterThan.prototype.type = Boolean;
export class LessThan extends BinaryOperator {
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
LessThan.prototype.type = Boolean;
export class GreaterThanEqual extends BinaryOperator {
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
GreaterThanEqual.prototype.type = Boolean;
export class LessThanEqual extends BinaryOperator {
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
LessThanEqual.prototype.type = Boolean;
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
Divide.prototype.type = Float;
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

// description
export class Description extends AstNodeList<DescriptionItem> {
    match(expressions: Expressions): CallInfo | null {
        if (!(this.parent != null)) {
            throw new Error('Description의 부모는 Def여야 합니다');
        }
        if (expressions.length > this.length) return null;
        let callInfo = new CallInfo(this.parent);
        // FIXME: babel 6.5 대에서
        // for (let [i, j] = [0, 0]; i < this.length; ++i, ++j) {}
        // 꼴의 문장이 제대로 처리되지 않는다. 그게 해결되면 고치는 걸로..
        let [i, j] = [0, 0];
        for (; i < this.length; ++i, ++j) {
            let curr = this.childNodes[i];
            let expression = expressions.childNodes[j];
            if (curr instanceof DescriptionName) {
                if (curr.match(expression)) continue;
                return null;
            }
            if (curr instanceof DescriptionParameter) {
                if (!(expression instanceof Name)) {
                    callInfo.push(expression);
                    continue;
                }
                let next: DescriptionName = this.childNodes[i + 1] as any;  // assume
                let nextExpression = expressions.childNodes[j + 1];
                if (!next || next.match(nextExpression) || next.needWhiteSpace) {
                    callInfo.push(expression);
                    continue;
                }
                let matchLength = next.postMatch(expression);
                let name = expression.value;
                if (matchLength && name.length > matchLength) {
                    ++i;
                    callInfo.push(new Name(name.substr(0, name.length - matchLength)));
                    continue;
                }
                if (!nextExpression) return null;
                callInfo.push(expression);
                continue;
            }
            throw new Error('unexpected description item');
        }
        return callInfo;
    }
    get parameters(): DescriptionParameter[] {
        function predicate(item: DescriptionItem): item is DescriptionParameter {
            return item instanceof DescriptionParameter;
        }
        return this.childNodes.filter(predicate);
    }
    get repr() { return this.childNodes.map(expression => expression.repr).join(''); }
}
export abstract class DescriptionItem extends AstNode {
    abstract get repr(): string;
}
export class DescriptionParameter extends DescriptionItem {
    value: Expression;
    constructor(value: Expression) { super(); this.value = value; }
    get repr() { return `(${ this.value })`; }
}
export class DescriptionName extends DescriptionItem {
    names: string[];
    constructor() {
        super();
        this.names = [];
    }
    needWhiteSpace = false;
    match(name: Expression) {
        if (!(name instanceof Name)) return false;
        return this.names.some(potential => name.value === potential);
    }
    postMatch(param: Expression) {
        if (!(param instanceof Name)) return 0;
        let match = this.names.find(potential => param.value.endsWith(potential));
        return match ? match.length : 0;
    }
    get length() { return this.names.length; }
    push(name: string) {
        // name: string
        this.names.push(name);
    }
    sort() { this.names.sort((a, b) => b.length - a.length); }
    [Symbol.iterator]() {
        return this.names[Symbol.iterator]();
    }
    get repr() { return (this.needWhiteSpace ? ' ' : '') + this.names.join('/'); }
}

// defs
export abstract class Def extends Statement {
    @child description: Description;
    scope: any;
    returnType: any;
    used: boolean;
    constructor(description: Description) {
        super();
        this.description = description;
        this.scope = null;
        this.returnType = null;
        this.used = false; // 어딘가에서 호출된 적이 있는 정의인지 여부.
                           // see getCallInfo from analyzer.Scope
    }
    get hasSideEffect() { return true; }
    get repr() {
        return `정의 ${ this.description?.repr }`;
    }
    match(call: CallLike) { // return call info or null
        return this.description.match(call.expressions);
    }
}

export class Yaksok extends Def {
    @child block: Statements;
    constructor(description: Description, block: Statements) {
        super(description);
        this.block = block;
    }
    get hasSideEffect() {
        // TODO: 현재 약속의 부수효과 여부 반환
        return super.hasSideEffect;
    }
    get repr() {
        return `약속 ${ this.description?.repr }`;
    }
}

export class Translate extends Def {
    target: string;
    code: string;
    constructor(description: Description, target: string, code: string) {
        super(description);
        this.target = target;
        this.code = code;
    }
    get repr() {
        return `번역(${ this.target }) ${ this.description?.repr }`;
    }
}

import NodeVisitor from './NodeVisitor';
export { NodeVisitor };

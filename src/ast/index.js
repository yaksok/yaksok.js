// NOTE: 이 파일에서 String, Number, Boolean은 javascript builtin object가 아닙니다.

// decorators
function abstract(target) {
    return class cls extends target {
        constructor(...args) {
            super(...args);
            if (this.constructor === cls)
                throw new Error('instantiating abstract class is disallowed');
        }
    }
}

export function ast() {
    let childFields = Array.from(arguments);
    return function decorator(target) {
        for (let field of childFields) {
            let privateField = '_' + field;
            Object.defineProperty(target.prototype, field, {
                configurable: true,
                enumerable: false,
                get: function () {
                    let member = this[privateField];
                    return member ? member : null;
                },
                set: function (value) {
                    if (value !== null) {
                        value.parent = this;
                    }
                    this[privateField] = value;
                }
            });
        }
        target.prototype.replaceChild = function replaceChild(before, after) {
            for (let field of childFields) {
                if (this[field] === before) {
                    after.parent = this;
                    this[field] = after;
                    return after;
                }
            }
            throw new Error('이 노드의 자식이 아닙니다.');
        };
    };
}

export function astList(listField) {
    return function decorator(target) {
        Object.defineProperty(target.prototype, 'length', {
            configurable: true,
            enumerable: false,
            get: function () {
                return this[listField].length;
            }
        });
        target.prototype.push = function push(childNode) {
            if (childNode !== null) {
                childNode.parent = this;
            }
            this[listField].push(childNode);
        };
        target.prototype[Symbol.iterator] = function () {
            return this[listField][Symbol.iterator]();
        };
        target.prototype.replaceChild = function replaceChild(before, after) {
            let index = this[listField].indexOf(before);
            if (index === -1) {
                throw new Error('이 노드의 자식이 아닙니다.');
            }
            if (after.constructor === this.constructor) { // after가 목록인 경우
                for (let child of after[listField]) {
                    child.parent = this;
                }
                this[listField].splice(index, 1, ...after[listField]);
            } else {
                after.parent = this;
                this[listField][index] = after;
                return after;
            }
        };
        target.prototype.removeChild = function removeChild(child) {
            let index = this[listField].indexOf(child);
            if (index === -1) {
                throw new Error('이 노드의 자식이 아닙니다.');
            }
            this[listField].splice(index, 1);
        };
    };
}

export function def(target) {
    target.prototype.match = function match(call) { // return call info or null
        return this.description.match(call.expressions);
    };
}

// ast
@abstract
export class AstNode {
    constructor() {
        this.parent = null;
    }
    replaceChild(before, after) {
        // after.parent = this;
        throw new Error('구현되지 않았습니다.');
    }
    replace(after) {
        if (this.parent === null) {
            throw new Error('부모가 없습니다.');
        }
        return this.parent.replaceChild(this, after);
    }
}

@abstract
@astList('childNodes')
export class AstNodeList extends AstNode {
    constructor() {
        super();
        this.childNodes = [];
    }
}

@ast('statements')
export class YaksokRoot extends AstNode {
    constructor(statements) {
        super();
        this.hash = null; // module resolver 패스를 거친 뒤부터 사용 가능
        this.modules = {}; // key: module name, value: module hash
                           // module resolver 패스를 거친 뒤부터 사용 가능
        this.moduleScope = null; // module resolver 패스를 거친 뒤부터 사용 가능
        this.statements = statements;
    }
}
// block is statements
export class Statements extends AstNodeList {
    constructor() {
        super();
        this.scope = null; // analyzer 패스를 거친 뒤부터 접근 가능
    }
}

// statement
export class Statement {
    eliminateDeadCode() { // return boolean or replacement node
        return false; // prevent elimination
    }
}

@ast('expression')
export class PlainStatement extends Statement {
    constructor(expression) {
        super();
        this.expression = expression;
    }
}

@ast('lvalue', 'rvalue')
export class Assign extends Statement {
    constructor(lvalue, rvalue) {
        super();
        this.lvalue = lvalue;
        this.rvalue = rvalue;
        this.isDeclaration = false;
    }
}

@ast('name')
export class Outside extends Statement {
    constructor(name) {
        super();
        this.name = name;
    }
}

@abstract
export class Condition extends Statement {}

@ast('condition', 'ifBlock', 'elseBlock')
export class If extends Condition {
    constructor(condition, ifBlock, elseBlock) {
        super();
        this.condition = condition;
        this.ifBlock = ifBlock;
        this.elseBlock = elseBlock;
    }
    eliminateDeadCode() {
        let bool = this.condition.fold();
        if (bool instanceof Boolean) {
            return (bool.value ? this.ifBlock : this.elseBlock) || true;
        }
        return false;
    }
}

@ast('condition', 'ifBlock', 'elseBlock')
export class IfNot extends Condition {
    constructor(condition, ifBlock, elseBlock) {
        super();
        this.condition = condition;
        this.ifBlock = ifBlock;
        this.elseBlock = elseBlock;
    }
    eliminateDeadCode() {
        let bool = this.condition.fold();
        if (bool instanceof Boolean) {
            return (bool.value ? this.ifBlock : this.elseBlock) || true;
        }
        return false;
    }
}

@ast('block')
export class Loop extends Statement {
    constructor(block) {
        super();
        this.block = block;
    }
}

@ast('iterator', 'iteratee', 'block')
export class Iterate extends Statement {
    constructor(iterator, iteratee, block) {
        super();
        this.iterator = iterator;
        this.iteratee = iteratee;
        this.block = block;
    }
}

export class LoopEnd extends Statement {}

export class YaksokEnd extends Statement {}

// expression
export class Expressions extends AstNodeList {
    get repr() {
        return this.childNodes.map(childNode => childNode.repr).join(' ');
    }
}
export class Expression extends AstNode {
    get isConstant() { return false; }
    fold() { return this; }
}
Expression.prototype.type = null;

@ast('expressions', 'callInfo')
export class Call extends Expression {
    constructor(expressions) {
        super();
        this.expressions = expressions; // analyzer 패스를 거친 뒤로는 무의미
        this.callInfo = null; // analyzer 패스를 거친 뒤부터 접근 가능
    }
    fold() {
        for (let arg of this.callInfo.args) {
            arg.fold();
        }
        return this; // TODO: fold call
    }
    get repr() {
        return this.expressions.repr;
    }
}

@ast('target', 'expressions', 'callInfo')
export class ModuleCall extends Expression {
    constructor(target, expressions) {
        super();
        this.target = target;
        this.expressions = expressions; // analyzer 패스를 거친 뒤로는 무의미
        this.callInfo = null; // analyzer 패스를 거친 뒤부터 접근 가능
    }
    fold() {
        for (let arg of this.callInfo.args) {
            arg.fold();
        }
        return this; // TODO: fold call
    }
    get repr() {
        return `@${ this.target.repr } ${ this.expressions.repr }`;
    }
}

@ast('expressions', 'callInfo')
export class CallBind extends Expression {
    constructor(expressions) {
        super();
        this.expressions = expressions;
        this.callInfo = null;
    }
}

@ast('target', 'expressions', 'callInfo')
export class ModuleCallBind extends Expression {
    constructor(target, expressions) {
        super();
        this.target = target;
        this.expressions = expressions;
        this.callInfo = null;
    }
}
export class Question extends Expression {}

// primitive
export class Primitive extends Expression {
    constructor(value) { super(); this.value = value; }
    get isConstant() { return true; }
    clone() { return new this.constructor(this.value); }
    get repr() {
        return `${ this.value }`;
    }
}
export class Name extends Primitive {
    constructor(value) {
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

@abstract
export class Number extends Primitive {}

export class Integer extends Number {} Integer.prototype.type = Integer;
export class Float extends Number {} Float.prototype.type = Float;

export class Boolean extends Primitive {} Boolean.prototype.type = Boolean;
export class Void extends Primitive {
    get repr() {
        return '()';
    }
} Void.prototype.type = Void;

// etc
@ast('start', 'stop')
export class Range extends Expression {
    constructor(start, stop) {
        super();
        this.start = start;
        this.stop = stop;
    }
}
Range.prototype.type = Range;

@astList('items')
export class List extends Expression {
    constructor() {
        super();
        this.items = [];
    }
}
List.prototype.type = List;

@astList('items')
export class Dict extends Expression {
    constructor() {
        super();
        this.items = [];
    }
}
Dict.prototype.type = Dict;

@ast('key', 'value')
export class DictKeyValue extends AstNode {
    constructor(key, value) {
        super();
        this.key = key;
        this.value = value;
    }
}

// unary operator
@abstract
@ast('rhs')
export class UnaryOperator extends Expression {
    constructor(rhs) {
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
@abstract
@ast('lhs', 'rhs')
export class BinaryOperator extends Expression {
    constructor(lhs, rhs) {
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
            return this.replace(new Boolean(this.lhs.fold().value === this.rhs.fold().value));
        }
        return this;
    }
}
Equal.prototype.type = Boolean;
export class NotEqual extends BinaryOperator {
    fold() {
        if (this.isConstant) {
            return this.replace(new Boolean(this.lhs.fold().value !== this.rhs.fold().value));
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
    constructor(def) {
        super();
        this.def = def;
        this.args = [];
    }
}

// description
export class Description extends AstNodeList {
    match(expressions) {
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
                let next = this.childNodes[i + 1];
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
    get parameters() {
        return this.childNodes.filter(item => item instanceof DescriptionParameter);
    }
    get repr() { return this.childNodes.map(expression => expression.repr).join(''); }
}
export class DescriptionParameter extends AstNode {
    constructor(value) { super(); this.value = value; }
    get repr() { return `(${ this.value })`; }
}
export class DescriptionName extends AstNode {
    constructor() {
        super();
        this.names = [];
    }
    needWhiteSpace = false;
    match(name) {
        if (!(name instanceof Name)) return false;
        return this.names.some(potential => name.value === potential);
    }
    postMatch(param) {
        if (!(param instanceof Name)) return 0;
        let match = this.names.find(potential => param.value.endsWith(potential));
        return match ? match.length : 0;
    }
    get length() { return this.names.length; }
    push(name) {
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
@abstract @def
@ast('description')
export class Def extends Statement {
    constructor() {
        super();
        this.scope = null;
        this.returnType = null;
        this.used = false; // 어딘가에서 호출된 적이 있는 정의인지 여부.
                           // see getCallInfo from analyzer.Scope
    }
    get hasSideEffect() { return true; }
    get repr() {
        return `정의 ${ this.description.repr }`;
    }
}

@ast('description', 'block')
export class Yaksok extends Def {
    constructor(description, block) {
        super();
        this.description = description;
        this.block = block;
    }
    get hasSideEffect() {
        // TODO: 현재 약속의 부수효과 여부 반환
        return super.hasSideEffect();
    }
    get repr() {
        return `약속 ${ this.description.repr }`;
    }
}

@ast('description')
export class Translate extends Def {
    constructor(description, target, code) {
        super();
        this.description = description;
        this.target = target; // string
        this.code = code; // string
    }
    get repr() {
        return `번역(${ this.target }) ${ this.description.repr }`;
    }
}

export NodeVisitor from './NodeVisitor';

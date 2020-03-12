import { AstListMixin, AstNode, AstNodeList, astList, child } from './base';
import { CallInfo, CallLike, Expression, Expressions, Name } from './expr';
import { Statement, Statements } from './stmt';


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

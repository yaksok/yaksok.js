const childFieldsMap = new WeakMap<any, string[]>();

function addChildFields(target: any, field: string) {
    let childFields = childFieldsMap.get(target);
    if (childFields == null) {
        childFields = [];
        childFieldsMap.set(target, childFields);
    }
    childFields.push(field);
}

export function* allChildFields(target: any) {
    while (target != null && target !== AstNode && target !== Function) {
        const childFields = childFieldsMap.get(target) ?? [];
        yield* childFields;
        target = Object.getPrototypeOf(target);
    }
}

// ast
export abstract class AstNode {
    parent: AstNode | null;

    constructor() {
        this.parent = null;
    }

    replaceChild<T extends AstNode>(before: T, after: T) {
        for (let field of allChildFields(this)) {
            if ((this as any)[field] === before) {
                after.parent = this;
                (this as any)[field] = after;
                return after;
            }
        }
        throw new Error('이 노드의 자식이 아닙니다.');
    }

    replace(after: this) {
        if (this.parent === null) {
            throw new Error('부모가 없습니다.');
        }
        return this.parent.replaceChild(this, after);
    }
}

export function child(target: any, field: string) {
    addChildFields(target.constructor, field);
    const privateField = '_' + field;
    Object.defineProperty(target, field, {
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

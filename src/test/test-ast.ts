import assert from 'assert';

import { AstNode, child, allChildFields } from '~/ast/base';
import { Name } from '~/ast';

describe('AstNode', () => {
    class Foo extends AstNode {
        @child foo: Foo | null;

        constructor(foo: Foo | null) {
            super();
            this.foo = foo;
        }
    }

    class Bar extends Foo {
        @child bar: Foo | null;

        constructor(foo: Foo | null, bar: Foo | null) {
            super(foo);
            this.bar = bar;
        }
    }

    specify('all childFields of Foo', () => {
        assert.deepStrictEqual(['foo'], Array.from(allChildFields(Foo)));
    });

    specify('all childFields of Bar', () => {
        assert.deepStrictEqual(['bar', 'foo'], Array.from(allChildFields(Bar)));
    });

    describe('@child', () => {
        it('should replace given field to a property', () => {
            const descriptor = Object.getOwnPropertyDescriptor(Foo.prototype, 'foo');
            assert.notEqual(descriptor, null);
            assert.strictEqual(descriptor?.configurable, true);
            assert.strictEqual(descriptor?.enumerable, false);
        });

        it('should enforce undefined to be null', () => {
            const a = new Foo(null);
            const b = new Foo(a);
            assert.strictEqual(b.foo, a);
            (b as any).foo = undefined;
            assert.strictEqual(b.foo, null);
        });
    });
});

describe('Name', () => {
    specify('constructor', () => {
        const foo = new Name('아무개');
        assert.strictEqual(foo.value, '아무개');
    });
});

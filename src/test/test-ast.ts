import assert from 'assert';

import { AstNode, child, allChildFields } from '~/ast/base';

describe('AstNode', () => {
    class Foo extends AstNode {
        @child foo: Foo | null;

        constructor(foo: Foo) {
            super();
            this.foo = foo;
        }
    }

    class Bar extends Foo {
        @child bar: Foo | null;

        constructor(foo: Foo, bar: Foo) {
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
});

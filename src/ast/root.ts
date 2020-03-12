import { AstNode, child } from './base';
import { Statements } from './stmt';
import { ModuleScope } from '~/analyzer';

export class YaksokRoot extends AstNode {
    hash: unknown;
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

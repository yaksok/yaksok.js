import YaksokParser from 'parser';
import * as ast from 'ast';

let descriptionParser = new YaksokParser(['START_DESCRIPTION']);

export class Builtin extends ast.AstNode {};
export class Yaksok extends Builtin {
    constructor(description) {
        super();
        let desc = descriptionParser.parse(description);
        desc.parent = this;
        this.description = desc;
    }
    match(call) { // same as ast.Def.match
        return this.description.match(call.expressions);
    }
};

export var yaksok = {
    보여주기: new Yaksok('(입력) 보여주기')
};

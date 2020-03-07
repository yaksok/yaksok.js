import { Parser } from '~/parser';
import * as ast from '~/ast';

const descriptionParser = new Parser(['START_DESCRIPTION']);

export class Builtin extends ast.AstNode {}

@ast.def
export class Yaksok extends Builtin {
    @ast.child description: ast.Description;
    constructor(description: string) {
        super();
        this.description = descriptionParser.parse(description);
    }
}

export var yaksok = {
    보여주기: new Yaksok('(입력) 보여주기'),
    호출하기: new Yaksok('(약속_) 호출하기'),
    호출하기2: new Yaksok('(약속_) 호출하기 (인자목록)')
}

import YaksokParser from 'parser';

let descriptionParser = new YaksokParser(['START_DESCRIPTION']);

export class Builtin {}
export class Yaksok extends Builtin {
    constructor(description) { super(); this.description = description }
    match(call) { // same as ast.Def.match
        return this.description.match(call.expressions);
    }
}
export var yaksok = {
    보여주기: y('(입력) 보여주기')
};

function y(desc) {
    return new Yaksok(descriptionParser.parse(desc));
}

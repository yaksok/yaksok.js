import YaksokLexer from 'lexer';
import * as ast from 'ast';
import { Parser as JisonYaksokParser } from 'parser.jison';

let yy = {
    parseString: string => eval(string),
    parseInteger: string => string | 0,
    parseFloat: string => +string,
    ast: ast,
    parseCall: expressions => {
        if (expressions.length > 1) return new yy.ast.Call(expressions);
        return expressions.childNodes[0];
    },
    postprocessDescription: description => {
        let filteredDescription = new ast.Description();
        let whitespace = false;
        for (let item of description) {
            if (item === null) {
                whitespace = true;
            } else {
                if (item instanceof ast.DescriptionName) {
                    item.needWhiteSpace = whitespace;
                    item.sort();
                }
                filteredDescription.push(item);
                whitespace = false;
            }
        }
        return filteredDescription;
    }
};

export default class YaksokParser {
    constructor(startTokens=['START_AST']) {
        this.jisonParser = new JisonYaksokParser();
        this.jisonParser.lexer = new YaksokLexer(startTokens);
        this.jisonParser.yy = yy;
    }
    parse(code) {
        return this.jisonParser.parse(code);
    }
}

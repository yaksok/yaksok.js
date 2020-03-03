import * as ast from 'ast';
import Lexer from './Lexer';
import { Parser as JisonYaksokParser } from '../generated/parser';

let yy = {
    parseString: string => eval(string),
    parseInteger: string => string | 0,
    parseFloat: string => +string,
    ast: ast,
    stmts: stmt => {
         let stmts = new ast.Statements();
         stmts.push(stmt);
         return stmts;
    },
    parseCall: expressions => {
        if (expressions.length > 1) return new ast.Call(expressions);
        let expression = expressions.childNodes[0];
        if (expression instanceof ast.Name) {
            expression.call = true;
        }
        return expression;
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

export default class Parser {
    constructor(startTokens=['START_AST']) {
        this.jisonParser = new JisonYaksokParser();
        this.jisonParser.lexer = new Lexer(startTokens);
        this.jisonParser.yy = yy;
    }
    parse(code) {
        return this.jisonParser.parse(code);
    }
}

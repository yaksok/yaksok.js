import * as ast from '~/ast';
import Lexer from './Lexer';
import { Parser as JisonYaksokParser } from '~/generated/parser';

const yy = {
    parseString: (text: string) => eval(text),
    parseInteger: (text: string) => (text as any) | 0,
    parseFloat: (text: string) => +text,
    ast,
    stmts: (stmt: ast.Statement) => {
         const stmts = new ast.Statements();
         stmts.push(stmt);
         return stmts;
    },
    parseCall: (expressions: ast.Expressions) => {
        if (expressions.length > 1) return new ast.Call(expressions);
        let expression = expressions.childNodes[0];
        if (expression instanceof ast.Name) {
            expression.call = true;
        }
        return expression;
    },
    postprocessDescription: (description: ast.Description) => {
        const filteredDescription = new ast.Description();
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
    private jisonParser = new JisonYaksokParser();
    constructor(startTokens=['START_AST']) {
        this.jisonParser.lexer = new Lexer(startTokens);
        this.jisonParser.yy = yy;
    }
    parse(code: string) {
        return this.jisonParser.parse(code);
    }
}

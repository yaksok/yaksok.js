import YaksokLexer from 'lexer';
import * as ast from 'ast';
import { parser } from 'parser.jison'; {
    parser.lexer = new YaksokLexer();
    let yy = parser.yy;
    yy.parseString = string => eval(string);
    yy.parseInteger = string => string | 0;
    yy.parseFloat = string => +string;
    yy.ast = ast;
    yy.parseCall = expressions => {
        if (expressions.length > 1) return new yy.ast.Call(expressions);
        return expressions[0];
    };
}

export default parser;

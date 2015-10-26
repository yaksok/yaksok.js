import Lexer from 'lex-es6';

const INITIAL_STATE = 0;
const SPECIAL_STATE = 1;
const ALL_STATES = [INITIAL_STATE, SPECIAL_STATE];
const LEXING_RULES = [];
const RESERVED = {
    약속: 'YAKSOK',
    만약: 'IF',
    이면: 'THEN',
    이라면: 'THEN',
    아니면: 'ELSE',
    아니라면: 'ELSE',
    아니면서: 'ELSEAND',
    참: 'TRUE',
    거짓: 'FALSE',
    반복: 'LOOP',
    그만: 'END_BLOCK',
    다시: 'CONTINUE',
    패스: 'PASS',
    이고: 'AND',
    그리고: 'AND',
    또는: 'OR',
    이거나: 'OR',
    이전: 'PREV',
};
const RESERVED_IN_LOOP = Object.assign({
    의: 'EUI',
    마다: 'MADA',
}, RESERVED);

export default class YaksokLexer extends Lexer {
    constructor() {
        super();
        this.tabSize = 8;
    }
    setInput(input) {
        super.setInput(input);
        this.state = INITIAL_STATE;
        this.lexingLoopCondition = false;
        this.lexingDescription = false;
        this.parenCount = 0;
        this.indent = [0];
    }
    lex() {
        let result = super.lex();
        let indent = this.indent;
        if (result === void 0) if (0 < indent[0]) {
            indent.shift();
            result = 'DEDENT';
            return result;
        }
        return result;
    }
    get tabSize() { return this._tabSize; }
    get tabSpaces() { return this._tabSpaces; }
    set tabSize(value) {
        this._tabSize = value;
        this._tabSpaces = Array(value + 1).join(' ');
    }
}
YaksokLexer.defunct = function (chr) {
    if (this.state === SPECIAL_STATE) {
        throw new Error('번역의 *** 쌍이 맞지 않습니다.');
    } else {
        throw new Error(`잘못된 문자입니다: ${ JSON.stringify(chr) }`);
    }
};

YaksokLexer.addRule(/\*{3}/, function (lexeme) {
    this.state = SPECIAL_STATE;
});

YaksokLexer.addRule(/(.|\n)*?\n\s*\*{3}/, function (lexeme) {
    this.yytext = lexeme.substring(0, lexeme.length - 3);
    this.state = INITIAL_STATE;
    return 'SPECIALBLOCK';
}, [SPECIAL_STATE]);

YaksokLexer.addRule(/번역/, function (lexeme) {
    this.lexingDescription = true;
    return 'TRANSLATE';
});

YaksokLexer.addRule(/[\t ]*#[^\n]*/); // comment

YaksokLexer.addRule(/^[\t ]*/gm, function (lexeme) {
    if (this.parenCount !== 0) {
        this.reject = true;
        return;
    }
    let indentation = lexeme.split('\t').join(this.tabSpaces).length;
    let indent = this.indent;
    if (indentation > indent[0]) {
        indent.unshift(indentation);
        return 'INDENT';
    }
    let dedents = [];
    while (indentation < indent[0]) {
        dedents.push('DEDENT');
        indent.shift();
    }
    if (dedents.length) {
        return dedents;
    }
});

YaksokLexer.addRule(/[\t ]+/, function (lexeme) {
    if (this.lexingDescription) {
        return 'WS';
    }
});

YaksokLexer.addRule(/0[xX][0-9a-fA-F]+/, function (lexeme) {
    this.yytext = parseInt(lexeme) + '';
    return 'INTEGER';
});
YaksokLexer.addRule(/\d*\.?\d+(?:[Ee](?:[+-]?\d+)?)?/, function (lexeme) {
    this.yytext = lexeme;
    if (/^[1-9][0-9]*$/.test(lexeme)) {
        return 'INTEGER';
    }
    if (/^0[0-9]*$/.test(lexeme)) {
        this.yytext = parseInt(lexeme, 8) + '';
        return 'INTEGER';
    }
    return 'FLOAT';
});
YaksokLexer.addRule(/"([^\\"]|\\.)*"|'([^\\']|\\.)*'/, 'STRING');

YaksokLexer.addRule(/[$_a-zA-Z가-힣][$_a-zA-Z가-힣0-9]*/, function (lexeme) {
    this.yytext = lexeme;
    let reserved = this.lexingLoopCondition ? RESERVED_IN_LOOP[lexeme] : RESERVED[lexeme];
    if (reserved) {
        switch (reserved) {
            case 'LOOP': {
                this.lexingLoopCondition = true;
            } break;
            case 'YAKSOK': {
                this.lexingDescription = true;
            } break;
            case 'END_BLOCK': {
                this.lexingDescription = false;
            } break;
            case 'PREV': {
                // TODO?
                return 'IDENTIFIER'
            } break;
        }
        return reserved;
    };
    return 'IDENTIFIER';
});

YaksokLexer.addRule(/:/, 'ASSIGN');
YaksokLexer.addRule(/,/, 'COMMA');
YaksokLexer.addRule(/~/, 'TILDE');
YaksokLexer.addRule(/@/, 'ATMARK');
YaksokLexer.addRule(/\+/, 'PLUS');
YaksokLexer.addRule(/-/, 'MINUS');
YaksokLexer.addRule(/\*/, 'MULT');
YaksokLexer.addRule(/\//, 'DIV');
YaksokLexer.addRule(/\%/, 'MOD');
YaksokLexer.addRule(/=/, 'EQ');
YaksokLexer.addRule(/>/, 'GT');
YaksokLexer.addRule(/</, 'LT');
YaksokLexer.addRule(/!=/, 'NE');
YaksokLexer.addRule(/>=/, 'GTEQ');
YaksokLexer.addRule(/<=/, 'LTEQ');

YaksokLexer.addRule(/(\r?\n)+/, function (lexeme) {
    if (this.lexingDescription) {
        this.lexingDescription = false;
    }
    if (this.parenCount === 0) {
        this.lexingLoopCondition = false;
        return 'NEWLINE';
    }
});

YaksokLexer.addRule(/\[/, function (lexeme) {
    ++this.parenCount;
    return 'LSQUARE';
});

YaksokLexer.addRule(/\]/, function (lexeme) {
    --this.parenCount;
    return 'RSQUARE';
});

YaksokLexer.addRule(/\(/, function (lexeme) {
    ++this.parenCount;
    return 'LPAR';
});

YaksokLexer.addRule(/\)/, function (lexeme) {
    --this.parenCount;
    return 'RPAR';
});

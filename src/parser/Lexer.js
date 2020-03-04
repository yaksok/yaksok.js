import Lex from 'lex-es6';

const INITIAL_STATE = 0;
const SPECIAL_STATE = 1;
const RESERVED = {
    약속: 'YAKSOK',
    결속: 'BIND',
    만약: 'IF',
    이면: 'THEN',
    이라면: 'THEN',
    아니면: 'ELSE',
    아니라면: 'ELSE',
    아니면서: 'ELSEIF',
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
    바깥: 'OUTSIDE',
};
const RESERVED_IN_LOOP = Object.assign({
    의: 'EUI',
    마다: 'MADA',
}, RESERVED);

export default class Lexer extends Lex {
    constructor(startQueue=[]) {
        super();
        this.tabSize = 8;
        this.startQueue = startQueue;
    }
    setInput(input) {
        super.setInput(input);
        this.queue = this.startQueue.slice();
        this.state = INITIAL_STATE;
        this.lexingLoopCondition = false;
        this.lexingDescription = false;
        this.parenCount = 0;
        this.indent = [0];
        if (this.queue[0] === 'START_DESCRIPTION') {
            this.lexingDescription = true;
        }
    }
    lex() {
        if (this.queue.length) return this.queue.shift();
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
Lexer.defunct = function (chr) {
    if (this.state === SPECIAL_STATE) {
        throw new Error('번역의 *** 쌍이 맞지 않습니다.');
    } else {
        throw new Error(`잘못된 문자입니다: ${ JSON.stringify(chr) }`);
    }
};

Lexer.addRule(/\*{3}/, function (lexeme) {
    this.state = SPECIAL_STATE;
});

Lexer.addRule(/(.|\r?\n)*?\r?\n\s*\*{3}/, function (lexeme) {
    this.yytext = lexeme.substring(0, lexeme.length - 3);
    this.state = INITIAL_STATE;
    return 'SPECIALBLOCK';
}, [SPECIAL_STATE]);

Lexer.addRule(/번역/, function (lexeme) {
    this.lexingDescription = true;
    return 'TRANSLATE';
});

Lexer.addRule(/[\t ]*#[^\r\n]*/); // comment

Lexer.addRule(/^[\t ]*\r?(?:\n|$)/); // whitespace-only line

Lexer.addRule(/^[\t ]*/gm, function (lexeme) {
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

Lexer.addRule(/[\t ]+/, function (lexeme) {
    if (this.lexingDescription) {
        return 'WS';
    }
});

Lexer.addRule(/0[xX][0-9a-fA-F]+/, function (lexeme) {
    this.yytext = parseInt(lexeme) + '';
    return 'INTEGER';
});
Lexer.addRule(/\d*\.?\d+(?:[Ee](?:[+-]?\d+)?)?/, function (lexeme) {
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
Lexer.addRule(/"([^\\"]|\\.)*"|'([^\\']|\\.)*'/, 'STRING');

Lexer.addRule(/[$_a-zA-Z가-힣][$_a-zA-Z가-힣0-9]*/, function (lexeme) {
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

Lexer.addRule(/:/, 'ASSIGN');
Lexer.addRule(/,/, 'COMMA');
Lexer.addRule(/\./, 'DOT');
Lexer.addRule(/~/, 'TILDE');
Lexer.addRule(/@/, 'ATMARK');
Lexer.addRule(/\?/, 'QUESTION');
Lexer.addRule(/\+/, 'PLUS');
Lexer.addRule(/-/, 'MINUS');
Lexer.addRule(/\*/, 'MULT');
Lexer.addRule(/\//, 'DIV');
Lexer.addRule(/\%/, 'MOD');
Lexer.addRule(/=/, 'EQ');
Lexer.addRule(/>/, 'GT');
Lexer.addRule(/</, 'LT');
Lexer.addRule(/!=/, 'NE');
Lexer.addRule(/>=/, 'GTEQ');
Lexer.addRule(/<=/, 'LTEQ');

Lexer.addRule(/(\r?\n)+/, function (lexeme) {
    if (this.lexingDescription) {
        this.lexingDescription = false;
    }
    if (this.parenCount === 0) {
        this.lexingLoopCondition = false;
        return 'NEWLINE';
    }
});

Lexer.addRule(/\{/, function (lexeme) {
    ++this.parenCount;
    return 'LCURLY';
});

Lexer.addRule(/\}/, function (lexeme) {
    --this.parenCount;
    return 'RCURLY';
});

Lexer.addRule(/\[/, function (lexeme) {
    ++this.parenCount;
    return 'LSQUARE';
});

Lexer.addRule(/\]/, function (lexeme) {
    --this.parenCount;
    return 'RSQUARE';
});

Lexer.addRule(/\(/, function (lexeme) {
    ++this.parenCount;
    return 'LPAR';
});

Lexer.addRule(/\)/, function (lexeme) {
    --this.parenCount;
    return 'RPAR';
});

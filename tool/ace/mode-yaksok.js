ace.define(
'ace/mode/yaksok_highlight_rules',
[   'require', 'exports', 'module',
    'ace/lib/oop', 'ace/mode/text_highlight_rules'
],
function (require, exports, module) {


var oop = require('../lib/oop');
var TextHighlightRules = require('./text_highlight_rules').TextHighlightRules;

var r = {};
r.i = '(?:(?:[1-9]\\d*)|(?:0))'; // integer
r.h = '(?:0[xX][0-9a-fA-F]+)'; // hex
r.f = '(?:\\d*\\.?\\d+(?:[Ee](?:[+-]?\\d+)?)?)'; // float
r.id = '(?:[$_a-zA-Z가-힣][$_a-zA-Z가-힣0-9]*)'; // identifier
r.o = '(?:!=|>=|<=|\\.|\\-|\\/|[~:+*%><])'; // operators

function YaksokHighlightRules() {
    var keywordMapper = this.createKeywordMapper({
        'support.function': '보여주기',
        'constant.language.boolean': '참|거짓',
        'keyword': [
            '약속', '번역', '만약', '반복', '그만', '다시', '이전',
            '이면', '이라면', '아니면', '아니라면', '아니면서',
            '이고', '그리고', '또는', '이거나',
            '바깥', '의', '마다'
        ].join('|')
    }, 'identifier');
    this.$rules = {
        'start': [
            { token: 'comment', regex: '#.*$' },
            { token: 'constant.numeric', regex: [r.i, r.h, r.f].join('|') },
            { token: 'string', regex: '\'(?=.)', next: 'qstring' },
            { token: 'string', regex: '\"(?=.)', next: 'qqstring' },
            { token: 'keyword.operator', regex: '^\\s*\\*{3}\\s*$', next: 'translate' },
            { token: 'keyword.operator', regex: r.o },
            { token: 'keyword', regex: '약속(?=\\s+그만)' },
            { token: 'storage.type', regex: '약속', next: 'description' },
            {
                token: [
                    'storage.type', 'text',
                    'paren.lparen', 'text', 'keyword', 'text', 'paren.rparen'
                ],
                regex: '(번역)(\\s*)(\\()(\\s*)(' + r.id + ')(\\s*)(\\))',
                next: 'description'
            },
            { token: keywordMapper, regex: r.id },
            { token: 'constant.language', regex: '\\(\\s*\\)' },
            { token: 'paren.lparen', regex: '[\\(\\[\\{]' },
            { token: 'paren.rparen', regex: '[\\)\\]\\}]' },
            { token: 'text', regex: '\\s+' }
        ],
        'qstring': [
            { token: 'string', regex: '\'|$', next: 'start' },
            { defaultToken: 'string' }
        ],
        'qqstring': [
            { token: 'string', regex: '\"|$', next: 'start' },
            { defaultToken: 'string' }
        ],
        'description': [
            { token: 'entity.name.function', regex: r.id },
            { token: 'paren.lparen', regex: '\\(', next: 'description_parameter' },
            { token: 'paren.rparen', regex: '\\)' },
            { token: 'keyword.operator', regex: '\\/' },
            { token: 'text', regex: '$', next: 'start' },
            { token: 'text', regex: '\\s+' }
        ],
        'description_parameter': [
            { token: 'variable.parameter', regex: r.id, next: 'description' },
            { token: 'text', regex: '\\s+' }
        ],
        'translate': [
            { token: 'keyword.operator', regex: '^\\s*\\*{3}', next: 'start' },
            { defaultToken: 'support.function' }
        ]
    };
}
oop.inherits(YaksokHighlightRules, TextHighlightRules);

exports.YaksokHighlightRules = YaksokHighlightRules;


}
);

ace.define(
'ace/mode/yaksok',
[   'require', 'exports', 'module',
    'ace/lib/oop', 'ace/mode/text', 'ace/mode/folding/pythonic', 'ace/range'
],
function (require, exports, module) {


var oop = require('../lib/oop');
var TextMode = require('./text').Mode;
var PythonFoldMode = require('./folding/pythonic').FoldMode;
var YaksokHighlightRules = require('./yaksok_highlight_rules').YaksokHighlightRules;

function YaksokMode() {}
oop.inherits(YaksokMode, TextMode);

var y = YaksokMode.prototype;
y.HighlightRules = YaksokHighlightRules;
y.foldingRules = new PythonFoldMode('^\\s*(?:약속(?!\\s+그만)|만약|반복).*$');
y.lineCommentStart = '#';
y.getNextLineIndent = function (state, line, tab) {
    var indent = this.$getIndent(line);
    var tokenizedLine = this.getTokenizer().getLineTokens(line, state);
    var tokens = tokenizedLine.tokens;
    if (tokens.length && tokens[tokens.length - 1].type === 'comment') {
        return indent;
    }
    if (state === 'start') {
        var match = line.match(
            /^(?:.*[\{\(\[]\s*|\s*(?:약속|만약|반복).*)$/
        );
        if (match) {
            indent += tab;
        }
    }
    return indent;
};
// TODO: auto outdent

exports.Mode = YaksokMode;


}
);

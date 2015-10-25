import YaksokLexer from 'lexer';
import yaksokParser from 'parser';
import JsCompiler from 'compiler/js';


const code1 = `변수: '문자열'
만약 1 = 1 이면
    변수 보여주기`;
const code2 = `
목록: [3, 1, 4, 1, 5, 9]
목록 보여주기
목록_길이: 6  # TODO: 목록 길이
반복 1~목록_길이-1 의 위치1 마다
    반복 위치1+1~목록_길이 의 위치2 마다
        만약 목록[위치2] < 목록[위치1] 이면
            임시: 목록[위치1]
            목록[위치1]: 목록[위치2]
            목록[위치2]: 임시
목록 보여주기
`;
const code3 = `
만약 참 이면
    1
아니라면
    2
만약 참 이면
    3
`;
const code4 = `
만약 참 이면
    1
만약 참 이면
    2
`;
const code5 = `
만약 참 이면
    1

아니라면
    2

만약 참 이면
    만약 참 이면
        3
        만약 참 이면
            4
        아니라면
            5
    아니면서 만약 참 이면
        6
    아니라면 만약 참 이면
        7
아니면서 만약 참 이면
    8
아니면서 만약 참 이면
    9
아니라면
    10
`;

const code6 = `
아이: 10
어른: 20
종찬: 22

약속 (입력)이/가/이가 어린가
    결과: 입력 < 15

(아이 가 어린가) 보여주기 # '아이'와 '가'를 붙이면 '아'라는 변수를 찾게되므로 에러.
(어른이 어린가) 보여주기
(종찬이가 어린가) 보여주기

약속 (입력1)이/가/이가 (입력2)보다/이보다 어린가/어린지
    결과: 입력1 < 입력2

(아이 가 종찬이보다 어린지) 보여주기
`;

const code7 = `
가: 1
나: 2
가: 3
`;

const code8 = `
약속 (숫자)의 피보나치
    만약 숫자 = 0 이면
        결과: 0
    아니면서 만약 숫자 = 1 이면
        결과: 1
    아니라면
        결과: ((숫자-1)의 피보나치) + ((숫자-2)의 피보나치)

(10의 피보나치) 보여주기
`;

const code9 = `
약속 (숫자)의 피보나치
    만약 숫자 = 0 이면
        결과: 0
        약속 그만
    만약 숫자 = 1 이면
        결과: 1
        약속 그만
    결과: ((숫자-1)의 피보나치) + ((숫자-2)의 피보나치)

(10의 피보나치) 보여주기
`;

const code10 = `
약속 공백
    ()
()
`;

function test_lexer(code) {
    let lexer = new YaksokLexer();
    lexer.setInput(code);
    let token = lexer.lex();
    while (token) {
        console.log(token);
        token = lexer.lex();
    }
    console.log();
}

function test_parser(code) {
    console.dir(yaksokParser.parse(code), { depth: null, colors: true });
    console.log();
}

async function test_compiler(code) {
    let compiler = new JsCompiler();
    console.log(await compiler.compile(code));
    console.log();
}

let code = code10;
console.log(code + '\n');
// test_lexer(code);
// test_parser(code);
test_compiler(code).catch(e => console.error(e.stack));

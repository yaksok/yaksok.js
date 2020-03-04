import { d, TextDumper } from './util';
import { JsTargetCompiler } from '~/compiler';

export async function run() {
    { // basic
        let compiler = new JsTargetCompiler({
            exports: {
                a: '1',
                b: '"문자열"',
                c: '참',
                숫자: '숫자',
                헬로월드: '헬로월드',
                테스트: '결속 테스트',
                우왕: '결속 "우왕"을 받는약속'
            }
        });
        let dumper = new TextDumper('js-exports', '.js');
        await d(compiler, dumper);
    }
};

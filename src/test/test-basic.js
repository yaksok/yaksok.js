import assert from 'assert';
import { run } from './util';

async function t(entry, expected) {
    let actual = await run('entry', { entry: entry });
    if (expected !== undefined) assert.equal(actual, expected);
}

describe('에러 없이 잘 도나', _=> {
    it('버블소트', async () => {
        await t(
            require('raw!./fixtures/bubble-sort.yak'),
            require('raw!./fixtures/bubble-sort.yak.out')
        );
    });
    it('if', async () => {
        await t(
            require('raw!./fixtures/if.yak'),
            require('raw!./fixtures/if.yak.out')
        );
    });
    it('if 두 번', async () => {
        await t(require('raw!./fixtures/if-and-if.yak'));
    });
    it('if-else 하고 if', async () => {
        await t(require('raw!./fixtures/if-else-and-if.yak'));
    });
    it('복잡한 if', async () => {
        await t(require('raw!./fixtures/complex-if.yak'));
    });
    it('아이 가 종찬이보다 어린가', async () => {
        await t(
            require('raw!./fixtures/jongchan.yak'),
            require('raw!./fixtures/jongchan.yak.out')
        );
    });
    it('깐데또까', async () => {
        await t(require('raw!./fixtures/assign-twice.yak'));
    });
    it('피보나치', async () => {
        await t(
            require('raw!./fixtures/fibonacci.yak'),
            require('raw!./fixtures/fibonacci.yak.out')
        );
    });
    it('피보나치2', async () => {
        await t(
            require('raw!./fixtures/fibonacci2.yak'),
            require('raw!./fixtures/fibonacci2.yak.out')
        );
    });
    it('공백', async () => {
        await t(require('raw!./fixtures/void.yak'));
    });
    it('번역', async () => {
        await t(
            require('raw!./fixtures/translate.yak'),
            require('raw!./fixtures/translate.yak.out')
        );
    });
    it('번역2', async () => {
        await t(
            require('raw!./fixtures/translate2.yak'),
            require('raw!./fixtures/translate2.yak.out')
        );
    });
    it('바깥', async () => {
        await t(
            require('raw!./fixtures/nonlocal.yak'),
            require('raw!./fixtures/nonlocal.yak.out')
        );
    });
    it('사전', async () => {
        await t(
            require('raw!./fixtures/dic.yak'),
            require('raw!./fixtures/dic.yak.out')
        );
    });
    // TODO: 돌리면 깨지는데, 당분간은 해결할 생각이 없습니다.
    // irc 오징어서버 #yaksok 채널로 오셔서 같의 논의해보도록 해요.
    // it('이스케이프', async () => {
    //     await t(require('raw!./fixtures/escape.yak'));
    // });
    it('계산', async () => {
        await t(
            require('raw!./fixtures/calc.yak'),
            require('raw!./fixtures/calc.yak.out')
        );
    });
});

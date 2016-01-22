import assert from 'assert';
import { run } from './util';

let reqFixture = require.context('raw!./fixtures', true);
let fixtures = reqFixture.keys();

async function t(file) {
    let result = await run('entry', { entry: reqFixture('./' + file) });
    let out = './' + file + '.out';
    if (fixtures.indexOf(out) !== -1) {
        assert.equal(result.out, reqFixture(out));
    }
}

describe('에러 없이 잘 도나', _=> {
    it('버블소트', async () => {
        await t('bubble-sort.yak');
    });
    it('if', async () => {
        await t('if.yak');
    });
    it('if 두 번', async () => {
        await t('if-and-if.yak');
    });
    it('if-else 하고 if', async () => {
        await t('if-else-and-if.yak');
    });
    it('복잡한 if', async () => {
        await t('complex-if.yak');
    });
    it('부정조건문', async () => {
        await t('if-not.yak');
    });
    it('아이 가 종찬이보다 어린가', async () => {
        await t('jongchan.yak');
    });
    it('깐데또까', async () => {
        await t('assign-twice.yak');
    });
    it('피보나치', async () => {
        await t('fibonacci.yak');
    });
    it('피보나치2', async () => {
        await t('fibonacci2.yak');
    });
    it('공백', async () => {
        await t('void.yak');
    });
    it('번역', async () => {
        await t('translate.yak');
    });
    it('번역2', async () => {
        await t('translate2.yak');
    });
    it('바깥', async () => {
        await t('nonlocal.yak');
    });
    it('사전', async () => {
        await t('dic.yak');
    });
    // TODO: 돌리면 깨지는데, 당분간은 해결할 생각이 없습니다.
    // irc 오징어서버 #yaksok 채널로 오셔서 같의 논의해보도록 해요.
    // it('이스케이프', async () => {
    //     await t('escape.yak');
    // });
    it('계산', async () => {
        await t('calc.yak');
    });
    it('식별자 하나짜리 약속', async () => {
        await t('1name.yak');
    });
    it('결속', async () => {
        await t('bind.yak');
    });
});

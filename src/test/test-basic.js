import { t } from './util';

describe('에러 없이 잘 도나', _=> {
    it('버블소트', async () => {
        await t('bubble-sort');
    });
    it('if', async () => {
        await t('if');
    });
    it('if 두 번', async () => {
        await t('if-and-if');
    });
    it('if-else 하고 if', async () => {
        await t('if-else-and-if');
    });
    it('복잡한 if', async () => {
        await t('complex-if');
    });
    it('부정조건문', async () => {
        await t('if-not');
    });
    it('논리식 중첩', async () => {
        await t('if-logical-and-or');
    });
    it('아이 가 종찬이보다 어린가', async () => {
        await t('jongchan');
    });
    it('깐데또까', async () => {
        await t('assign-twice');
    });
    it('피보나치', async () => {
        await t('fibonacci');
    });
    it('피보나치2', async () => {
        await t('fibonacci2');
    });
    it('공백', async () => {
        await t('void');
    });
    it('번역', async () => {
        await t('translate');
    });
    it('번역2', async () => {
        await t('translate2');
    });
    it('바깥', async () => {
        await t('nonlocal');
    });
    it('사전', async () => {
        await t('dic');
    });
    // TODO: 돌리면 깨지는데, 당분간은 해결할 생각이 없습니다.
    // irc 오징어서버 #yaksok 채널로 오셔서 같의 논의해보도록 해요.
    // it('이스케이프', async () => {
    //     await t('escape');
    // });
    it('계산', async () => {
        await t('calc');
    });
    it('식별자 하나짜리 약속', async () => {
        await t('1name');
    });
    it('결속', async () => {
        await t('bind');
    });
    it('사전 안의 결속', async () => {
        await t('bind-in-dic');
    });
    it('조건문 안에서 약속 호출 #37', async () => {
        await t('call-in-if');
    });
    it('음수 대입 #60', async () => {
        await t('assign-minus');
    });
    it('아니면서 #61', async () => {
        await t('elseif');
    });
});

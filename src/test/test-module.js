import { t } from './util';

describe('모듈', _=> {
    it('의존성의 부수효과가 먼저 발생되어야 함', async () => {
        await t('module/a');
    });
    it('약속 안에서 모듈약속 호출', async () => {
        await t('module/call-in-yaksok');
    });
    it('약속 안의 약속 안에서 모듈약속 호출', async () => {
        await t('module/call-in-nested-yaksok');
    });
    it('약속 안에서 모듈약속 결속', async () => {
        await t('module/bind-in-yaksok');
    });
});

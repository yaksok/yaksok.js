import { t } from './util';

describe('모듈', _=> {
    it('의존성의 부수효과가 먼저 발생되어야 함', async () => {
        await t('module/a');
    });
});

import assert from 'assert';
import { run } from './util';

describe('기본', _=> {
    it('의존성의 부수효과가 먼저 발생되어야 함', async () => {
        let result = await run('a', {
            a: require('raw!./fixtures/module/a.yak'),
            b: require('raw!./fixtures/module/b.yak')
        });
        assert.equal(result.out, require('raw!./fixtures/module/a.yak.out'));
    });
});

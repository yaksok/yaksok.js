import path from 'path';

import { CommonContext } from 'module/context';
import { CommonLoader } from 'module/loader';

describe('잘 불러와지나', _=> {
    it('약속, yak, ㅇㅅ, yaksok', async () => {
        await l('src/test/misc/load/a');
        await l('src/test/misc/load/b');
        await l('src/test/misc/load/c');
        await l('src/test/misc/load/d');
        await l('src/test/misc/load/e');
    });
});

let commonLoader = new CommonLoader();

async function l(filePath) {
    return await commonLoader.load(c(filePath));
}

function c(filePath) {
    return CommonContext.getContextFromPath(filePath);
}

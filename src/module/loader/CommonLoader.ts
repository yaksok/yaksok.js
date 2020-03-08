import Loader from '~/module/loader/Loader';
import { CommonContext, Context } from '~/module/context';

export default class CommonLoader extends Loader {
    async load(context: Context): Promise<string> {
        if (context instanceof CommonContext) return await load(context);
        else return await super.load(context);
    }
}

async function load(commonContext: CommonContext) {
    let filePath = await CommonContext.getScriptPathFromContext(commonContext);
    return await readFile(filePath);
}

function readFile(filePath: string): Promise<string> {
    const fs = eval('require("fs-extra")');
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err: any, data: any) => {
            if (err) reject(err);
            else resolve(data);
        });
    });
}

import Loader from 'module/loader/Loader';
import { CommonContext } from 'module/context';

export default class CommonLoader extends Loader {
    async load(context) {
        if (context instanceof CommonContext) return await load(context);
        else return await super.load(context);
    }
}

async function load(commonContext) {
    let filePath = await CommonContext.getScriptPathFromContext(commonContext);
    return await readFile(filePath);
}

function readFile(filePath) {
    const fs = eval('require("fs-extra")');
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) reject(err);
            else resolve(data);
        });
    });
}

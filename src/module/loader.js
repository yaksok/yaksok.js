import path from 'path';
import { RawContext, CommonContext } from 'module/context';
import { Parser } from 'parser';

export class Loader {
    constructor() {
        this.parser = new Parser();
    }
    async get(context) {
        return this.parser.parse(await this.load(context));
    }
    async load(context) {
        if (context instanceof RawContext) return context.sourceCode;
        else throw new Error('unexpected module context');
    }
};

export class CommonLoader extends Loader {
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

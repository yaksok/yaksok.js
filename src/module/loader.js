export class Loader {
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

function load(commonContext) {
    return new Promise((resolve, reject) => {
        const fs = eval('require("fs-extra")');
        let filePath = path.join(commonContext.dir, commonContext.name + '.yak');
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) reject(err);
            else resolve(data);
        });
    });
}

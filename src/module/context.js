import path from 'path';
import uuid from 'uuid';

export class Context {
    constructor() {
        this.from = null;
    }
    hash() {
        if (this.__hash__)
            return this.__hash__;
        this.__hash__ = uuid.v4();
        return this.__hash__;
    }
    toString() { return this.hash(); }
};

export class RawContext extends Context {
    constructor(sourceCode) {
        super();
        this.sourceCode = sourceCode + '';
    }
};

export class CommonContext extends Context {
    constructor(name, dir='.') {
        super();
        this.name = name;
        this._dir = dir;
    }
    get dir() {
        if (this.from instanceof CommonContext) {
            return path.join(this.from.dir, this._dir);
        } else {
            return this._dir;
        }
    }
    hash() { return `common:${ this.name }`; }
    static getContextFromPath(filePath) {
        let basename;
        if (filePath.endsWith('.약속')) basename = path.basename(filePath, '.약속');
        else if (filePath.endsWith('.yak')) basename = path.basename(filePath, '.yak');
        else if (filePath.endsWith('.ㅇㅅ')) basename = path.basename(filePath, '.ㅇㅅ');
        else if (filePath.endsWith('.yaksok')) basename = path.basename(filePath, '.yaksok');
        else basename = path.basename(filePath);
        return new CommonContext(basename, path.dirname(filePath));
    }
    static async getScriptPath(commonContext) {
        let p1 = path.join(commonContext.dir, commonContext.name + '.약속');
        let p2 = path.join(commonContext.dir, commonContext.name + '.yak');
        let p3 = path.join(commonContext.dir, commonContext.name + '.ㅇㅅ');
        let p4 = path.join(commonContext.dir, commonContext.name + '.yaksok');
        let p5 = path.join(commonContext.dir, commonContext.name);
        if (await isFile(p1)) return p1;
        if (await isFile(p2)) return p2;
        if (await isFile(p3)) return p3;
        if (await isFile(p4)) return p4;
        return p5;
    }
};

function stat(path) {
    const fs = eval('require("fs-extra")');
    return new Promise((resolve, reject) => {
        fs.stat(path, (err, stats) => {
            if (err) reject(err);
            else resolve(stats);
        });
    });
}

async function isFile(path) {
    try {
        return (await stat(path)).isFile();
    } catch (e) {
        return false;
    }
}

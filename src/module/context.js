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
};

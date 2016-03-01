import { Parser } from 'parser';
import { RawContext } from 'module/context';

export default class Loader {
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

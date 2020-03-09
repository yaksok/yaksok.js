import { Compiler } from '~/compiler';
import { Parser } from '~/parser';
import { Context, RawContext } from '~/module/context';

export default class Loader {
    compiler: Compiler | null = null;
    parser: Parser;

    constructor() {
        this.parser = new Parser();
    }
    async get(context: Context) {
        return this.parser.parse(await this.load(context));
    }
    async load(context: Context): Promise<string> {
        if (context instanceof RawContext) return context.sourceCode;
        else throw new Error('unexpected module context');
    }
};

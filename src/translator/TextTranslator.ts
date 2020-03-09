import { YaksokRoot } from '~/ast';
import Translator from '~/translator/Translator';

export default class TextTranslator extends Translator {
    result: (string | { toString(): string })[] = [];
    indent = 0;

    async init() {
        await super.init();
        this.result = [];
        this.indent = 0;
    }
    lazyWrite(func: () => string) { this.result.push({ toString: func }); }
    write(code: string) { this.result.push(code); }
    writeIndent() { this.result.push(Array(this.indent + 1).join('    ')); }
    async translate(astRoot: YaksokRoot) {
        await super.translate(astRoot);
        return this.result.join('');
    }
};

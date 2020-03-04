import Translator from '~/translator/Translator';

export default class TextTranslator extends Translator {
    async init() {
        await super.init();
        this.result = [];
        this.indent = 0;
    }
    lazyWrite(func) { this.result.push({toString: func}); }
    write(code) { this.result.push(code); }
    writeIndent() { this.result.push(Array(this.indent + 1).join('    ')); }
    async translate(astRoot) {
        await super.translate(astRoot);
        return this.result.join('');
    }
};

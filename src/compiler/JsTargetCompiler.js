import Compiler from '~/compiler/Compiler';
import { Parser } from '~/parser';
import { JsTranslator } from '~/translator';

const callParser = new Parser(['START_CALL']);

export default class JsTargetCompiler extends Compiler {
    constructor(...args) {
        super(...args);
        this.translator = new JsTranslator();
        this.translateTargets = ['js', 'javascript', '자바스크립트'];
        this.exports = null;
    }
    async analyzePass(entryAstRoot) {
        let ast = super.analyzePass(entryAstRoot);
        let { exports } = this.config;
        if (exports) {
            this.exports = {};
            for (let [key, callCode] of Object.entries(exports)) {
                let call = callParser.parse(callCode);
                await this.analyzer.visit(call);
                this.exports[key] = call;
            }
        }
        return ast;
    }
}

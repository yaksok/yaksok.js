import YaksokCompiler from 'compiler';
import JsTranslator from 'translator/js';

export default class JsTargetCompiler extends YaksokCompiler {
    constructor() {
        super(...arguments);
        this.translator = new JsTranslator();
        this.translateTargets = ['js', 'javascript', '자바스크립트'];
    }
}

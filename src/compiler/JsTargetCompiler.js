import { Compiler } from 'compiler';
import { JsTranslator } from 'translator';

export default class JsTargetCompiler extends Compiler {
    constructor() {
        super(...arguments);
        this.translator = new JsTranslator();
        this.translateTargets = ['js', 'javascript', '자바스크립트'];
    }
}

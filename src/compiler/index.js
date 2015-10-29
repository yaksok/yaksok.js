import { NodeVisitor } from 'ast';
import parser from 'parser';
import Analyzer from 'analyzer';

export default class Compiler extends NodeVisitor {
    constructor() {
        super();
        this.analyzer = new Analyzer();
    }
    write(code) { this.result.push(code); }
    init() {
        super.init();
        this.result = [];
        this.analyzer.translateTargets = this.translateTargets;
    }
    async prepareAstRoot(code) {
        let astRoot = parser.parse(code);
        await this.analyzer.analyze(astRoot);
        // TODO: optimizer
        // await this.optimizer.optimize(astRoot);
        return astRoot;
    }
    async compile(code) {
        this.init();
        let astRoot = await this.prepareAstRoot(code);
        await this.visit(astRoot);
        return this.result.join('');
    }
}

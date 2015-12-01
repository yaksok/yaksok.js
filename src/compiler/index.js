import { NodeVisitor } from 'ast';
import YaksokParser from 'parser';
import Analyzer from 'analyzer';
import { yaksok as builtinYaksok } from 'builtin';

export const BEFORE_ANALYZE = {};
export const AFTER_ANALYZE = {};

export default class YaksokCompiler extends NodeVisitor {
    constructor(config={}) {
        super();
        this.parser = new YaksokParser();
        this.analyzer = new Analyzer();
        this.plugins = new CompilerPlugins();
        this.config = config;
        this.translateTargets = [];
        this.builtinDefs = {...builtinYaksok};
    }
    init() {
        super.init();
        this.result = [];
        this.analyzer.translateTargets = this.translateTargets;
        this.analyzer.builtinDefs = this.builtinDefs;
    }
    write(code) { this.result.push(code); }
    async prepareAstRoot(code) {
        let astRoot = this.parser.parse(code);
        for (let plugin of this.plugins.get(BEFORE_ANALYZE))
            await plugin.run(astRoot, this.config);
        await this.analyzer.analyze(astRoot);
        for (let plugin of this.plugins.get(AFTER_ANALYZE))
            await plugin.run(astRoot, this.config);
        return astRoot;
    }
    async compile(code) {
        this.init();
        let astRoot = await this.prepareAstRoot(code);
        await this.visit(astRoot);
        return this.result.join('');
    }
}

class CompilerPlugins {
    constructor() { this.clear(); }
    clear() { this.map = new Map(); }
    get(phase=AFTER_ANALYZE) { return this.map.has(phase)? this.map.get(phase).slice() : []; }
    add(plugins=[], phase=AFTER_ANALYZE) { this.map.set(phase, this.get(phase).concat(plugins)); }
}

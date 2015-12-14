import { NodeVisitor } from 'ast';
import {
    Loader as ModuleLoader,
    Resolver as ModuleResolver,
    RawContext as ModuleRawContext
} from 'module';
import Analyzer from 'analyzer';
import { yaksok as builtinYaksok } from 'builtin';

export const BEFORE_ANALYZE = {};
export const AFTER_ANALYZE = {};

export default class Compiler extends NodeVisitor {
    constructor(config={}) {
        super();
        this.plugins = new CompilerPlugins();
        this.moduleLoader = new ModuleLoader();
        this.moduleResolver = new ModuleResolver();
        this.analyzer = new Analyzer();
        this.translator = null;
        this.config = config;
        this.translateTargets = [];
        this.builtinDefs = {...builtinYaksok};
    }
    get entryModuleHash() { return this.entryContext.hash(); }
    getAstRoot(moduleHash=null) {
        if (moduleHash === null) {
            return this.astMap[this.entryModuleHash];
        } else {
            return this.astMap[moduleHash];
        }
    }
    async init() {
        await super.init();
        { // module
            this.moduleResolver.loader = this.moduleLoader;
            this.moduleOrder = []; // module context(except entry context) hash list
            this.astMap = {}; // key: module context hash, value: module ast root
        }
        { // compiler instance is global state of all pass
            this.moduleLoader.compiler =
            this.moduleResolver.compiler =
            this.analyzer.compiler =
            this.translator.compiler =
            this;
        }
    }
    async compile(context) {
        await this.init();
        { // context
            if (typeof context === 'string' || context instanceof String) {
                this.entryContext = new ModuleRawContext(context);
            } else {
                this.entryContext = context;
            }
        }
        let entryAstRoot = await this.moduleResolver.resolve(this.entryContext);
        // before analyze
        for (let plugin of this.plugins.get(BEFORE_ANALYZE)) {
            plugin.compiler = this;
            await plugin.run(entryAstRoot, this.config);
        }
        // analyze
        await this.analyzer.analyze(entryAstRoot);
        // after analyze
        for (let plugin of this.plugins.get(AFTER_ANALYZE)) {
            plugin.compiler = this;
            await plugin.run(entryAstRoot, this.config);
        }
        return await this.translator.translate(entryAstRoot);
    }
}

class CompilerPlugins {
    constructor() { this.clear(); }
    clear() { this.map = new Map(); }
    get(phase=AFTER_ANALYZE) { return this.map.has(phase)? this.map.get(phase).slice() : []; }
    add(plugins=[], phase=AFTER_ANALYZE) { this.map.set(phase, this.get(phase).concat(plugins)); }
}

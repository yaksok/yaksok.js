import { NodeVisitor } from 'ast';
import {
    Loader as ModuleLoader,
    Resolver as ModuleResolver,
    RawContext as ModuleRawContext
} from 'module';
import Analyzer from 'analyzer';
import { yaksok as builtinYaksok } from 'builtin';

export const BEFORE_RESOLVE = {};
export const AFTER_RESOLVE = {};
export const BEFORE_ANALYZE = {};
export const AFTER_ANALYZE = {};
export const BEFORE_TRANSLATE = {};
export const AFTER_TRANSLATE = {};

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
        let ast = null;
        { // resolve pass
            await this.pluginPass(ast, BEFORE_RESOLVE);
            ast = await this.resolvePass(this.entryContext);
            await this.pluginPass(ast, AFTER_RESOLVE);
        }
        { // analyze pass
            await this.pluginPass(ast, BEFORE_ANALYZE);
            await this.analyzePass(ast);
            await this.pluginPass(ast, AFTER_ANALYZE);
        }
        { // translate pass
            let result;
            await this.pluginPass(ast, BEFORE_TRANSLATE);
            result = this.translatePass(ast);
            await this.pluginPass(ast, AFTER_TRANSLATE);
            return result;
        }
    }
    async resolvePass(entryContext) {
        return await this.moduleResolver.resolve(entryContext);
    }
    async analyzePass(entryAstRoot) {
        return await this.analyzer.analyze(entryAstRoot);
    }
    async translatePass(entryAstRoot) {
        return await this.translator.translate(entryAstRoot);
    }
    async pluginPass(entryAstRoot, phase) {
        for (let plugin of this.plugins.get(phase)) {
            plugin.compiler = this;
            await plugin.run(entryAstRoot, this.config);
        }
    }
}

class CompilerPlugins {
    constructor() { this.clear(); }
    clear() { this.map = new Map(); }
    get(phase=AFTER_ANALYZE) {
        return this.map.has(phase)? this.map.get(phase).slice() : [];
    }
    add(plugin, phase=null) {
        if (Array.isArray(plugin)) {
            for (let _plugin of plugin) {
                this.add(_plugin, phase);
            }
        }
        phase = phase || plugin.phase || AFTER_ANALYZE;
        this.map.set(phase, this.get(phase).concat(plugin));
    }
}

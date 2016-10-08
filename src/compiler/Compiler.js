import NodeVisitor from 'ast/NodeVisitor';
import { Resolver as ModuleResolver } from 'module';
import { Loader as ModuleLoader } from 'module/loader';
import { RawContext as ModuleRawContext } from 'module/context';
import { Analyzer } from 'analyzer';
import { yaksok as builtinYaksok } from 'builtin';
import {
    BEFORE_RESOLVE,
    AFTER_RESOLVE,
    BEFORE_ANALYZE,
    AFTER_ANALYZE,
    BEFORE_TRANSLATE,
    AFTER_TRANSLATE
} from 'compiler';

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
            this.moduleDependencyMap = {}; // key: module context(except entry context) hash, value: dependency context hash set
            this.moduleOrder = null;
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
    touchDependency(moduleHash) {
        const dependencySet = this.moduleDependencyMap[moduleHash] || new Set();
        this.moduleDependencyMap[moduleHash] = dependencySet;
        return dependencySet;
    }
    touchDependencies(...args) {
        return args.map(arg => this.touchDependency(arg));
    }
    addModuleDependency(moduleHash, submoduleHash) {
        const [dependencySet] = this.touchDependencies(moduleHash, submoduleHash);
        dependencySet.add(submoduleHash);
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
        let ast;
        { // resolve pass
            await this.pluginPass(null, BEFORE_RESOLVE);
            ast = await this.resolvePass(this.entryContext);
            ast = await this.pluginPass(ast, AFTER_RESOLVE);
        }
        { // calculate module order
            this.moduleOrder = Object.keys(this.moduleDependencyMap).filter(
                hash => hash !== this.entryContext.hash()
            ).sort((a, b) => {
                const {[a]: aSet, [b]: bSet} = this.moduleDependencyMap;
                if (aSet.has(b)) return 1;
                if (bSet.has(a)) return -1;
                return 0;
            });
        }
        { // analyze pass
            ast = await this.pluginPass(ast, BEFORE_ANALYZE);
            ast = await this.analyzePass(ast);
            ast = await this.pluginPass(ast, AFTER_ANALYZE);
        }
        { // translate pass
            let result;
            ast = await this.pluginPass(ast, BEFORE_TRANSLATE);
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
        let ast = entryAstRoot;
        for (let plugin of this.plugins.get(phase)) {
            plugin.compiler = this;
            ast = await plugin.run(ast, this.config) || ast;
        }
        return ast;
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

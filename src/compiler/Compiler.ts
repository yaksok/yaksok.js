import NodeVisitor from '~/ast/NodeVisitor';
import { Resolver as ModuleResolver } from '~/module';
import { Loader as ModuleLoader } from '~/module/loader';
import { RawContext as ModuleRawContext, Context as ModuleContext } from '~/module/context';
import { Analyzer } from '~/analyzer';
import { Yaksok as BuiltinYaksok, yaksok as builtinYaksok } from '~/builtin';
import {
    BEFORE_RESOLVE,
    AFTER_RESOLVE,
    BEFORE_ANALYZE,
    AFTER_ANALYZE,
    BEFORE_TRANSLATE,
    AFTER_TRANSLATE,
    PluginPhase,
} from '~/compiler';
import { Translator } from '~/translator';
import { YaksokRoot } from '~/ast';
import { Plugin } from '~/plugin';

export interface CompilerConfig {
    exports?: { [key: string]: string };
}

export default class Compiler extends NodeVisitor {
    plugins = new CompilerPlugins();
    moduleLoader = new ModuleLoader();
    moduleResolver = new ModuleResolver();
    analyzer = new Analyzer();
    translator: Translator | null = null;
    builtinDefs: { [key: string]: BuiltinYaksok } = { ...builtinYaksok };
    entryContext: ModuleContext | null = null;
    astMap: { [key: string]: YaksokRoot } = {};

    // key: module context(except entry context) hash, value: dependency context hash set
    moduleDependencyMap: { [key: string]: Set<string> } = {};
    moduleOrder: string[] | null = null;

    constructor(protected config: CompilerConfig = {}) {
        super();
    }
    get entryModuleHash() {
        if (this.entryContext == null) {
            throw new Error('먼저 Compiler.compile() 메서드를 실행해야 합니다');
        }
        return this.entryContext.hash();
    }
    getAstRoot(moduleHash?: string) {
        if (moduleHash == null) {
            return this.astMap[this.entryModuleHash];
        } else {
            return this.astMap[moduleHash];
        }
    }
    async init() {
        await super.init();
        { // module
            this.moduleResolver.loader = this.moduleLoader;
            this.moduleDependencyMap = {};
            this.moduleOrder = null;
            this.astMap = {}; // key: module context hash, value: module ast root
        }
        { // compiler instance is global state of all pass
            this.moduleLoader.compiler =
            this.moduleResolver.compiler =
            this.analyzer.compiler =
            this;
            if (this.translator != null) {
                this.translator.compiler = this;
            }
        }
    }
    touchDependency(moduleHash: string) {
        const dependencySet = this.moduleDependencyMap[moduleHash] || new Set();
        this.moduleDependencyMap[moduleHash] = dependencySet;
        return dependencySet;
    }
    touchDependencies(...args: string[]) {
        return args.map(arg => this.touchDependency(arg));
    }
    addModuleDependency(moduleHash: string, submoduleHash: string) {
        const [dependencySet] = this.touchDependencies(moduleHash, submoduleHash);
        dependencySet.add(submoduleHash);
    }
    async compile(context: ModuleContext | string) {
        await this.init();
        { // context
            if (typeof context === 'string') {
                this.entryContext = new ModuleRawContext(context);
            } else {
                this.entryContext = context;
            }
        }
        let ast: YaksokRoot;
        { // resolve pass
            await this.pluginPass(null, BEFORE_RESOLVE);
            ast = await this.resolvePass(this.entryContext);
            ast = await this.pluginPass(ast, AFTER_RESOLVE);
        }
        { // calculate module order
            const entryContextHash = this.entryContext.hash();
            this.moduleOrder = Object.keys(this.moduleDependencyMap).filter(
                hash => hash !== entryContextHash
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
    resolvePass(entryContext: ModuleContext): Promise<YaksokRoot> {
        return this.moduleResolver.resolve(entryContext);
    }
    analyzePass(entryAstRoot: YaksokRoot): Promise<YaksokRoot> {
        return this.analyzer.analyze(entryAstRoot);
    }
    translatePass(entryAstRoot: YaksokRoot): Promise<string> {
        if (this.translator == null) {
            throw new Error('translator가 초기화되지 않았습니다');
        }
        return this.translator.translate(entryAstRoot);
    }

    async pluginPass(entryAstRoot: YaksokRoot, phase: PluginPhase): Promise<YaksokRoot>;
    async pluginPass(entryAstRoot: null, phase: PluginPhase): Promise<null>;
    async pluginPass(entryAstRoot: YaksokRoot | null, phase: PluginPhase): Promise<YaksokRoot | null> {
        let ast = entryAstRoot;
        for (let plugin of this.plugins.get(phase)) {
            plugin.compiler = this;
            ast = await plugin.run(ast!, this.config) || ast;
        }
        return ast;
    }
}

class CompilerPlugins {
    private map!: Map<PluginPhase, Plugin[]>;

    constructor() { this.clear(); }
    clear() { this.map = new Map(); }
    get(phase: PluginPhase = AFTER_ANALYZE): Plugin[] {
        return this.map.get(phase)?.slice() ?? [];
    }
    add(plugin: Plugin, phase?: PluginPhase) {
        if (Array.isArray(plugin)) {
            for (let _plugin of plugin) {
                this.add(_plugin, phase);
            }
        }
        const p = phase || plugin.phase || AFTER_ANALYZE;
        this.map.set(p, this.get(phase).concat(plugin));
    }
}

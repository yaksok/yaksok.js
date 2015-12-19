import JsTargetCompiler from 'compiler/js';
import {
    Loader as ModuleLoader,
    CommonContext
} from 'module';

class TestLoader extends ModuleLoader {
    constructor(modules={}) {
        super();
        this.modules = modules;
    }
    async load(context) {
        if (context instanceof CommonContext) return this.modules[context.name];
        return await super.load(context);
    }
}

export async function run(entryModuleName, modules) {
    let compiler = new JsTargetCompiler();
    compiler.moduleLoader = new TestLoader(modules);
    let js = await compiler.compile(new CommonContext(entryModuleName));
    let log = '';
    let console = {log: x => log += x + '\n'};
    eval(js);
    return log;
};

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
    let out = '';
    let console = {log: x => out += x + '\n'};
    let babeled = eval('require("babel-core")').transform(js).code;
    eval(babeled);
    return { js, babeled, out };
};

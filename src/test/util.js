import path from 'path';
import assert from 'assert';

const fs = eval('require("fs-extra")');
const babel = eval('require("babel-core")');

import { JsTargetCompiler } from 'compiler';
import { Loader as ModuleLoader } from 'module/loader';
import { CommonContext } from 'module/context';

const reqFixture = require.context('raw!./fixtures', true);
const fixtures = reqFixture.keys();

function reqOut(path) {
    if (reqOut.cache[path]) return reqOut.cache[path];
    return reqOut.cache[path] = reqFixture(path).replace(/\r?\n/g, '\n');
}
reqOut.cache = {};

class FixtureLoader extends ModuleLoader {
    async load(context) {
        if (context instanceof CommonContext) {
            return reqFixture('./' + path.join(context.dir, context.name + '.yak'));
        } else {
            return await super.load(context);
        }
    }
}

async function run(entryFixture) {
    let compiler = new JsTargetCompiler();
    compiler.moduleLoader = new FixtureLoader();
    let js = await compiler.compile(
        new CommonContext(
            path.basename(entryFixture, '.yak'),
            path.dirname(entryFixture)
        )
    );
    let out = '';
    let console = {log: x => out += x + '\n'};
    let babeled = babel.transform(js).code;
    eval(babeled);
    return { js, babeled, out };
};

export async function t(entryFixture) {
    let result = await run(entryFixture);
    let out = './' + entryFixture + '.yak.out';
    if (fixtures.indexOf(out) !== -1) {
        assert.equal(result.out, reqOut(out));
    }
}

let dumpables = fixtures.filter(
    fixture => fixture.endsWith('.yak')
).map(
    fixture => path.join(path.dirname(fixture), path.basename(fixture, '.yak'))
);

export class Dumper {
    constructor(name) {
        this.name = name;
    }
    async dump(dumpPath, result) {}
    async error(dumpPath, error) {
        let errorString = (error && error.stack || error) + '';
        return new Promise((resolve, reject) => {
            let dirs = path.join('dump', this.name, path.dirname(dumpPath));
            let file = path.join(dirs, path.basename(dumpPath) + this.ext);
            fs.mkdirs(dirs, err => {
                if (err) return reject(err);
                fs.writeFile(file, errorString, err => {
                    if (err) return reject(err);
                    resolve();
                });
            });
        });
    }
}

export class TextDumper extends Dumper {
    constructor(name, ext) {
        super(name);
        this.ext = ext;
    }
    dump(dumpPath, result) {
        return new Promise((resolve, reject) => {
            let dirs = path.join('dump', this.name, path.dirname(dumpPath));
            let file = path.join(dirs, path.basename(dumpPath) + this.ext);
            fs.mkdirs(dirs, err => {
                if (err) return reject(err);
                fs.writeFile(file, result, err => {
                    if (err) return reject(err);
                    resolve();
                });
            });
        });
    }
}

export async function d(compiler, dumper) {
    compiler.moduleLoader = new FixtureLoader();
    for (let dumpPath of dumpables) {
        try {
            let result = await compiler.compile(
                new CommonContext(
                    path.basename(dumpPath, '.yak'),
                    path.dirname(dumpPath)
                )
            );
            await dumper.dump(dumpPath, result);
        } catch (e) {
            await dumper.error(dumpPath, e);
        }
    }
}

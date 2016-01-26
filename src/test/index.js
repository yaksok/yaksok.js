import 'babel-polyfill';

async function main() {
    { // dump compiler results
        let reqDump = require.context('.', true, /^\.\/.*dump-[^/]+\.js$/i);
        for (let dumpCode of reqDump.keys()) await reqDump(dumpCode).run();
    }
    { // mocha
        let mochaConfig = {
            reporter: 'nyan',
        };

        let Mocha = eval('require("mocha")');
        let reqTest = require.context('.', true, /^\.\/.*test-[^/]+\.js$/i);
        Mocha.prototype.loadFiles = function (fn) {
            for (let file of this.files) {
                this.suite.emit('pre-require', global, file, this);
                this.suite.emit('require', reqTest(file), file, this);
                this.suite.emit('post-require', global, file, this);
            }
            if (fn) fn();
        };

        let mocha = new Mocha(mochaConfig);
        mocha.files = reqTest.keys();
        mocha.run(fail => {
            if (fail) eval('process.exit(1)');
            else eval('process.exit(0)');
        });
    }
}
main().catch(err => console.error(err && err.stack || err));

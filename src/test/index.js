let mochaConfig = {
    reporter: 'nyan',
};

let Mocha = eval('require("mocha")');
let req = require.context('.', true, /^\.\/.*test-[^/]+\.js$/i);
Mocha.prototype.loadFiles = function (fn) {
    for (let file of this.files) {
        this.suite.emit('pre-require', global, file, this);
        this.suite.emit('require', req(file), file, this);
        this.suite.emit('post-require', global, file, this);
    }
    if (fn) fn();
};

let mocha = new Mocha(mochaConfig);
mocha.files = req.keys();
mocha.run(fail => {
    if (fail) eval('process.exit(1)');
    else eval('process.exit(0)');
});

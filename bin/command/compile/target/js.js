var util = require('../../../util');
var yaksok = require('../../../../dist/yaksok.min.js');

exports.run = function (out, entryContext, moduleLoader) {
    var compiler = new yaksok.compiler.JsTargetCompiler();
    compiler.moduleLoader = moduleLoader;
    compiler.plugins.add(new yaksok.plugin.ConstantFolder({ dce: true }));
    return compiler.compile(entryContext).then(function (result) {
        return util.writeFile(out, result);
    });
};

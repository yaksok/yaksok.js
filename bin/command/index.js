var list = [
    'help', 'compile'
].sort();

var commands = {};
for (var i = 0; i < list.length; ++i) {
    var command = list[i];
    commands[command] = require('./' + command);
}

function toString() {
    var curr = [];
    var arr = [curr];
    for (var i = 0; i < list.length; ++i) {
        var command = list[i];
        if (curr.length === 5) arr.push(curr = []);
        curr.push(command);
    }
    return arr.map(function (line) {
        return '  ' + line.join(', ');
    }).join(',\n');
};

exports.list = list;
exports.commands = commands;
exports.toString = toString;

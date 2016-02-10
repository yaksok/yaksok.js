exports.run = function run(argv, parent) {
    if (argv._.length === 0) {
        console.error(parent.yargs.help());
    } else {
        var target = argv._[0];
        console.error(parent.command(target).help());
    }
};

exports.yargs = function yargs(yargs) {
    return yargs
        .usage([
            '사용법: ysjs help <명령>',
            '',
            '<명령>의 사용법을 보여줍니다.'
        ].join('\n'));
};

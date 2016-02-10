var yaksok = require('../../dist/yaksok.min.js');
var fs = require('fs-extra');
var path = require('path');

exports.run = function run(argv) {
    var argPath = argv._[0];
    fs.stat(argPath, function (err, stats) {
        if (err) throw err;
        if (stats.isDirectory()) {
            console.log('package.yaml의 처리는 아직 구현되지 않았습니다.');
        } else if (stats.isFile()) {
            var moduleLoader = new yaksok.module.loader.CommonLoader();
            var entryContext = new yaksok.module.context.CommonContext(
                path.basename(argPath, '.yak'),
                path.dirname(argPath)
            );
            switch (argv.target || 'js') {
            case 'js': case 'javascript': case '자바스크립트': {
                var compiler = new yaksok.compiler.JsTargetCompiler();
                compiler.moduleLoader = moduleLoader;
                compiler.plugins.add(new yaksok.plugin.ConstantFolder({ dce: true }));
                compiler.compile(entryContext).then(function (result) {
                    fs.writeFileSync(argv.out || 'out', result, { encoding: 'utf8' });
                }).catch(function (err) {
                    console.error(err instanceof Error ? err.stack : err);
                    process.exit(1);
                });
            } break;
            default: {
                console.error('지원하지 않는 컴파일 타겟입니다.');
                process.exit(1);
            } break;
            }
        } else {
            console.error('처리할 수 없는 형식의 경로입니다:', argPath);
        }
    });
};

exports.yargs = function yargs(yargs) {
    return yargs
        .usage([
            '사용법: ysjs compile <시작경로>',
            '',
            '<시작경로>가 파일이면 그 파일로부터 컴파일을 수행합니다.',
            '<시작경로>가 디렉토리면 해당 디렉토리의 `package.yaml`의 내용을 바탕으로 컴파일을 수행합니다.'
        ].join('\n'))
        .options({
            o: {
                alias: 'out',
                describe: '결과 파일 또는 경로를 지정합니다. (기본값: out)',
                type: 'string'
            },
            t: {
                alias: 'target',
                describe: '컴파일 타겟을 지정합니다. (기본값: js)',
                type: 'string'
            },
        });
};

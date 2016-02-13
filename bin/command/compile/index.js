var fs = require('fs-extra');
var path = require('path');

var yaml = require('js-yaml');

var yaksok = require('../../../dist/yaksok.min.js');

var moduleLoader = new yaksok.module.loader.CommonLoader();

function getCompileTarget(t) {
    switch (t) {
    case 'js': case 'javascript': case '자바스크립트':
        return require('./target/js');
    default:
        console.error('지원하지 않는 컴파일 타겟입니다:', t);
        return process.exit(1);
    }
}

function stat(path) {
    return new Promise(function (resolve) {
        fs.stat(path, function (err, stats) {
            if (err) {
                resolve(null);
            } else if (stats.isDirectory()) {
                resolve('directory');
            } else if (stats.isFile()) {
                resolve('file');
            } else {
                resolve(null);
            }
        });
    });
}

function getPackageYaml(directoryPath) {
    return new Promise(function (resolve, reject) {
        fs.readFile(path.join(directoryPath, 'package.yaml'), 'utf8', function (err, data) {
            if (err) return resolve(null);
            try { resolve(yaml.safeLoad(data)); }
            catch (e) { reject(e); }
        });
    });
}

function compile(start, target, out) {
    var entryContext = yaksok.module.context.CommonContext.getContextFromPath(start);
    var compileTarget = getCompileTarget(target);
    return compileTarget.run(out, entryContext, moduleLoader);
}

exports.run = function run(argv) {
    yaksok.module.context.CommonContext.getScriptPath(
        argv._[0] || '.'
    ).then(function (start) {
        return stat(start).then(function (stat) {
            if (stat === null) {
                console.error('파일이 없거나 처리할 수 없는 형식의 경로입니다:', start);
                process.exit(1);
            }
            var runPackageYaml = stat === 'directory';
            return getPackageYaml(
                runPackageYaml ? start : path.dirname(start)
            ).then(function (packageYaml) {
                if (runPackageYaml && packageYaml === null) {
                    console.error('package.yaml 파일을 찾을 수 없습니다:', start);
                    process.exit(1);
                }
                function option(a, p, fallback) {
                    return argv[a] || (packageYaml && packageYaml[p]) || fallback;
                }
                return compile(
                    runPackageYaml ? packageYaml['시작'] : start,
                    option('target', '목표', 'js'),
                    option('out', '결과', 'out')
                );
            });
        });
    }).catch(function (err) {
        console.error(err instanceof Error ? err.stack : err);
        process.exit(1);
    });
};

exports.yargs = function yargs(yargs) {
    return yargs
        .usage([
            '사용법: ysjs compile <시작경로>',
            '',
            '<시작경로>가 파일이면 그 파일로부터 컴파일을 수행합니다.',
            '<시작경로>가 디렉토리면 해당 디렉토리의 `package.yaml`을 읽어서 컴파일을 수행합니다.'
        ].join('\n'))
        .example('ysjs compile', '현재 디렉토리의 `package.yaml을` 읽어서 컴파일을 수행합니다.')
        .example('ysjs compile 메인.약속 -o 결과.js', '`메인.약속`을 `결과.js`로 컴파일합니다.')
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

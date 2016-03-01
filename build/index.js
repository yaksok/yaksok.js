import del from 'del';
import path from 'path';
import yargs from 'yargs';
import webpack from 'webpack';
import BannerPlugin from 'webpack/lib/BannerPlugin';
import ProgressPlugin from 'webpack/lib/ProgressPlugin';
import UglifyJsPlugin from 'webpack/lib/optimize/UglifyJsPlugin';
import OccurrenceOrderPlugin from 'webpack/lib/optimize/OccurrenceOrderPlugin';
import WebpackNotifierPlugin from 'webpack-notifier';

let argv = yargs.argv;
if (argv.clean) {
    let deletedFiles = del.sync([
        path.join(__dirname, '../dist/*'),
        path.join(__dirname, '../dump/*')
    ]);
    for (let deletedFile of deletedFiles)
        console.log('REMOVED: ' + deletedFile);
    process.exit(0);
}

let chars = 0;
function goToLineStart(nextMessage) {
    let str = '';
    for (; chars > nextMessage.length; --chars) {
        str += '\b \b';
    }
    chars = nextMessage.length;
    for (let i = 0; i < chars; ++i) {
        str += '\b';
    }
    if (str) process.stderr.write(str);
}

// webpack config

let srcPath = path.join(__dirname, '../src');

let config = {
    entry: {
        yaksok: 'index',
        test: 'test',
    },
    output: {
        path: path.join(__dirname, '../dist'),
        publicPath: '/dist/',
        filename: '[name].js',
        libraryTarget: 'umd',
        library: 'yaksok',
    },
    resolve: {
        root: path.join(__dirname, '../src'),
        extensions: ['', '.js'],
        modulesDirectories: ['node_modules']
    },
    node: {
        fs: 'empty',
        filename: true,
        global: true,
    },
    module: {
        loaders: [
            { test: /\.json$/, loader: 'json-loader' },
            {
                test: /\.js$/,
                loader: 'babel',
                include: [
                    srcPath,
                    path.join(__dirname, '../node_modules/lex-es6')
                ],
                exclude: [
                    path.join(srcPath, 'runtime')
                ],
                query: {
                    cacheDirectory: path.join(__dirname, '../tmp/babel-cache')
                }
            },
            { test: /\.jison$/, loader: 'jison-loader', include: [srcPath] },
        ]
    },
    plugins: [
        new ProgressPlugin((percentage, msg) => {
            if(percentage < 1) {
                percentage = Math.floor(percentage * 100);
                msg = percentage + '% ' + msg;
                if(percentage < 100) {
                    msg = ' ' + msg;
                }
                if(percentage < 10) {
                    msg = ' ' + msg;
                }
            }
            goToLineStart(msg);
            process.stderr.write(msg);
        }),
        new WebpackNotifierPlugin({ title: 'yaksok.js', alwaysNotify: true })
    ],
    stats: {
        chunks: true,
        modules: false,
        chunkModules: false,
        reasons: true,
        cached: true,
        cachedAssets: true,
        colors: true
    }
};

if (argv.min) {
    process.env.BABEL_ENV = 'min';
    config.output.filename = '[name].min.js';
    config.plugins.push(new UglifyJsPlugin());
}
if (argv.dev) {
    process.env.BABEL_ENV = 'dev';
    config.debug = true;
    config.output.pathinfo = true;
    config.devtool = 'source-map';
    config.plugins.push(new BannerPlugin(
        'require("source-map-support").install();',
        { raw: true, entryOnly: false }
    ));
} else {
    config.plugins.push(new OccurrenceOrderPlugin());
}

let compiler = webpack(config);
let lastHash = null;
function compilerCallback(err, stats) {
    if (!argv.watch) {
        compiler.purgeInputFileSystem();
    }
    if (err) {
        lastHash = null;
        console.error(err.stack || err);
        if (err.details) console.error(err.details);
        if (!argv.watch) {
            process.on('exit', function() {
                process.exit(1);
            });
        }
        return;
    }
    if (stats.hash !== lastHash) {
        lastHash = stats.hash;
        process.stdout.write(stats.toString(config.stats) + '\n');
    }
}
if (argv.watch) {
    compiler.watch({}, compilerCallback);
} else {
    compiler.run(compilerCallback);
}

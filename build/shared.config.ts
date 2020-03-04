import * as path from 'path';
import * as webpack from 'webpack';

export const mode = (process.env.NODE_ENV as webpack.Configuration['mode']) || 'development';
export const isDev = mode === 'development';

export const rootPath = path.resolve(__dirname, '..');
export const distPath = path.resolve(__dirname, '../dist');

export const babelOptions = {
    presets: [
        '@babel/preset-env',
        '@babel/preset-typescript',
    ],
    plugins: [
        '@babel/plugin-transform-runtime',
        '@babel/plugin-proposal-export-default-from',
        '@babel/plugin-proposal-export-namespace-from',
        ['@babel/plugin-proposal-decorators', { legacy: true }],
        ['@babel/plugin-proposal-class-properties', { loose: true }],
    ]
};

const config: webpack.Configuration = {
    mode,
    node: {
        fs: 'empty',
    },
    output: {
        path: distPath,
        publicPath: '/dist/',
        filename: '[name].js',
        libraryTarget: 'umd',
        library: 'yaksok',
    },
    resolve: {
        alias: {
            '~': 'src',
        },
        modules: [
            rootPath,
            'node_modules',
        ],
        extensions: ['.js', '.ts'],
    },
    module: {
        rules: [
            {
                test: /\.(?:js|ts)$/,
                exclude: /node_modules/,
                use: [{ loader: 'babel-loader', options: babelOptions }],
            },
        ],
    },
};

export default config;

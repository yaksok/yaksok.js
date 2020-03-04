import * as webpack from 'webpack';
import sharedConfig from './shared.config';

const config: webpack.Configuration = {
    ...sharedConfig,
    entry: {
        test: './src/test/index.js',
    },
    target: 'node',
    devtool: 'source-map',
};

export default config;

import * as webpack from 'webpack';
import sharedConfig, { isDev } from './shared.config';

const config: webpack.Configuration = {
    ...sharedConfig,
    entry: {
        [isDev ? 'yaksok' : 'yaksok.min']: './src/index.js',
    },
};

export default config;

import path from 'path';

const ENV = process.env.NODE_ENV || 'development';

const envConfig = require(`../config/${ENV}`);
let config = {
    APP_PATH: 'src',
    APP_MAIN: 'index.js',
    WEB_ROOT: envConfig.WEB_ROOT,
    EXAMPLE_PATH: 'examples',
    EXAMPLE_MAIN: 'index.js',
    COMPILER_PUBLIC_PATH: envConfig.WEB_ROOT,
    DIST_PATH: 'build',
    ENV: process.env.NODE_ENV || 'development',
    HOST: 'localhost',
    PORT: process.env.PORT || 3000,
    ROOT_PATH: path.resolve(__dirname, '../')
};

config.GLOBALS = {
    'process.env': {
        'NODE_ENV': JSON.stringify(ENV)
    },
    'NODE_ENV': ENV,
    '__DEV__': ENV === 'development',
    '__PROD__': ENV === 'production'
};

// U T I L S   /   H E L P E R S
config.UTILS_PATH = (() => {
    const resolve = path.resolve;

    const base = (...args) =>
        resolve.apply(resolve, [config.ROOT_PATH, ...args]);

    return {
        base,
        client: base.bind(null, config.APP_PATH),
        dist: base.bind(null, config.DIST_PATH)
    };
})();

if (ENV === 'development') {
    const overrides = {
        COMPILER_PUBLIC_PATH: `http://${config.HOST}:${config.PORT}/`
    };
    config = Object.assign({}, config, overrides);
}

export default config;

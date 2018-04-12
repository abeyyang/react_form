import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import StyleLintPlugin from 'stylelint-webpack-plugin';
import WarnCaseSensitiveModulesPlugin from 'webpack/lib/WarnCaseSensitiveModulesPlugin';
import path from 'path';
import config from './config';

const paths = config.UTILS_PATH;

// https://github.com/webpack/webpack/issues/2362
WarnCaseSensitiveModulesPlugin.prototype.apply = function () {};

const webpackConfig = {
    debug: true,
    module: {},
    plugins: [
        new StyleLintPlugin(),
        new HtmlWebpackPlugin({
            template: paths.client('index.html'),
            hash: false,
            filename: 'index.html',
            inject: 'body',
            minify: {
                collapseWhitespace: false
            }
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
};

const APP_ENTRY_PATH = `${paths.base(config.APP_PATH)}/${config.APP_MAIN}`;

webpackConfig.entry = {
    app: [
        'babel-polyfill',
        `webpack-dev-server/client?http://${config.HOST}:${config.PORT}/`,
        'webpack/hot/only-dev-server',
        APP_ENTRY_PATH
    ]
};

// https://github.com/webpack/webpack/issues/943
webpackConfig.resolve = {
    root: [
        paths.base(config.APP_PATH),
        paths.base('node_modules')
    ],
    alias: {
        CommonUI: path.resolve(__dirname,'../src/common/components'),
        SFP: path.resolve(__dirname,'../src')
    }
};

webpackConfig.output = {
    filename: `[name].[hash].js`,
    path: paths.base(config.DIST_PATH),
    publicPath: `http://${config.HOST}:${config.PORT}/`
};

// Webpack loader settings

let scssLoader = ['css-loader?', 'modules', 'localIdentName=[local]:[hash:base64]', 'importLoaders=1', 'sourceMap'];
let cssLoader = ['css-loader?', 'modules', 'localIdentName=[local]:[hash:base64]', 'sourceMap'];

webpackConfig.devtool = 'source-map';

scssLoader = scssLoader.join('&');
cssLoader = cssLoader.join('&');

// Transform config to replace value with prefixing name
// String value will be added with single quote
// Warning: must set all value
const envConfig = require(paths.base('config', process.env.NODE_ENV || 'development'));
const searchPrefix = 'CONFIG.';
const replaceConfig = [];
for (const key in envConfig) {
    if (envConfig.hasOwnProperty(key)) {
        replaceConfig.push({
            search: `${searchPrefix}${key}`,
            replace: (typeof envConfig[key] === 'string') ? `'${envConfig[key]}'` : envConfig[key],
            flags: 'g'
        });
    }
}

webpackConfig.module.preLoaders = [
    {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        include: /src/,
        loader: 'string-replace',
        query: {
            multiple: replaceConfig
        }
    }
];

webpackConfig.module.loaders = [
    {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        include: /src/,
        loaders: ['react-hot', 'babel-loader', 'eslint-loader']
    }
];

const styleLoaders = [
    {
        test: /\.scss$/,
        exclude: /node_modules/,
        loaders: [
            'style',
            scssLoader,
            'postcss-loader',
            'sass'
        ]
    },
    {
        test: /\.css$/,
        exclude: /node_modules/,
        loaders: [
            'style',
            cssLoader,
            'postcss-loader'
        ]
    }
];

const fontLoaders = [
    {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        exclude: /node_modules/,
        loader: 'url-loader?limit=10000&name=fonts/[name].[ext]'
    }
];

const imageLoader = [
    {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        exclude: /node_modules/,
        loader: 'url-loader?name=img/img-[hash:6].[ext]&limit=50000'
    }
];

const jsonLoaders = [
    {
        test: /\.json$/,
        loaders: ['json-loader']
    }
];

webpackConfig.module.loaders = [
    ...webpackConfig.module.loaders,
    ...styleLoaders,
    ...fontLoaders,
    ...imageLoader,
    ...jsonLoaders
];

export default webpackConfig;

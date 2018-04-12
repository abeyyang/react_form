import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import StyleLintPlugin from 'stylelint-webpack-plugin';
import WarnCaseSensitiveModulesPlugin from 'webpack/lib/WarnCaseSensitiveModulesPlugin';
import Visualizer from 'webpack-visualizer-plugin';
import config from './config';
import path from 'path';
const paths = config.UTILS_PATH;

// https://github.com/webpack/webpack/issues/2362
WarnCaseSensitiveModulesPlugin.prototype.apply = function () {};
const { WebpackWarPlugin } = require('webpack-war-plugin');

const webpackConfig = {
    bail: true,
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
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new ExtractTextPlugin('[name].[hash].css', {
            allChunks: true
        }),
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.optimize.DedupePlugin(),
        new WebpackWarPlugin({
            archiveName: 'group-sfp-war',
            webInf: './web-inf'
        }),
        new Visualizer()
    ]
};

const APP_ENTRY_PATH = `${paths.base(config.APP_PATH)}/${config.APP_MAIN}`;

webpackConfig.entry = {
    app: [
        'babel-polyfill',
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
    publicPath: config.WEB_ROOT
};

// Webpack loader settings

let scssLoader = ['css-loader?', 'modules', 'importLoaders=1', 'minimize'];
let cssLoader = ['css-loader?', 'minimize'];

scssLoader = scssLoader.join('&');
cssLoader = cssLoader.join('&');

const envConfig = require(paths.base('config', process.env.NODE_ENV || 'production'));
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
        loaders: ['babel-loader', 'eslint-loader']
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

webpackConfig.module.loaders.filter((loader) =>
    loader.loaders && loader.loaders.find((name) => /css/.test(name.split('?')[0]))
).forEach((loader) => {
    const [first, ...rest] = loader.loaders;
    loader.loader = ExtractTextPlugin.extract(first, rest.join('!'));
    delete loader.loaders;
});

webpackConfig.output.publicPath = config.COMPILER_PUBLIC_PATH;

export default webpackConfig;

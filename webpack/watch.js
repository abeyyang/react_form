import WebpackDevServer from 'webpack-dev-server';
import webpack from 'webpack';
import config from './config';
import webpackConfig from './webpack.dev.config';

const compiler = webpack(webpackConfig);
let devServerConfig = {
	contentBase: config.APP_PATH,
    headers: { 'Access-Control-Allow-Origin': '*' },
    historyApiFallback: true,
    quiet: false,
    noInfo: false,
    hot: true,
    inline: true,
    progress: true,
    stats: { colors: true }, //,

    //release this proxy when you want to test with gateway in dev env.
    proxy: [
        {
            path: '/group-sfp-war/gateway/**',
            target: 'http://hkl101136.hk.hsbc:9088',
            secure: false,
            changeOrigin: true
        }
    ]
};

const server = new WebpackDevServer(compiler, devServerConfig);

server.listen(config.PORT, config.HOST);

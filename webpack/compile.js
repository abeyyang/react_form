import webpack from 'webpack';
import gutil from 'gutil';
import ProgressPlugin from 'webpack/lib/ProgressPlugin';
import webpackConfig from './webpack.build.config';

const compiler = webpack(webpackConfig);

compiler.apply(new ProgressPlugin((percentage, msg) => {
    console.log(msg);
}));

compiler.run((err, stats) => {
    if (err) {
        console.log(err);
        throw new gutil.PluginError('webpack:build', err);
    }
    gutil.log('[webpack:build]', stats.toString({
        chunks: false, // Makes the build much quieter
        colors: true
    }));
});

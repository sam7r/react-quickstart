import gulp from 'gulp';
import gutil from 'gulp-util';
import webpack from 'webpack';
import webpackDevServer from 'webpack-dev-server';
import wpAppConfig from '../webpack.config';
import wpNodeConfig from '../webpack.node.config';
import constants from 'root/constants';

gulp.task('webpack-app', (callback) => {

  if(process.env.NODE_ENV !== 'production') {
    var bundleStart = null;
    var compiler = webpack(wpAppConfig());

    compiler.plugin('compile', () => {
      console.log('Bundling...');
      bundleStart = Date.now();
    });

    compiler.plugin('done', () => {
      console.log('Bundled in ' + (Date.now() - bundleStart) + 'ms!');
    });

    var bundler = new webpackDevServer(compiler, {
      publicPath: '/js/',
      headers: { 'Access-Control-Allow-Origin': '*' },
      hot: true,
      quiet: false,
      noInfo: true,
      stats: { colors: true }
    });

    bundler.listen(
      constants.HOT_RELOAD_PORT,
      constants.HOT_RELOAD_URL.replace('http://', ''),
      () => console.log('Bundling project, please wait...')
    );

  } else {
    webpack(Object.create(wpAppConfig()), (err, stats) => {
      if(err) throw new gutil.PluginError('webpack:build', err);
        gutil.log('[webpack]', stats.toString({ colors: true }));
        callback();
      });
  }

});

gulp.task('webpack-node', (callback) => {
  webpack(Object.create(wpNodeConfig()), (err, stats) => {
    if(err) throw new gutil.PluginError('webpack:build', err);
      gutil.log('[webpack]', stats.toString({ colors: true }));
      callback();
    });

});


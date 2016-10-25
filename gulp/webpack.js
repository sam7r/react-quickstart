import gulp from 'gulp';
import gutil from 'gulp-util';
import webpack from 'webpack';
import webpackDevServer from 'webpack-dev-server';
import wpConfig from '../webpack.config.js';
import { argv } from 'yargs';
import constants from '../constants';

gulp.task('webpack', (callback) => {
  if(!argv.production) {
    var bundleStart = null;
    var compiler = webpack(wpConfig);

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

    webpack(Object.create(wpConfig), (err, stats) => {
    if(err) throw new gutil.PluginError('webpack:build', err);
      gutil.log('[webpack]', stats.toString({ colors: true }));
      callback();
    });
  }

});

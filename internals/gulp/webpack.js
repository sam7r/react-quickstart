import gulp from 'gulp';
import gutil from 'gulp-util';
import webpack from 'webpack';
import config from 'internals/webpack/webpack.prod.config';

gulp.task('webpack-app', (callback) => {
  webpack(Object.create(config()), (err, stats) => {
    if(err) throw new gutil.PluginError('webpack:build', err);
    gutil.log('[webpack]', stats.toString({ colors: true }));
    callback();
  });
});

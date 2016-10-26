import gulp from 'gulp';
import runSequence from 'run-sequence';

gulp.task('dev', (callback) => runSequence(
  'set-env-dev', 'clean-logs',
  ['dev-server', 'styles', 'webpack-app', 'watch'],
  () => callback()
));

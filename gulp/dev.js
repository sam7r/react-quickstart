import gulp from 'gulp';
import runSequence from 'run-sequence';

gulp.task('dev', (callback) => runSequence(
  'env', 'clean-logs',
  ['dev-server', 'styles', 'webpack', 'watch'],
  () => callback()
));

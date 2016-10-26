import gulp from 'gulp';
import runSequence from 'run-sequence';

gulp.task('dev', (callback) => runSequence(
  'set-env-dev', 'clean-logs',
  ['dev-server', 'styles', 'build-app', 'watch'],
  () => callback()
));

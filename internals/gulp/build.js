import gulp from 'gulp';
import runSequence from 'run-sequence';

gulp.task('build', (callback) => runSequence(
  'set-env-prod', 'eslint', 'test', 'clean-build', 
  ['webpack-app', 'move-assets'],
  () => callback()
));
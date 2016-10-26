import gulp from 'gulp';
import runSequence from 'run-sequence';

gulp.task('build', (callback) => runSequence(
  'set-env-prod', 'eslint', 'test', 'clean-build', 
  'clean-build', 'styles', 'move-assets', 'webpack-node', 'webpack-app', 'create-logs',
  () => callback()
));
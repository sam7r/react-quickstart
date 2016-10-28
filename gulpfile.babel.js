import 'regenerator-runtime/runtime';
import gulp from 'gulp';
import requireDir from 'require-dir';

requireDir('./internals/gulp', { recurse: false });
gulp.task('default', ['dev']);

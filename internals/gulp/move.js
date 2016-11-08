import gulp from 'gulp';
import path from 'path';
import constants from 'internals/constants';
import runSequence from 'run-sequence';

gulp.task('move-assets', (callback) => runSequence(
  'move-html', 'move-favi', () => callback()
));

gulp.task('move-html', () => {
  return gulp
    .src(path.join(constants.SRC_DIR, 'index.html'))
    .pipe(gulp.dest(constants.BUILD_DIR));
});

gulp.task('move-favi', () => {
  return gulp
    .src(path.join(constants.SRC_DIR, 'favicon.ico'))
    .pipe(gulp.dest(constants.BUILD_DIR));
});
import gulp from 'gulp';
import eslint from 'gulp-eslint';
import constants from 'internals/constants';

gulp.task('eslint', () => {
  return gulp.src([`${constants.SRC_DIR}/**/*.js`,'!node_modules/**'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

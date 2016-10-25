import gulp from 'gulp';
import tape from 'gulp-tape';
import constants from '../constants';
import tapColorize from 'tap-colorize';

gulp.task('test', function() {
  return gulp.src(`${constants.SRC_DIR}/**/*.test.js`)
    .pipe(tape({
      reporter: tapColorize(),
      outputStream: process.stdout,
      bail: true
    }));
});

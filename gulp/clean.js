import constants from 'root/constants';
import gulp from 'gulp';
import del from 'del';

gulp.task('clean-build', function() {
  return del([constants.BUILD_DIR]);
});
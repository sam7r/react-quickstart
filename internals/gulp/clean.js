import constants from 'internals/constants';
import gulp from 'gulp';
import path from 'path';
import del from 'del';

const logsDir = path.join(constants.ABSOLUTE_BASE, 'server', 'logs');

gulp.task('clean-logs', () => {
  return del([`${logsDir}/**/*.log`, `!${logsDir}`]);
});

gulp.task('clean-build', () => {
  return del([constants.BUILD_DIR]);
});
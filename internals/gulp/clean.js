import constants from 'boilerplate/constants';
import gulp from 'gulp';
import path from 'path';
import del from 'del';

const logsDir = path.join(constants.ABSOLUTE_BASE, 'server', 'logs');

gulp.task('clean-logs', function() {
  return del([`${logsDir}/**/*.log`, `!${logsDir}`]);
});
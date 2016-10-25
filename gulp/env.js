import gulp from 'gulp';
import { argv } from 'yargs';

gulp.task('env', () => {
  return !argv.production ? process.env.NODE_ENV = 'dev'
  : process.env.NODE_ENV = 'production';
});

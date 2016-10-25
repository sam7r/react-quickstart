import gulp from 'gulp';
import shell from 'gulp-shell';

gulp.task('esdocs',shell.task([
  'esdoc -c esdoc.json'
]));

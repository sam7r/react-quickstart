import gulp from 'gulp';
import sourcemaps from 'gulp-sourcemaps';
import sass from 'gulp-sass';
import handleErrors from './util/handleErrors';
import autoprefixer from 'gulp-autoprefixer';
import constants from '../constants';
import path from 'path';
import { argv } from 'yargs';

gulp.task('styles', function() {
  const srcPath = path.join(constants.SRC_DIR, 'client', 'scss');
  const outPath = path.join(constants.SRC_DIR, 'server', 'assets', 'styles');

  const config = {
    sourceComments: true,
    outputStyle: argv.production ? 'compressed' : 'nested'
  };

  return gulp.src(`${srcPath}/**/*.scss`)
    .pipe(sourcemaps.init())
    .pipe(sass(config))
    .on('error', handleErrors)
    .pipe(autoprefixer('last 2 versions', '> 1%'))
    .pipe(sourcemaps.write(null))
    .pipe(gulp.dest(outPath));

});

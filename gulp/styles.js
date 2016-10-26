import gulp from 'gulp';
import sourcemaps from 'gulp-sourcemaps';
import sass from 'gulp-sass';
import handleErrors from './util/handleErrors';
import autoprefixer from 'gulp-autoprefixer';
import constants from 'root/constants';
import path from 'path';

gulp.task('styles', function() {
  const srcPath = path.join(constants.SRC_DIR, 'client', 'scss');
  const outPath = path.join(constants.SRC_DIR, 'server', 'assets', 'styles');

  const config = {
    sourceComments: true,
    outputStyle: process.env.NODE_ENV === 'production' ? 'compressed' : 'nested'
  };

  return gulp.src(`${srcPath}/**/*.scss`)
    .pipe(sourcemaps.init())
    .pipe(sass(config))
    .on('error', handleErrors)
    .pipe(autoprefixer('last 2 versions', '> 1%'))
    .pipe(sourcemaps.write(null))
    .pipe(gulp.dest(outPath));

});

import gulp from 'gulp';
import path from 'path';
import constants from 'root/constants';

const src = path.join(constants.SRC_DIR, 'server', 'assets');
const build = path.join(constants.BUILD_DIR, 'assets');

gulp.task('move-assets', () => gulp
    .src(`${src}/**/*.*`, { base: '' })
    .pipe(gulp.dest(build))
);

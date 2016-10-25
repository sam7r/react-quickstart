import gulp from 'gulp';

gulp.task('watch', () => {
  gulp.watch('src/client/scss/**/*.scss', ['styles']);
});

import gulp from 'gulp';

gulp.task('watch', () => {
  gulp.watch('src/client/scss/**/*.scss', ['styles']);
  gulp.watch(['internals/webpack/webpack.dev.config.js', 'server/**/*.js'], ['dev-server']);
});

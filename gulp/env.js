import gulp from 'gulp';

gulp.task('set-env-dev', () => process.env.NODE_ENV = 'dev');
gulp.task('set-env-prod', () => process.env.NODE_ENV = 'production');

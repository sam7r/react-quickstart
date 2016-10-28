import gulp from 'gulp';
import shell from 'gulp-shell';

gulp.task('dev-server', shell.task([
  'nodemon --watch server/index.js --watch internals/webpack/webpack.dev.config.js --exec babel-node server | bunyan --color -o short --time local'
]));

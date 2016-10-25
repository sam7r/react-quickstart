import gulp from 'gulp';
import path from 'path';
import del from 'del';
import shell from 'gulp-shell';

const serverPath = path.join('src', 'server');

gulp.task('dev-server', shell.task([
  `nodemon --watch ${serverPath}/index.js --exec babel-node ${serverPath} | bunyan --color -o short --time local`
]));

gulp.task('clean-logs', () => del([
  `${path.join(serverPath, 'logs')}/**`,
  `!${path.join(serverPath, 'logs')}`
]));

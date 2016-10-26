import gulp from 'gulp';
import path from 'path';
import del from 'del';
import shell from 'gulp-shell';
import constants from 'root/constants';

const serverPath = path.join(constants.SRC_DIR, 'server');

gulp.task('dev-server', shell.task([
  'nodemon --watch src/server/index.js --exec babel-node src/server | bunyan --color -o short --time local'
]));

gulp.task('clean-logs', () => del([
  `${path.join(serverPath, 'logs')}/**`,
  `!${path.join(serverPath, 'logs')}`
]));

gulp.task('create-logs', shell.task([
  'cd ./build && mkdir logs'
]));

import express from 'express';
import compression from 'compression';
import Logger from './logger';
import path from 'path';
import constants from 'root/constants';

const app = express();
let server = null; // express app instance
const port = constants.NODE_APP_PORT | 3000;
const logger = Logger.getInstance();
logger.info('app.server',{ NODE_ENV: process.env.NODE_ENV }, 'Express app started');

// env based assets dir
const dir = (process.env.NODE_ENV !== 'production' ? 
  constants.SRC_DIR + '/server' : 
  constants.BUILD_DIR
);
const assets = path.join(dir, 'assets');

// express config
app.use(compression());
app.set('view engine', 'jade');
app.set('views', path.join(assets, 'views'));
app.use(express.static(assets));

logger.info('app.server', { assets }, 'Express static dir set');

// setup logger through express middleware
app.use((req, res, next) => {
  logger.info('app.server', { req }, 'Request');
  return next();
});

// view configuration object to be passed to jade template
const viewConfig = {
  title: 'React Template Builder',
  scripts: [
    './js/vendor.bundle.js',
    './js/bundle.js'
  ],
  styles: [
    'https://fonts.googleapis.com/icon?family=Material+Icons',
    './styles/main.css'
  ]
};

if (process.env.NODE_ENV !== 'production') {

  // livereload servers for css
  const livereload = require('livereload');
  const lrserver = livereload.createServer();
  lrserver.watch(assets);
  logger.info('app.server', { port: 35729 }, 'Livereload server running');
  viewConfig.scripts.push('http://localhost:35729/livereload.js?snipver=1');

  // proxy for hot reload server
  const httpProxy = require('http-proxy');
  const proxy = httpProxy.createProxyServer({ changeOrigin: true });
  app.all('/js/*', (req, res) => {
    proxy.web(req, res, {
      target: `${constants.HOT_RELOAD_URL}:${constants.HOT_RELOAD_PORT}`
    });
  });

  logger.info('app.server', { port: constants.HOT_RELOAD_PORT }, 'HMR server started');

}

// render view with deafault jade template
app.get('/*', (req, res) =>  {
  res.render('default', viewConfig);
});

// error handling
process.on('uncaughtException', (e) => {
  logger.fatal('app.server', { err: e.stack }, 'Server error');
  throw e;
});

process.on('SIGINT', () => {
  logger.info('app.server', {}, 'Server is shutting down');
  server.close();
  process.exit(0);
});

// start server
server = app.listen(port, () => {
  logger.info('app.server', { port }, 'App server running');
});

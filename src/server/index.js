import express from 'express';
import compression from 'compression';
import constants from '../../constants';
import livereload from 'livereload';
import httpProxy from 'http-proxy';
import Logger from './logger';
import path from 'path';

const app = express();
let server = null; // express app instance
const logger = Logger.getInstance();
logger.info('app.server',{ NODE_ENV: process.env.NODE_ENV }, 'Express app started');

// express config
const assets = path.join(__dirname, 'assets');
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

// livereload servers for css
const lrserver = livereload.createServer();
lrserver.watch(assets);
logger.info('app.server', { port: 35729 }, 'Livereload server running');

// proxy for hot reload server
const proxy = httpProxy.createProxyServer({ changeOrigin: true });
app.all('/js/*', (req, res) => {
  proxy.web(req, res, {
    target: `${constants.HOT_RELOAD_URL}:${constants.HOT_RELOAD_PORT}`
  });
});

logger.info('app.server', { port: constants.HOT_RELOAD_PORT }, 'HMR server started');

// render view
app.get('/*', (req, res) =>  {
  res.render('default', {
    title: 'React Template Builder',
    scripts: [
      './js/vendor.bundle.js',
      './js/bundle.js',
      `http://${req.hostname.split(':')[0]}:35729/livereload.js?snipver=1`
    ],
    styles: [
      'https://fonts.googleapis.com/icon?family=Material+Icons',
      './styles/main.css'
    ]
  });
});

// Start server and error handling
process.on('uncaughtException', (e) => {
  logger.fatal('app.server', { err: e.stack }, 'Server error');
  throw e;
});

process.on('SIGINT', () => {
  logger.info('app.server', {}, 'Server is shutting down');
  server.close(); lrserver.close(); proxy.close();
  process.exit(0);
});


server = app.listen(constants.NODE_APP_PORT, () => {
  logger.info('app.server', { port: constants.NODE_APP_PORT }, 'App server running');
});

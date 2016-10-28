import express from 'express';
import constants from 'boilerplate/constants';
import middleware from './middlewares/frontendMiddleware';
import path from 'path';
import Logger from './logger';

// assign our express app
const app = express();

// express app instance
let server = null; 

 // define server port
const port = constants.NODE_APP_PORT | 3000;

// get our logger instance
const logger = Logger.getInstance();

// express middleware setup
middleware(app);

// send all requests to our index file
app.get('/*', (req, res) =>  {
    res.sendFile(path.join(constants.SRC_DIR, 'index.html'));
});

// error handling
process.on('uncaughtException', (e) => {
  logger.fatal('app.server', { err: e.stack }, 'Server error');
  throw e;
});

// shut down server properly
process.on('SIGINT', () => {
  logger.info('app.server', {}, 'Server is shutting down');
  server.close();
  process.exit(0);
});

// start server
server = app.listen(port, () => {
  logger.info('app.server', { port }, 'App server running');
});

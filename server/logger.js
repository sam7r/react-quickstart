import bunyan from 'bunyan';
import RotatingFileStream from 'bunyan-rotating-file-stream';
import path from 'path';

// set our logs folder directory
const dir = path.resolve(__dirname, 'logs');
// define our different logger names
const loggerNames = ['app.server'];

const Logger = (() => {
  // single instance
  let instance;

  function init() {
    // return our logger methods
    return {
      // object for logger instances
      loggers: {},

      debug(name, responseData, msg) {
        if (!global.window) {
          this.getLoggerInstance(name).debug(responseData, msg);
        }
      },

      info(name, responseData, msg) {
        if (!global.window) {
          this.getLoggerInstance(name).info(responseData, msg);
        }
      },

      warn(name, responseData, msg) {
        if (!global.window) {
          this.getLoggerInstance(name).warn(responseData, msg);
        }
      },

      trace(name, responseData, msg) {
        if (!global.window) {
          this.getLoggerInstance(name).trace(responseData, msg);
        }
      },

      fatal(name, responseData, msg) {
        if (!global.window) {
          this.getLoggerInstance(name).fatal(responseData, msg);
        }
      },

      error(name, responseData, msg) {
        if (!global.window) {
          this.getLoggerInstance(name).error(responseData, msg);
        }
      },

      // create our logger instance with rotating file stream
      createLoggerInstance(name) {
        return bunyan.createLogger({
          name,
          serializers: {
            req: bunyan.stdSerializers.req,
            err: bunyan.stdSerializers.err
          },
          streams: [
            {
              type: 'raw',
              level: 'trace',
              stream: new RotatingFileStream({
                  path: path.resolve(dir, `%Y-%m-%d_%H.%M.%S_${name}.log`),
                  period: '1d',
                  startNewFile: true,
                  rotateExisting: true,
                  threshold: '10m',
                  totalSize: '50m',
                  gzip: false
              })
            },
            {
              level: 'info',
              stream: process.stdout
            }
          ]
        });
      },

      // return logger instance by name, if none is found one is created
      getLoggerInstance(name) {
        if (!this.loggers[name]) {
          this.loggers[name] = this.createLoggerInstance(name);
        }

        return this.loggers[name];
      },

      // returns all created loggers
      getAllLoggers() {
        return Object.values(this.loggers);
      },

      // creates all logger instances defined in loggerNames
      setupLoggers(loggerNames) {
        loggerNames.forEach(name => {
          this.loggers[name] = this.createLoggerInstance(name);
        });
      }
    };
  }

  return {
    // return our single logger instance
    getInstance: () => {
      // create new instance if none exists
      if (!instance) {
        instance = init();
        instance.setupLoggers(loggerNames);
      }
      return instance;
    }
  };
})();

export default Logger;

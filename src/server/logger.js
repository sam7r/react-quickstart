import bunyan from 'bunyan';
import RotatingFileStream from 'bunyan-rotating-file-stream';
import constants from 'root/constants';
import path from 'path';

const dir = (process.env.NODE_ENV === 'production' ?
  constants.BUILD_DIR :
  constants.SRC_DIR + '/server'
);

const loggerNames = ['app.server'];

const Logger = (() => {
  let instance;

  function init() {
    return {
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
                  path: path.resolve(dir, 'logs', `%Y-%m-%d_%H.%M.%S_${name}.log`),
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

      getLoggerInstance(name) {
        if (!this.loggers[name]) {
          this.loggers[name] = this.createLoggerInstance(name);
        }

        return this.loggers[name];
      },

      getAllLoggers() {
        return Object.values(this.loggers);
      },

      setupLoggers(loggerNames) {
        loggerNames.forEach(name => {
          this.loggers[name] = this.createLoggerInstance(name);
        });
      }
    };
  }

  return {
    getInstance: () => {
      if (!instance) {
        instance = init();
        instance.setupLoggers(loggerNames);
      }
      return instance;
    }
  };
})();

export default Logger;

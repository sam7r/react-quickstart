const path = require('path');
const Webpack = require('webpack');
const fs = require('fs');
const constants = require('root/constants');

const wpConfig = () => {

  const PATHS = {
    app: path.join(constants.SRC_DIR, 'server'),
    build: path.join(constants.BUILD_DIR)
  };

  return {
    entry: PATHS.app,
    output: {
      path: PATHS.build,
      filename: 'index.js'
    },
    node: {
      console: false,
      global: false,
      process: false,
      Buffer: false,
      __filename: false,
      __dirname: true
    },
    resolve: {
      extensions: [
        '.js',
        '.json',
      ],
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loaders: [
            'babel?presets[]=es2015,presets[]=stage-0'
          ],
        },
        {
          test: /\.json$/,
          loader: 'json',
        }
      ]
    },
    plugins: [
      new Webpack.DefinePlugin({
        'process.env': { NODE_ENV: JSON.stringify('production') }
      }),
      new Webpack.optimize.DedupePlugin()
    ],
    externals: fs.readdirSync('node_modules')
      .reduce(function(acc, mod) {
        if (mod === '.bin') {
          return acc;
        }
        acc[mod] = 'commonjs ' + mod;
        return acc;
      }, {})
  };


};

module.exports = wpConfig;

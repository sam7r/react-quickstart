const Webpack = require('webpack');
const constants = require('internals/constants');
const path = require('path');

const wpConfig = (options = {}) => {

  const config = {};

  config.devtool = 'cheap-module-source-map';
  config.context = constants.SRC_DIR;

  config.entry = {
    bundle: [constants.SRC_DIR],
    vendor: ['react', 'react-dom', 'babel-polyfill']
  };

  config.output = {
    path: path.join(constants.BUILD_DIR, 'js'),
    publicPath: '/js/',
    chunkFilename: '[name].bundle.js'
  };

  config.node = {
    net: 'empty'
  };

  config.resolve = {
    alias : { 'styled-components$': 'styled-components/lib/index.js' }
  };

  config.module = {
    loaders: [
      {
        test: /\.js$/,
        exclude: constants.NODE_MODULES_DIR,
        loader: 'babel',
        query: {
          babelrc: true,
          presets: ['es2015', 'stage-0', 'react']
        }
      }, {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  };

  config.plugins = [
    new Webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify('production') }
    }),
    new Webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      output: { comments: false },
      sourceMap: false
    }),
    new Webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
      filename: 'vendor.bundle.js'
    }),
    new Webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    })
  ];

  return Object.assign({}, config, options);

};

module.exports = wpConfig;

const Webpack = require('webpack');
const constants = require('boilerplate/constants');

const wpConfig = (options = {}) => {

  const config = {};

  config.devtool = 'eval',

  config.entry = {
    bundle: [
      `webpack-dev-server/client?${constants.HOT_RELOAD_URL}:${constants.HOT_RELOAD_PORT}`,
      'webpack/hot/only-dev-server',
      constants.SRC_DIR
    ],
    vendor: [
      'react', 'react-dom', 'babel-polyfill'
    ]
  };

  config.output = {
    path: constants.SRC_DIR,
    publicPath: '/js/',
    chunkFilename: '[name].bundle.js'
  };

  config.node = {
    net: 'empty'
  };

  config.module = {
    loaders: [
      {
        test: /\.js$/,
        exclude: constants.NODE_MODULES_DIR,
        loaders: [
          'react-hot',
          'babel?presets[]=es2015,presets[]=stage-0,presets[]=react'
        ]
      }, {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  };

  config.plugins = [
    new Webpack.HotModuleReplacementPlugin(),
    new Webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify('dev') }
    }),
    new Webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
      filename: 'vendor.bundle.js'
    })
  ];

  return Object.assign({}, config, options);

};

module.exports = wpConfig;

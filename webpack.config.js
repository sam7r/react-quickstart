const Webpack = require('webpack');
const path = require('path');
const constants = require('./constants');

const isProduction = process.env.NODE_ENV === 'production';

const PATHS = {
  app: path.join(constants.SRC_DIR, 'client', 'app'),
  build: !isProduction ? path.join(constants.SRC_DIR, 'server', 'assets', 'js') : constants.BUILD_DIR,
  hot_reload_server: `${constants.HOT_RELOAD_URL}:${constants.HOT_RELOAD_PORT}`
};

const hrBundle = (!isProduction) ? [
  `webpack-dev-server/client?${PATHS.hot_reload_server}`,
  'webpack/hot/only-dev-server'
] : null;

const wpConfig = {
  devtool: isProduction ? 'cheap-module-source-map' : 'eval',
  entry: {
    bundle: [...hrBundle, PATHS.app],
    vendor: ['react', 'react-dom', 'babel-polyfill']
  },
  output: {
    path: PATHS.build,
    publicPath: '/js/',
    chunkFilename: '[name].bundle.js'
  },
  node: {
    net: 'empty'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: constants.NODE_MODULES_DIR,
        loaders: [
          'babel',
          !isProduction ? 'react-hot' : null,
          'babel?presets[]=es2015,presets[]=stage-0,presets[]=react'
        ]
      }, {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  },
  plugins: [
    new Webpack.NamedModulesPlugin(),
    new Webpack.HotModuleReplacementPlugin(),
    new Webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
      filename: 'vendor.bundle.js'
    }),
    new Webpack.LoaderOptionsPlugin({
      minimize: isProduction,
      debug: !isProduction
    }),
    new Webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      output: { comments: false },
      sourceMap: false
    }),
  ]
};

module.exports = wpConfig;

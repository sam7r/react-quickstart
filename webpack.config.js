const Webpack = require('webpack');
const path = require('path');
const constants = require('root/constants');

const wpConfig = () => {

  const isProduction = process.env.NODE_ENV === 'production';

  const PATHS = {
    app: path.join(constants.SRC_DIR, 'client', 'app'),
    build: !isProduction ? 
      path.join(constants.SRC_DIR, 'server', 'assets', 'js') :
      path.join(constants.BUILD_DIR, 'assets', 'js'),
    hot_reload_server: `${constants.HOT_RELOAD_URL}:${constants.HOT_RELOAD_PORT}`
  };

  const bundles = [
    PATHS.app
  ];

  if (!isProduction) bundles.unshift(
    `webpack-dev-server/client?${PATHS.hot_reload_server}`,
    'webpack/hot/only-dev-server'
  );

  const plugins = [
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
    })
  ];

  if(isProduction) plugins.push(
    new Webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify('production') }
    })
  );

  if(!isProduction) plugins.push(
    new Webpack.NamedModulesPlugin(),
    new Webpack.HotModuleReplacementPlugin()
  );

  const loaders = [
    'babel',
    'babel?presets[]=es2015,presets[]=stage-0,presets[]=react'
  ];

  if(!isProduction) loaders.unshift(
    'react-hot'
  );

  return {
    devtool: isProduction ? 'cheap-module-source-map' : 'eval',
    entry: {
      bundle: [...bundles],
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
          loaders: [...loaders]
        }, {
          test: /\.json$/,
          loader: 'json-loader'
        }
      ]
    },
    plugins: [...plugins]
  };

};

module.exports = wpConfig;

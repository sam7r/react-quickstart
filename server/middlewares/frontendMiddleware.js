import webpack from 'webpack';
import express from 'express';
import webpackDevServer from 'webpack-dev-server';
import compression from 'compression';
import config from 'boilerplate/webpack/webpack.dev.config';
import constants from 'boilerplate/constants';
import httpProxy from 'http-proxy';
import path from 'path';
import Logger from '../logger';

// import our logger instance
const logger = Logger.getInstance();

// Hot module reload compiler
const hmrBundler = () => {
    
    let bundleStart = null;
    const compiler = webpack(config());

    // let us know when we start bundling
    compiler.plugin('compile', () => {
        console.log('Bundling...');
        bundleStart = Date.now();
    });

    // show how long it took to bundle the code
    compiler.plugin('done', () => {
        console.log('Bundled in ' + (Date.now() - bundleStart) + 'ms!');
    });

    // pass in our webpack compiler with config
    var bundler = new webpackDevServer(compiler, {
        publicPath: '/js/',
        headers: { 'Access-Control-Allow-Origin': '*' },
        hot: true,
        quiet: false,
        noInfo: true,
        stats: { colors: true }
    });

    // launch hot module bundler
    bundler.listen(
        constants.HOT_RELOAD_PORT,
        constants.HOT_RELOAD_URL.replace('http://', ''),
        () => console.log('Bundling project, please wait...')
    );
};

// add prod specific middlewares
const addProdMiddlewares = (app) => {
    app.use(compression());
    // setup logger through express middleware
    app.use((req, res, next) => {
    logger.info('app.server', { req }, 'Request');
        return next();
    });
    return app;
};

// add dev specific middlewares
const addDevMiddlewares = (app) => {
    hmrBundler(); // run hmr bundle through webpack-dev-server
    const proxy = httpProxy.createProxyServer({ changeOrigin: true });
    // hot module reload proxy endpoint
    app.all('/js/*', (req, res) => {
        proxy.web(req, res, {
            target: `${constants.HOT_RELOAD_URL}:${constants.HOT_RELOAD_PORT}`
        });
    });
    return app;
};

// add all middlewares
const addMiddlewares = (app) => {
    const isProd = process.env.NODE_ENV === 'production';
    const middlewares = (isProd) ? addProdMiddlewares : addDevMiddlewares;
    app.use(express.static(path.join(constants.SRC_DIR, 'app')));
    middlewares(app);
};

export default (app) => {
    addMiddlewares(app);
};

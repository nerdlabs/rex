
import express from 'express';
import compression from 'compression';
import { renderFile } from 'ejs';

import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import swagger from 'swagger-express-middleware';

import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext, createMemoryHistory } from 'react-router';
import { Provider } from 'react-redux';

import routes from './routes';
import { createStore } from './reducers';

import webpackConfig from '../webpack.dev.js';

const isProd = process.env.NODE_ENV === 'production';

const app = express();

app.engine('html', renderFile);
app.set('view engine', 'html');
app.set('views', __dirname);

app.use(compression());
app.use(({ url }, res, next) => {
  match({ routes, location: url }, (error, location, renderProps) => {
    switch (true) {
    default:
      return next();
    case !!error:
      return next(error);
    case !!location:
      return res.redirect(location.pathname);
    case !!renderProps:
      const store = createStore(createMemoryHistory());
      return Promise.all(renderProps.components.map(({ needs }) => (
        needs ? Promise.all(needs.map(need => store.dispatch(need()))) : true
      )))
      .then(() => {
        const api = global.__REX_API__;
        const js = app.getAssetUrl('main.js');
        const css = isProd ? app.getAssetUrl('main.css') : null;
        const state = JSON.stringify(store.getState());
        const body = renderToString(
          <Provider store={ store }>
            <RouterContext { ...renderProps } />
          </Provider>
        );
        res.render('template', { api, js, css, state, body });
      })
      .catch(next);
    }
  });
});

swagger('spec/api.yaml', app,
  (_, { metadata, parseRequest, validateRequest, mock }) => {
    app.use('/api', metadata(), parseRequest(), validateRequest(), mock());
  }
);

if (!isProd) {
  const compiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(compiler, { noInfo: true, quiet: true }));
  app.use(webpackHotMiddleware(compiler));
}
else {
  app.use(express.static('dist', { maxage: '1y'}));
}

app.getAssetUrl = path => `/${path}`;

export default app;

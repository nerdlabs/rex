
import express from 'express';
import compression from 'compression';
import { renderFile } from 'ejs';

import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext, createMemoryHistory } from 'react-router';
import { Provider } from 'react-redux';

import routes from './routes';
import { createStore } from './reducers';

const api = global.__REX_API__; // eslint-disable-line no-underscore-dangle
const isProd = process.env.NODE_ENV === 'production';

const app = express();

app.engine('html', renderFile);
app.set('view engine', 'html');
app.set('views', __dirname);

app.use(compression());
app.use(express.static('dist', { maxage: '1y'}));
app.use(({ url }, res, next) => {
  match({ routes, location: url }, (error, location, renderProps) => {
    switch (true) {
    default:
      return next();
    case !!error:
      return next(error);
    case !!location:
      return res.redirect(location.pathname);
    case !!renderProps: {
      const store = createStore(createMemoryHistory());
      return Promise.all(renderProps.components.map(({ needs }) => (
        needs ? Promise.all(needs.map(need => store.dispatch(need()))) : true
      )))
      .then(() => {
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
    }}
  });
});

app.getAssetUrl = path => `/${path}`;

export default app;

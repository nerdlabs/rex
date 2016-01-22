'use strict';

import 'babel-polyfill';

import React from 'react';
import express from 'express';
import compression from 'compression';
import swagger from 'swagger-express-middleware';
import { renderFile } from 'ejs';
import { renderToString } from 'react-dom/server';
import { match, RoutingContext } from 'react-router';
import { Provider } from 'react-redux';

import makeStore from './store';
import routes from './routes';

import { API } from './constants';

const app = express();

app.engine('html', renderFile);
app.set('view engine', 'html');
app.set('views', __dirname);

app.use(compression());
app.use(express.static('dist'));
app.use((req, res, next) => {
  match({ routes, location: req.url }, (error, location, renderProps) => {
    switch (true) {
    default:
      return next();
    case !!error:
      return next(error);
    case !!location:
      return res.redirect(location.pathname + location.search);
    case !!renderProps:
      const store = makeStore();
      const dispatch = store.dispatch.bind(store);
      Promise.all(renderProps.components.map(component => {
        return component.fetchData ? component.fetchData(dispatch) : true;
      }))
      .then(() => {
        const api = API;
        const state = JSON.stringify(store.getState());
        const body = renderToString(
          React.createElement(Provider, { store },
            React.createElement(RoutingContext, renderProps)
          )
        );
        return res.render('template', { api, state, body });
      })
      .catch(next);
    }
  });
});

swagger('spec/api.yaml', app, (_, middleware) => {
  const { metadata, parseRequest, validateRequest, mock } = middleware;
  app.use('/api', [metadata(), parseRequest(), validateRequest(), mock()]);
});

export const run = port => app.listen(port);

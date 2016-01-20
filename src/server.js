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

const server = express();

server.engine('html', renderFile);
server.set('view engine', 'html');
server.set('views', __dirname);

server.use(compression());
server.use(express.static('dist'));
server.use((req, res, next) => {
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
        const api = global.__REX_API__;
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

if (!process.env.API) {
  swagger('spec/api.yaml', server, (err, middleware) => {
    server.use(
      '/api',
      [
        middleware.metadata(),
        middleware.parseRequest(),
        middleware.validateRequest(),
        middleware.mock()
      ]
    );
  });
}

export const run = (port) => server.listen(port);

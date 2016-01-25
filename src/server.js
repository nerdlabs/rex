
import React from 'react';
import express from 'express';
import compression from 'compression';
import swagger from 'swagger-express-middleware';
import { renderFile } from 'ejs';
import { renderToString } from 'react-dom/server';
import { match, RouterContext, createMemoryHistory } from 'react-router';
import { Provider } from 'react-redux';

import routes from './routes';
import createStore from './store';

import { DEV, REV, API } from './constants';

const app = express();

app.engine('html', renderFile);
app.set('view engine', 'html');
app.set('views', __dirname);

app.use(compression());
// TODO: need to figure out how to configure jspm paths correctly...
app.use(express.static('.', { maxage: DEV ? 0 : '1y'}));

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
      const dispatch = store.dispatch.bind(store);
      return Promise.all(renderProps.components.map(component => {
        return component.fetchData ? component.fetchData(dispatch) : true;
      }))
      .then(() => {
        const rev = REV;
        const api = API;
        const state = JSON.stringify(store.getState());
        const body = renderToString(
          React.createElement(Provider, { store },
            React.createElement(RouterContext, renderProps)
          )
        );
        res.render('template', { rev, api, state, body });
      })
      .catch(next);
    }
  });
});

swagger('spec/api.yaml', app,
  (_, { metadata, parseRequest, validateRequest, mock }) => {
    app.use('/api', [metadata(), parseRequest(), validateRequest(), mock()]);
  }
);

export const listen = app.listen.bind(app);

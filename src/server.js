
import express from 'express';
import compression from 'compression';
import swagger from 'swagger-express-middleware';
import { renderFile } from 'ejs';

import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext, createMemoryHistory } from 'react-router';
import { Provider } from 'react-redux';

import routes from './routes';
import createStore from './store';

import { DEV, API } from './constants';

const app = express();

app.engine('html', renderFile);
app.set('view engine', 'html');
app.set('views', __dirname);

app.use(compression());
app.use(express.static('dist', { maxage: DEV ? 0 : '1y'}));
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
        const api = API;
        const js = app.getAssetUrl('main.js');
        const css = app.getAssetUrl('main.css');
        const state = JSON.stringify(store.getState());
        const body = renderToString(
          createElement(Provider, { store },
            createElement(RouterContext, renderProps)
          )
        );
        res.render('template', { api, js, css, state, body });
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

app.getAssetUrl = path => `/${path}`;

export default app;


import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';

import routes from './routes';
import { createRouterStore } from './reducers';

const store = createRouterStore(browserHistory);

render(
  <Provider store={ store }>
    <Router history={ store.history }>
      { routes }
    </Router>
  </Provider>,
  document.querySelector('main')
);

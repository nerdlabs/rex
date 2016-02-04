
import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';

import routes from './routes';
import { createStore } from './reducers';

const store = createStore(browserHistory);

render(
  <Provider store={ store }>
    <Router history={ browserHistory }>
      { routes }
    </Router>
  </Provider>,
  document.querySelector('main')
);

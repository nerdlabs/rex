
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory as history } from 'react-router';
import { Provider } from 'react-redux';

import routes from './routes';
import createStore from './store';

const store = createStore(history);

ReactDOM.render(
  React.createElement(Provider, { store },
    React.createElement(Router, { history }, routes)
  ),
  document.getElementById('rex')
);

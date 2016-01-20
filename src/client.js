'use strict';

import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router';

import makeStore from './store';
import routes from './routes';

const store = makeStore();
const history = store.history;

ReactDOM.render(
  React.createElement(Provider, { store },
    React.createElement(Router, { history }, routes)
  ),
  document.getElementById('root')
);

'use strict';

import { createStore, applyMiddleware } from 'redux';
import { syncHistory } from 'redux-simple-router';
import promiseMiddleware from 'redux-promise';

import reducers from './reducers';

import { STATE } from './constants';

export default function createHistoricStore(history) {
  const middleware = [promiseMiddleware, syncHistory(history)];
  const store = applyMiddleware(...middleware)(createStore)(reducers, STATE);
  middleware.pop().listenForReplays(store);
  return store;
}

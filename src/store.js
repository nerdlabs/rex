'use strict';

import { createStore, applyMiddleware } from 'redux';
import { createHistory, createMemoryHistory } from 'history';
import { syncHistory } from 'redux-simple-router';
import promiseMiddleware from 'redux-promise';

import reducers from './reducers';

import { STATE, BROWSER } from './constants';

export default function makeStore(state = STATE) {
  const history = BROWSER ? createHistory() : createMemoryHistory();
  const middleware = [promiseMiddleware, syncHistory(history)];
  const store = applyMiddleware(...middleware)(createStore)(reducers, state);
  middleware.pop().listenForReplays(store);
  return Object.assign(store, { history });
}

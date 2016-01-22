'use strict';

import { createStore, applyMiddleware } from 'redux';
import { createHistory, createMemoryHistory } from 'history';
import { syncHistory } from 'redux-simple-router';
import promiseMiddleware from 'redux-promise';

import reducers from './reducers';

export default function makeStore(state = global.__REX_DAT__) {
  const history = process.browser
    ? createHistory()
    : createMemoryHistory();
  const historyMiddleware = syncHistory(history);

  const middleware = [ promiseMiddleware, historyMiddleware ];
  const makeCreateStore = applyMiddleware(...middleware);
  const createExtStore = makeCreateStore(createStore);

  const store = Object.assign(
    createExtStore(reducers, state),
    { history }
  );
  historyMiddleware.listenForReplays(store);

  return store;
}

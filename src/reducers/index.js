
import { combineReducers, applyMiddleware, createStore as create } from 'redux';
import { syncHistory } from 'react-router-redux';
import promiseMiddleware from 'redux-promise';

import content from './content';
import routing from './routing';

const reducers = combineReducers({ content, routing });

export function createStore(history, state = global.__REX_DAT__) {
  const middleware = syncHistory(history);
  const createStore = applyMiddleware(promiseMiddleware, middleware)(create);
  const store = createStore(reducers, state);
  middleware.listenForReplays(store);
  return store;
}

export function createSelector(filename, ...args) {
  const root = filename.replace(/^.*\/(.*?)\..*$/, '$1');
  const selectors = [state => state[root], ...args];
  return selectors.reduce.bind(selectors, (state, select) => select(state));
}

export * from './content';
export * from './routing';

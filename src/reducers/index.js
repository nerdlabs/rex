
import { combineReducers, applyMiddleware, createStore as create } from 'redux';
import { syncHistory, routeReducer as routing } from 'react-router-redux';
import promiseMiddleware from 'redux-promise';

import content from './content';

const defaults = global.__REX_DAT__; // eslint-disable-line no-underscore-dangle

export function createStore(history, state = defaults) {
  const middleware = syncHistory(history);
  const enhancer = applyMiddleware(promiseMiddleware, middleware);
  const reducer = combineReducers({ content, routing });
  const store = create(reducer, state, enhancer);
  middleware.listenForReplays(store);
  return store;
}

export * from './content';

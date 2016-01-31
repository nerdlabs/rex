
import { combineReducers, applyMiddleware, createStore as create } from 'redux';
import { syncHistory, routeReducer as routing } from 'react-router-redux';
import promiseMiddleware from 'redux-promise';

import content from './content';

export function createStore(history, state = global.__REX_DAT__) {
  const middleware = syncHistory(history);
  const enhancer = applyMiddleware(promiseMiddleware, middleware);
  const reducer = combineReducers({ content, routing });
  const store = create(reducer, state, enhancer);
  middleware.listenForReplays(store);
  return store;
}

export * from './content';

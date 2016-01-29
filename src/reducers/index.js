
import { combineReducers, applyMiddleware, createStore as create } from 'redux';
import { syncHistory, routeReducer as routing } from 'react-router-redux';
import promiseMiddleware from 'redux-promise';

import content from './content';

const reducers = combineReducers({ content, routing });

function createCreator(...middlewares) {
  return applyMiddleware(promiseMiddleware, ...middlewares)(create);
}

export function createStore(history, state = global.__REX_DAT__) {
  const middleware = syncHistory(history);
  const store = createCreator(middleware)(reducers, state);
  middleware.listenForReplays(store);
  return store;
}

export * from './content';


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

export function selectContent(state) { return state.content; }

export function selectRouting(state) { return state.routing; }

export * from './content';
export * from './routing';

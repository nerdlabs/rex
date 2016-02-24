
import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore
}
from 'redux';

import {
  routerMiddleware,
  routerReducer,
  syncHistoryWithStore
}
from 'react-router-redux';

import thunk from 'redux-thunk';

import content from './content';

const defaults = global.__REX_DAT__; // eslint-disable-line no-underscore-dangle
const routing = routerReducer;

export function createRouterStore(rawHistory, state = defaults) {
  const reducer = combineReducers({ content, routing });
  const enhancer = compose(
    applyMiddleware(thunk, routerMiddleware(rawHistory)),
    global.devToolsExtension ? global.devToolsExtension() : fn => fn
  );
  const store = createStore(reducer, state, enhancer);
  const history = syncHistoryWithStore(rawHistory, store);
  return Object.assign(store, { history });
}

export * from './content';


import { createStore, applyMiddleware } from 'redux';
import { syncHistory } from 'react-router-redux';
import promiseMiddleware from 'redux-promise';

import reducers from './reducers';

import { STATE } from './constants';

const apply = applyMiddleware.bind(null, promiseMiddleware);

export default function createHistoricStore(history) {
  const middleware = syncHistory(history);
  const store = apply(middleware)(createStore)(reducers, STATE);
  middleware.listenForReplays(store);
  return store;
}

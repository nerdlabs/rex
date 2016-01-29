
import { createAction, handleActions } from 'redux-actions';
import fetch from 'isomorphic-fetch';

import { createSelector } from '.';

function fetchJSON(path) {
  return fetch(`${ global.__REX_API__ }/${ path }`)
  .then(res => {
    if (res.status >= 200 && res.status < 300) {
      return res;
    }
    throw new Error(`http status: ${ res.status }`);
  })
  .then(res => res.json());
}

export const fetchHomeContent = createAction(
  'UPDATE_HOME_CONTENT', fetchJSON.bind(null, 'home')
);

export const fetchAboutContent = createAction(
  'UPDATE_ABOUT_CONTENT', fetchJSON.bind(null, 'about')
);

export const selectHomeContent = createSelector(
  __filename, state => ({ content: state.home })
);

export const selectAboutContent = createSelector(
  __filename, state => ({ content: state.about })
);

export default handleActions(
  {
    UPDATE_HOME_CONTENT: (state, action) => ({
      ...state,
      home: { ...state.home, ...action.payload }
    }),
    UPDATE_ABOUT_CONTENT: (state, action) => ({
      ...state,
      about: { ...state.about, ...action.payload }
    })
  },
  { home: {}, about: {} }
);

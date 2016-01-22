'use strict';

import { handleActions } from 'redux-actions';

import {
  UPDATE_HOME_CONTENT,
  UPDATE_ABOUT_CONTENT
}
from '../constants';

export default handleActions(
  {
    [UPDATE_HOME_CONTENT]: (state, action) => ({
      ...state,
      home: { ...state.home, ...action.payload }
    }),
    [UPDATE_ABOUT_CONTENT]: (state, action) => ({
      ...state,
      about: { ...state.about, ...action.payload }
    })
  },
  { home: {}, about: {} }
);

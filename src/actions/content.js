
import fetch from 'isomorphic-fetch';
import { createAction } from 'redux-actions';

import {
  API,
  UPDATE_HOME_CONTENT,
  UPDATE_ABOUT_CONTENT
}
from '../constants';

function fetchJSON(path) {
  return fetch(`${ API }/${ path }`)
  .then(res => {
    if (res.status >= 200 && res.status < 300) {
      return res;
    }
    throw new Error(`http status: ${ res.status }`);
  })
  .then(res => res.json());
}

export const fetchHomeContent = createAction(
  UPDATE_HOME_CONTENT, fetchJSON.bind(null, 'home')
);

export const fetchAboutContent = createAction(
  UPDATE_ABOUT_CONTENT, fetchJSON.bind(null, 'about')
);

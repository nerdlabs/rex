
import fetch from 'isomorphic-fetch';
import { createAction } from 'redux-actions';

import {
  API,
  UPDATE_HOME_CONTENT,
  UPDATE_ABOUT_CONTENT
}
from '../constants';

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(`http status: ${ response.statusCode }`);
  error.response = response;
  throw error;
};

const parseJSON = (response) => response.json();

function fetchJSON(path) {
  return fetch(`${ API }/${ path }`).then(checkStatus).then(parseJSON);
}

export const fetchHomeContent = createAction(
  UPDATE_HOME_CONTENT, fetchJSON.bind(null, 'home')
);

export const fetchAboutContent = createAction(
  UPDATE_ABOUT_CONTENT, fetchJSON.bind(null, 'about')
);

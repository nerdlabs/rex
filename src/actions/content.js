'use strict';

import { createAction } from 'redux-actions';
import { create as createClient } from 'axios';

const client = createClient({ baseURL: global.__REX_API__ });

function fetch(path) {
  return client.get(path).then(r => r.status === 200 ? r.data : { error: r });
}

export const fetchHomeContent = createAction(
  'UPDATE_HOME_CONTENT',
  fetch.bind(null, 'home')
);

export const fetchAboutContent = createAction(
  'UPDATE_ABOUT_CONTENT',
  fetch.bind(null, 'about')
);

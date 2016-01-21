'use strict';

import http from 'http';
import { createAction } from 'redux-actions';

function fetch(path) {
  return new Promise((resolve, reject) => {
    const req = http.get(`${ global.__REX_API__ }/${ path }`, res => {
      const chunks = [];
      res.setEncoding('utf8');
      res.on('data', chunk => chunks.push(chunk));
      res.on('end', () => {
        if (res.statusCode === 200) {
          resolve(JSON.parse(chunks.join('')));
        }
        else {
          reject(new Error(`http status: ${ res.statusCode }`));
        }
      });
    });
    req.on('error', reject);
  });
}

export const fetchHomeContent = createAction(
  'UPDATE_HOME_CONTENT',
  fetch.bind(null, 'home')
);

export const fetchAboutContent = createAction(
  'UPDATE_ABOUT_CONTENT',
  fetch.bind(null, 'about')
);

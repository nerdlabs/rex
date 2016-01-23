
import { get } from 'http';
import { createAction } from 'redux-actions';

import {
  API,
  UPDATE_HOME_CONTENT,
  UPDATE_ABOUT_CONTENT
}
from '../constants';

function fetch(path) {
  return new Promise((resolve, reject) => {
    get(`${ API }/${ path }`, res => {
      const buffers = [];
      res.on('data', buffer => buffers.push(buffer));
      res.on('end', () => {
        if (res.statusCode === 200) {
          const buffer = Buffer.concat(buffers);
          const json = buffer.toString();
          resolve(JSON.parse(json));
        }
        else {
          reject(new Error(`http status: ${ res.statusCode }`));
        }
      });
    }).on('error', reject);
  });
}

export const fetchHomeContent = createAction(
  UPDATE_HOME_CONTENT, fetch.bind(null, 'home')
);

export const fetchAboutContent = createAction(
  UPDATE_ABOUT_CONTENT, fetch.bind(null, 'about')
);

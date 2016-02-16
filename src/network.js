
import fetch from 'isomorphic-fetch';

const api = global.__REX_API__; // eslint-disable-line no-underscore-dangle

export const fetchJSON = (path) => {
  const url = `${api}/${path}`;
  return fetch(url)
    .then(response => {
      const { status } = response;
      if (status >= 200 && status < 300) {
        return response;
      }
      throw new Error(`Error fetching: ${url} status: ${status}`);
    })
    .then(res => res.json());
};

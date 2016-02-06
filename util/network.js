import fetch from 'isomorphic-fetch';

export const fetchJSON = (url) => {
  return fetch(url)
    .then(response => {
      const { status } = response;
      if (status >= 200 && status < 300) {
        return response;
      }
      throw new Error(`Error fetching: ${url} status: ${status }`);
    })
    .then(res => res.json());
};

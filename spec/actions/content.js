'use strict';

import test from 'tape';

import { fetchHomeContent, fetchAboutContent } from '../../src/actions/content';

test('content action creators', ({ test, end }) => {

  test('fetchHomeContent action creator output', ({ equal, ok, end }) => {
    const action = fetchHomeContent();
    {
      const actual = action.type;
      const expected = 'UPDATE_HOME_CONTENT';
      const msg = `type should be ${ expected }`;
      equal(actual, expected, msg);
    }
    {
      const value = action.payload instanceof Promise;
      const msg = 'payload should be a promise';
      ok(value, msg);
    }
    end();
  });

  test('fetchAboutContent action creator output', ({ equal, ok, end }) => {
    const action = fetchAboutContent();
    {
      const actual = action.type;
      const expected = 'UPDATE_ABOUT_CONTENT';
      const msg = `type should be ${ expected }`;
      equal(actual, expected, msg);
    }
    {
      const value = action.payload instanceof Promise;
      const msg = 'payload should be a promise';
      ok(value, msg);
    }
    end();
  });

  end();
});

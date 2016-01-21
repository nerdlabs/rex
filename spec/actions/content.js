'use strict';

import test from 'tape';

import { fetchHomeContent, fetchAboutContent } from '../../src/actions/content';

test('content action creators', ({ test, end }) => {

  test('fetchHomeContent action creator output', ({ equal, ok, end }) => {
    const action = fetchHomeContent();
    {
      const actual = action.type;
      const expected = 'UPDATE_HOME_CONTENT';
      equal(actual, expected,
        `type should be ${ expected }`);
    }
    {
      const actual = action.payload;
      const expectedConstructor = Promise;
      ok(actual instanceof expectedConstructor,
        'payload should be a promise');
    }
    end();
  });

  test('fetchAboutContent action creator output', ({ equal, ok, end }) => {
    const action = fetchAboutContent();
    {
      const actual = action.type;
      const expected = 'UPDATE_ABOUT_CONTENT';
      equal(actual, expected,
        `type should be ${ expected }`);
    }
    {
      const actual = action.payload;
      const expectedConstructor = Promise;
      ok(actual instanceof expectedConstructor,
        'payload should be a promise');
    }
    end();
  });

  end();
});

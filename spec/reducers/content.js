
import test from 'tape';

import reduce, { fetchHomeContent, fetchAboutContent }
from '../../src/reducers/content';

test('content reducer states', ({ test, end }) => {

  const payload = { foo: 'bar' };

  test('content reducer default state', ({ deepEqual, end }) => {
    const state = reduce(undefined, { type: 'NONE', payload: null });
    {
      const actual = state.home;
      const expected = {};
      const msg = 'default home state should be empty';
      deepEqual(actual, expected, msg);
    }
    {
      const actual = state.about;
      const expected = {};
      const msg = 'default about state should be empty';
      deepEqual(actual, expected, msg);
    }
    end();
  });

  test('content reducer partially updated state', ({ deepEqual, end }) => {
    const state = reduce(undefined, { type: 'UPDATE_HOME_CONTENT', payload });
    {
      const actual = state.home;
      const expected = payload;
      const msg = 'updated home state should equal payload';
      deepEqual(actual, expected, msg);
    }
    {
      const actual = state.about;
      const expected = {};
      const msg = 'default about state should be empty';
      deepEqual(actual, expected, msg);
    }
    end();
  });

  test('content reducer fully updated state', ({ deepEqual, end }) => {
    const state = reduce(
      reduce(undefined, { type: 'UPDATE_HOME_CONTENT', payload }),
      { type: 'UPDATE_ABOUT_CONTENT', payload }
    );
    {
      const actual = state.home;
      const expected = payload;
      const msg = 'updated home state should equal payload';
      deepEqual(actual, expected, msg);
    }
    {
      const actual = state.about;
      const expected = payload;
      const msg = 'updated about state should equal payload';
      deepEqual(actual, expected, msg);
    }
    end();
  });

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

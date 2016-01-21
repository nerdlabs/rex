'use strict';

import test from 'tape';

import reduce from '../../src/reducers/content';

const payload = { foo: 'bar' };

test('content reducer states', ({ test, end }) => {

  test('content reducer default state', ({ deepEqual, end }) => {
    const state = reduce(undefined, { type: 'NONE', payload: null });
    {
      const actual = state.home;
      const expected = {};
      deepEqual(actual, expected,
        'default home state should be an empty object');
    }
    {
      const actual = state.about;
      const expected = {};
      deepEqual(actual, expected,
        'default about state should be an empty object');
    }
    end();
  });

  test('content reducer partially updated state', ({ deepEqual, end }) => {
    const state = reduce(undefined, { type: 'UPDATE_HOME_CONTENT', payload });
    {
      const actual = state.home;
      const expected = payload;
      deepEqual(actual, expected,
        'updated home state should equal action payload');
    }
    {
      const actual = state.about;
      const expected = {};
      deepEqual(actual, expected,
        'default about state should be an empty object');
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
      deepEqual(actual, expected,
        'updated home state should equal action payload');
    }
    {
      const actual = state.about;
      const expected = payload;
      deepEqual(actual, expected,
        'updated about state should equal action payload');
    }
    end();
  });

  end();
});

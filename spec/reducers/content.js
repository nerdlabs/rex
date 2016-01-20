'use strict';

import test from 'tape';

import reduce from '../../src/reducers/content';

test('content reducer test', t => {
  const payload = { foo: 'bar' };

  const state = reduce(undefined, { type: 'NONE', payload: null });
  t.ok(state.home, 'default state contains "home"');
  t.ok(state.about, 'default state contains "about"');
  t.deepEqual(state.home, {}, 'default home state is empty');
  t.deepEqual(state.about, {}, 'default about state is empty');

  const home = reduce(state, { type: 'UPDATE_HOME_CONTENT', payload });
  t.deepEqual(home.home, payload, 'home state equals payload');
  t.deepEqual(home.about, {}, 'about state is empty');

  const about = reduce(home, { type: 'UPDATE_ABOUT_CONTENT', payload });
  t.deepEqual(about.home, payload, 'home state still equals payload');
  t.deepEqual(about.about, payload, 'about state now equals payload');

  t.end();
});

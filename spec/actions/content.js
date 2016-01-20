'use strict';

import test from 'tape';

import { fetchHomeContent, fetchAboutContent } from '../../src/actions/content';

test('content action creators test', t => {
  const homeAction = fetchHomeContent();
  const aboutAction = fetchAboutContent();
  t.equal(homeAction.type, 'UPDATE_HOME_CONTENT', 'home type is correct');
  t.ok(homeAction.payload instanceof Promise, 'home payload is a promise');
  t.equal(aboutAction.type, 'UPDATE_ABOUT_CONTENT', 'about type is correct');
  t.ok(aboutAction.payload instanceof Promise, 'about payload is a promise');
  t.end();
});

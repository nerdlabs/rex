
import test from 'tape';

import {
  homeContentSelector,
  aboutContentSelector
}
from '../../src/selectors';

test('content selectors', ({ test, end }) => {

  test('homeContentSelector selector output', ({ deepEqual, end }) => {
    const actual = homeContentSelector({ content: { home: 'foo' }});
    const expected = { content: 'foo' };
    const msg = `content should equal ${expected}`;
    deepEqual(actual, expected, msg);
    end();
  });

  test('aboutContentSelector selector output', ({ deepEqual, end }) => {
    const actual = aboutContentSelector({ content: { about: 'foo' }});
    const expected = { content: 'foo' };
    const msg = `content should equal ${expected}`;
    deepEqual(actual, expected, msg);
    end();
  });

  end();
});

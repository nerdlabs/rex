'use strict';

import test from 'tape';
import { createElement } from 'react';
import { createRenderer } from 'react-addons-test-utils';
import { createStore } from 'redux';

import Home from '../../src/routes/home';

test('home route component output', ({ test, end }) => {
  const store = createStore(s => s, { content: {}});
  const props = { store };
  const renderer = createRenderer();
  renderer.render(createElement(Home, props));
  const root = renderer.getRenderOutput();

  test('home route component output root element', ({ equal, end }) => {
    const element = root;
    {
      const actual = element.type;
      const expected = Home.WrappedComponent;
      const msg = `root element should be a wrapped component`;
      equal(actual, expected, msg);
    }
    end();
  });

  end();
});

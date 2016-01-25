
import test from 'tape';
import { createElement } from 'react';
import { createRenderer } from 'react-addons-test-utils';
import { createStore } from 'redux';

import About from '../../src/containers/about';

test('about route component output', ({ test, end }) => {
  const store = createStore(s => s, { content: {}});
  const props = { store };
  const renderer = createRenderer();
  renderer.render(createElement(About, props));
  const root = renderer.getRenderOutput();

  test('about route component output root element', ({ equal, end }) => {
    const element = root;
    {
      const actual = element.type;
      const expected = About.WrappedComponent;
      const msg = `root element should be a wrapped component`;
      equal(actual, expected, msg);
    }
    end();
  });

  end();
});

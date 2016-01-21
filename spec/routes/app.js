'use strict';

import test from 'tape';
import { createElement } from 'react';
import { createRenderer } from 'react-addons-test-utils';

import App from '../../src/routes/app';

test('app route component output', ({ test, end }) => {
  const props = {};
  const renderer = createRenderer();
  renderer.render(createElement(App, props));
  const root = renderer.getRenderOutput();

  test('app route component output root element', ({ equal, end }) => {
    const element = root;
    {
      const actual = element.type;
      const expected = 'div';
      const msg = `root element type should be a ${ expected }`;
      equal(actual, expected, msg);
    }
    {
      const actual = element.props.children.length;
      const expected = 2;
      const msg = `root element shold have ${ expected } children`;
      equal(actual, expected, msg);
    }
    {
      const actual = element.props.children[1];
      const expected = undefined;
      const msg = '2nd child should be undefined';
      equal(actual, expected, msg);
    }
    end();
  });

  test('app route component output child element', ({ equal, end }) => {
    const element = root.props.children[0];
    {
      const actual = element.type;
      const expected = 'nav';
      const msg = `1st child element type should be a ${ expected }`;
      equal(actual, expected, msg);
    }
    {
      const actual = element.props.children.length;
      const expected = 2;
      const msg = `1st child element shold have ${ expected } children`;
      equal(actual, expected, msg);
    }
    end();
  });

  test('app route component output sub elements', ({ equal, end }) => {
    const [h1, ul] = root.props.children[0].props.children;
    {
      const actual = h1.type;
      const expected = 'h1';
      const msg = `sub element type should be a ${ expected }`;
      equal(actual, expected, msg);
    }
    {
      const actual = ul.type;
      const expected = 'ul';
      const msg = `sub element type should be a ${ expected }`;
      equal(actual, expected, msg);
    }
    end();
  });

  end();
});

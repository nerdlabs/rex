'use strict';

import test from 'tape';
import { createElement } from 'react';
import { createRenderer } from 'react-addons-test-utils';

import Content from '../../src/components/content';

test('content component output', ({ test, end }) => {
  const props = { title: 'title', body: 'body' };
  const renderer = createRenderer();
  renderer.render(createElement(Content, props));
  const root = renderer.getRenderOutput();

  test('content component output root element', ({ equal, end }) => {
    const element = root;
    {
      const actual = element.type;
      const expected = 'div';
      const msg = `root element type should be a ${ expected }`;
      equal(actual, expected, msg);
    }
    {
      const actual = element.props.children.length;
      const expected = 4;
      const msg = `root element shold have ${ expected } children`;
      equal(actual, expected, msg);
    }
    end();
  });

  test('content component output 1st child element', ({ equal, end }) => {
    const element = root.props.children[0];
    const actual = element.type;
    const expected = 'hr';
    const msg = `1st child element should be a ${ expected }`;
    equal(actual, expected, msg);
    end();
  });

  test('content component output 2nd child element', ({ equal, end }) => {
    const element = root.props.children[1];
    {
      const actual = element.type;
      const expected = 'h2';
      const msg = `2nd child element should be a ${ expected }`;
      equal(actual, expected, msg);
    }
    {
      const actual = element.props.children;
      const expected = props.title;
      const msg = `2nd child element content should be "${ expected }"`;
      equal(actual, expected, msg);
    }
    end();
  });

  test('content component output 3rd child element', ({ equal, end }) => {
    const element = root.props.children[2];
    {
      const actual = element.type;
      const expected = 'p';
      const msg = `3rd child element should be a ${ expected }`;
      equal(actual, expected, msg);
    }
    {
      const actual = element.props.children;
      const expected = props.body;
      const msg = `3rd child element content should be "${ expected }"`;
      equal(actual, expected, msg);
    }
    end();
  });

  test('content component output 4th child element', ({ equal, end }) => {
    const element = root.props.children[3];
    const actual = element.type;
    const expected = 'hr';
    const msg = `4th child element should be a ${ expected }`;
    equal(actual, expected, msg);
    end();
  });

  end();
});

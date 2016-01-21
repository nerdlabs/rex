'use strict';

import test from 'tape';
import { createElement } from 'react';
import { createRenderer } from 'react-addons-test-utils';

import Content from '../../src/components/content';

const props = { title: 'title', body: 'body' };

function render () {
  const renderer = createRenderer();
  renderer.render(createElement(Content, props));
  return renderer.getRenderOutput();
}

test('content component output', ({ test, end }) => {

  test('content component output root element', ({ equal, end }) => {
    const element = render();
    {
      const actual = element.type;
      const expected = 'div';
      equal(actual, expected,
        `root element type should be a ${ expected }`);
    }
    {
      const actual = element.props.children.length;
      const expected = 4;
      equal(actual, expected,
        `root element shold have ${ expected } children`);
    }
    end();
  });

  test('content component output 1st child element', ({ equal, end }) => {
    const element = render().props.children[0];
    const actual = element.type;
    const expected = 'hr';
    equal(actual, expected,
      `1st child element should be a ${ expected }`);
    end();
  });

  test('content component output 2nd child element', ({ equal, end }) => {
    const element = render().props.children[1];
    {
      const actual = element.type;
      const expected = 'h2';
      equal(actual, expected,
        `2nd child element should be a ${ expected }`);
    }
    {
      const actual = element.props.children;
      const expected = props.title;
      equal(actual, expected,
        `2nd child element content should be "${ expected }"`);
    }
    end();
  });

  test('content component output 3rd child element', ({ equal, end }) => {
    const element = render().props.children[2];
    {
      const actual = element.type;
      const expected = 'p';
      equal(actual, expected,
        `3rd child element should be a ${ expected }`);
    }
    {
      const actual = element.props.children;
      const expected = props.body;
      equal(actual, expected,
        `3rd child element content should be "${ expected }"`);
    }
    end();
  });

  test('content component output 4th child element', ({ equal, end }) => {
    const element = render().props.children[3];
    const actual = element.type;
    const expected = 'hr';
    equal(actual, expected,
      `4th child element should be a ${ expected }`);
    end();
  });

  end();
});

'use strict';

import test from 'tape';
import { createElement } from 'react';
import { createRenderer } from 'react-addons-test-utils';

import Content from '../../src/components/content';

test('content component test', t => {
  const renderer = createRenderer();
  renderer.render(createElement(Content, { title: 'title', body: 'body' }));
  const root = renderer.getRenderOutput();
  const children = root.props.children;
  t.equal(root.type, 'div', 'root type is div');
  t.equal(children.length, 4, 'root element has 4 children');
  t.equal(children[0].type, 'hr', '1st child is a <hr>');
  t.equal(children[1].type, 'h2', '2nd child is a <h2>');
  t.equal(children[1].props.children, 'title', '2nd child content is "title"');
  t.equal(children[2].type, 'p', '3rd child is a <p>');
  t.equal(children[2].props.children, 'body', '3rd child content is "body"');
  t.equal(children[3].type, 'hr', '4th child is a <hr>');
  t.end();
});

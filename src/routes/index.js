'use strict';

import React from 'react'; // eslint-disable-line
import { Route, IndexRoute } from 'react-router';

import App from './app';
import Home from './home';
import About from './about';

export default (
  <Route path="/" component={ App }>
    <IndexRoute component={ Home } />
    <Route path="about" component={ About } />
  </Route>
);

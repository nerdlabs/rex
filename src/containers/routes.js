
import React from 'react';
import { Route, IndexRoute } from 'react-router';

import { App } from '../components';
import Home from './home';
import About from './about';

export default (
  <Route path="/" component={ App }>
    <IndexRoute component={ Home } />
    <Route path="about" component={ About } />
  </Route>
);

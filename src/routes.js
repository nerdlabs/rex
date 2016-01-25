
import React from 'react'; // eslint-disable-line
import { Route, IndexRoute } from 'react-router';

import App from './components/app/index';
import Home from './containers/home';
import About from './containers/about';

export default (
  <Route path="/" component={ App }>
    <IndexRoute component={ Home } />
    <Route path="about" component={ About } />
  </Route>
);

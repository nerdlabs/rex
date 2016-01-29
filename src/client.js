
import { createElement } from 'react';
import { render } from 'react-dom';
import { Router, browserHistory as history } from 'react-router';
import { Provider } from 'react-redux';

import { routes } from './containers';
import { createStore } from './reducers';

const store = createStore(history);

render(
  createElement(Provider, { store },
    createElement(Router, { history }, routes)
  ),
  document.getElementById('rex')
);

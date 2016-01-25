
import React from 'react'; // eslint-disable-line
import { Link, IndexLink } from 'react-router';

export default ({ children }) => (
  <div>
    <nav>
      <h1>
        <IndexLink to="/">rex demo</IndexLink>
      </h1>
      <ul>
        <li><Link to="/about">About</Link></li>
      </ul>
    </nav>
    { children }
  </div>
);

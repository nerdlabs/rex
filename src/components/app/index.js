
import React from 'react'; // eslint-disable-line
import { Link, IndexLink } from 'react-router';

import styles from './styles.css'; // TODO: needs a trailing '!' for jspm

export default ({ children }) => (
  <div className={ styles.wrapper }>
    <nav className={ styles.header }>
      <h1 className={ styles.logo }>
        <IndexLink to="/">rex demo</IndexLink>
      </h1>
      <ul className={ styles.menu }>
        <li><Link to="/about">About</Link></li>
      </ul>
    </nav>
    { children }
  </div>
);

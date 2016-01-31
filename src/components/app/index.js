
import React from 'react';
import { Link, IndexLink } from 'react-router';

import styles from './styles.css';

export default ({ children }) => (
  <div className={ styles.wrapper }>
    <nav className={ styles.header }>
      <h1 className={ styles.logo }>
        <IndexLink to="/">rex demos</IndexLink>
      </h1>
      <ul className={ styles.menu }>
        <li><Link to="/about">About</Link></li>
      </ul>
    </nav>
    { children }
  </div>
);

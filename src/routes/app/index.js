'use strict';

import React from 'react'; // eslint-disable-line
import { Link, IndexLink } from 'react-router';

import './normalize.css';
import styles from './styles.css';

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

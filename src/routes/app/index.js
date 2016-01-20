'use strict';

import React from 'react';
import { Link, IndexLink } from 'react-router';

import './normalize.css';
import styles from './styles.css';

export default class App extends React.Component {
  render() {
    return (
      <div className={ styles.wrapper }>
        <nav className={ styles.header }>
          <h1 className={ styles.logo }>
            <IndexLink to="/">rex demo</IndexLink>
          </h1>
          <ul className={ styles.menu }>
            <li><Link to="/about">About</Link></li>
            <li><a href="https://github.com/dmbch/rex">Github</a></li>
          </ul>
        </nav>
        { this.props.children }
      </div>
    );
  }
}

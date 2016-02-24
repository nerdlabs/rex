
import React, { Component, PropTypes } from 'react';

export default class Content extends Component {
  static propTypes = {
    title: PropTypes.string,
    body: PropTypes.string
  };
  render() {
    const { title, body } = this.props;
    return (
      <div>
        <hr />
          <h2>{ title }</h2>
          <p>{ body }</p>
        <hr />
      </div>
    );
  }
}

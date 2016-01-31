
import React, { Component } from 'react';

export default class Content extends Component {
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

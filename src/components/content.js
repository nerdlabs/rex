'use strict';

import React from 'react';

export default class Content extends React.Component {
  render() {
    return (
      <div>
        <hr />
          <h2>{ this.props.title }</h2>
          <p>{ this.props.body }</p>
        <hr />
      </div>
    );
  }
}

Content.propTypes = {
  title: React.PropTypes.string.isRequired,
  body: React.PropTypes.string.isRequired
};

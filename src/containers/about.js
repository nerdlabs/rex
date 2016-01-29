
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { selectAboutContent, fetchAboutContent } from '../reducers';
import { Content } from '../components';

@connect(selectAboutContent)
export default class About extends Component {
  static needs = [
    fetchAboutContent
  ];
  componentDidMount() {
    const { dispatch, content } = this.props;
    if (!Object.keys(content).length) {
      this.constructor.needs.map(need => dispatch(need()));
    }
  }
  render() {
    return (
      <Content { ...this.props.content } />
    );
  }
}

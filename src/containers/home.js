
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchHomeContent } from '../reducers';
import { Content } from '../components';

@connect(state => ({ content: state.content.home }))
export default class Home extends Component {
  static needs = [
    fetchHomeContent
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


import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchHomeContent } from '../reducers';
import { Content } from '../components';

@connect(state => ({ content: state.content.home }))
export default class Home extends Component {
  static needs = [
    fetchHomeContent
  ];
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    content: PropTypes.object
  };
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

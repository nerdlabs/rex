
import React from 'react';
import { connect } from 'react-redux';

import { fetchAboutContent } from '../actions';
import { Content } from '../components';

@connect(state => ({ content: state.content.about }))
export default class About extends React.Component {
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

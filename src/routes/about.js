'use strict';

import React from 'react';
import { connect } from 'react-redux';

import { fetchAboutContent } from '../actions';
import { Content } from '../components';

@connect(state => ({ content: state.content.about }))
export default class About extends React.Component {
  static fetchData(dispatch) {
    return dispatch(fetchAboutContent());
  }
  componentDidMount() {
    const { dispatch, content } = this.props;
    if (!content.title) {
      this.constructor.fetchData(dispatch);
    }
  }
  render() {
    return (
      <Content { ...this.props.content } />
    );
  }
}

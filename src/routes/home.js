
import React from 'react';
import { connect } from 'react-redux';

import { fetchHomeContent } from '../actions';
import { Content } from '../components';

@connect(state => ({ content: state.content.home }))
export default class Home extends React.Component {
  static fetchData(dispatch) {
    return dispatch(fetchHomeContent());
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

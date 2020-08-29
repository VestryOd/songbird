import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ErrorPage from '../ErrorPage';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  // static getDerivedStateFromError(error) {
  //   console.error('error page will rendered', error);
  //   return { hasError: true };
  // }

  componentDidCatch(error) {
    console.error('error catched', error);
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return (
        <h1>
          <ErrorPage />
        </h1>
      );
    }
    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

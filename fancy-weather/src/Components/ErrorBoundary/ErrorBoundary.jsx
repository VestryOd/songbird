import React, { Component } from 'react';
import { fatalError } from '../../common/vocabulary';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      lang: localStorage.getItem('fancyWeatherLang')
    };
  }

  logError = (error, errorInfo) => {
    console.error(error);
    console.table(errorInfo);
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.logError(error, errorInfo);
  }

  render() {
    const { lang, hasError } = this.state;
    if (hasError) {
      return <h1>{fatalError[lang]}</h1>;
    }

    return this.props.children;
  }
}

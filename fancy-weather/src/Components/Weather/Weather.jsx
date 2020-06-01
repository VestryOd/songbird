import React, { Component } from 'react';
import Header from '../Header/Header';
import './index.scss';

export default class Weather extends Component {
  render() {
    return (
      <div className="weather-container">
        <Header />
      </div>
    )
  }
}

import React, { Component } from 'react';
import Header from '../Header/Header';
import Today from '../Today/Today';
import spring from './img/spring.jpg';
import responce from './responce.json';
import './index.scss';

export default class Weather extends Component {
  componentWillMount() {
    if (!localStorage.fancyWeatherLang) {
      localStorage.setItem('fancyWeatherLang', 'en');
    }
  }
  render() {
    { console.log(responce)};
    
    let containerStyle = { backgroundImage: `url(${spring})` };
    let lang = localStorage.getItem('fancyWeatherLang');
    return (
      <div style={containerStyle} className="weather-container">
        <div className="weather-wrapper">
          <Header lang={lang}/>
          <div className="grid-wrapper">
            <Today data={responce.data}/>
          </div>
        </div>
      </div>
    );
  }
}

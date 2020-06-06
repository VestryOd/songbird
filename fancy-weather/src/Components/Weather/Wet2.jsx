import React, { Component } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Header from '../Header/Header';
import Today from '../Today/Today';
import Modal from '../Modal/Modal';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import defaultImages from './defaultImages';
import './index.scss';
import './animation.scss';
import weatherResponse from './responce.json';
import geoResponse from './geo-response.json';

import { initialCenterMap } from '../../common/constants';
// import {
//   getBackgroundUrl,
//   getCurrentLocation,
//   getWeatherByAddress,
//   getWeatherByCoords,
//   getSeason,
//   getGeolocation,
// } from '../../common/services';

const defaultState = {
  isLoading: false,
  error: null,
  currentLocation: initialCenterMap,
  place: null,
  geo: null,
  weather: null,
  backgroundUrl: '',
  lang: localStorage.getItem('fancyWeatherLang'),
  units: localStorage.getItem('fancyWeatherUnits'),
};

export default class Weather extends Component {
  state = defaultState;

  // componentWillMount() {
  //   if (!localStorage.fancyWeatherLang) {
  //     localStorage.setItem('fancyWeatherLang', 'en');
  //   }

  //   if (!localStorage.fancyWeatherUnits) {
  //     localStorage.setItem('fancyWeatherUnits', 'metric');
  //   }
  // }

  componentDidUpdate() {
    const { lang, units } = this.state;
    localStorage.setItem('fancyWeatherLang', lang.toLowerCase());
    localStorage.setItem('fancyWeatherUnits', units.toLowerCase());
  }

  componentDidMount() {
    if (!localStorage.fancyWeatherLang) {
      localStorage.setItem("fancyWeatherLang", "en");
    }

    if (!localStorage.fancyWeatherUnits) {
      localStorage.setItem("fancyWeatherUnits", "metric");
    }
    // this.fetchAll();
  };

  componentDidCatch(error) {
    this.setState({ error })
  };

  handleUnitsChange = units => this.setState({ units });

  handleLanguageChange = lang => this.setState({ lang });

  handleRefresh = () => {
    console.log('refresh');
    this.setState({
      isLoading: !this.isLoading
    });
  };

  handleError = (error) => this.setState({ error });

  handleAddressChange = place => console.log(place);

  render() {
    const { isLoading, lang, units, error, weather, geo } = this.state;
    return (
      <div>
        <div className="weather-container">
          <div className="weather-wrapper">
            <Header 
              lang={lang}
              units={units}
              isLoading={isLoading}
              onLangChange={this.handleLanguageChange}
              onRefresh={this.handleRefresh}
              onUnitsChange={this.handleUnitsChange}
              onAddressChange={this.handleAddressChange}
            />
            <div className="grid-wrapper">
              <Today weather={weatherResponse.data} geo={geoResponse.results} lang={lang}/>
            </div>
          </div>
        </div>
          {error && (
            <Modal classes={'error-modal'}>
              <ErrorMessage error={error} />
            </Modal>
          )}
        <TransitionGroup>
          {!isLoading && (
            <CSSTransition classNames="wallpaper" timeout={500}>
              <img className="background" src={defaultImages.spring} alt={''}/>
            </CSSTransition>
          )}
        </TransitionGroup>
      </div>
    );
  }
}

import React, { Component } from 'react';
import Header from '../Header/Header';
import Today from '../Today/Today';
import Loader from '../Loader/Loader';
import defaultImages from './defaultImages';
import responce from './responce.json';
import './index.scss';

import { initialCenterMap, Lang, Units } from '../../common/constants';
import {
  getBackgroundUrl,
  getCurrentLocation,
  getWeatherByAddress,
  getWeatherByCoords,
  getSeason,
  getGeolocation,
} from '../../common/services';

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

export const WeatherContext = React.createContext({
  store: defaultState,
});

export default class Weather extends Component {
  state = defaultState;

  componentWillMount() {
    if (!localStorage.fancyWeatherLang) {
      localStorage.setItem('fancyWeatherLang', 'en');
    }

    if (!localStorage.fancyWeatherUnits) {
      localStorage.setItem('fancyWeatherUnits', 'metric');
    }
  }

  componentDidUpdate() {
    const { lang } = this.state;
    localStorage.setItem('fancyWeatherLang', lang.toLowerCase());
  }

  componentDidMount() {
    this.fetchAll();
  };

  componentDidCatch(error) {
    this.setState({ error })
  };

  fetchAll = async (place) => {
    const { lang, units, currentLocation } = this.state;
    this.setState({ isLoading: true });
    
    try {
      const currentLocation = await getCurrentLocation();
      const getWeather = place
        ? getWeatherByAddress(place, { lang, units })
        : getWeatherByCoords(currentLocation, { lang, units });
      const [weather, backgroundUrl, geo] = await Promise.allSettled([
        getWeather,
        getBackgroundUrl(),
        getGeolocation(currentLocation, lang),
      ]);
      this.setState({ backgroundUrl, weather, currentLocation, geo });
      // console.log("data", { backgroundUrl, weather, currentLocation });
    } catch (error) {
      this.setState({ error });
      console.error(error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleLanguageChange = (lang) => this.setState({ lang }, () => this.fetchAll())

  handleUnitsChange = (units) => this.setState({ units }, () => this.fetchAll())

  handleAddressChange = (place) => this.setState({ place }, () => {
    const { place } = this.state
    if (place) {
      this.fetchAll(place)
    }
  })
  
  render() {
    const context = {
      store: this.state,
      onRefresh: this.fetchAll,
      onLangChange: this.handleLanguageChange,
      onUnitsChange: this.handleUnitsChange,
      onAddressChange: this.handleAddressChange,
    };

    const { backgroundUrl, isLoading, error } = this.state;
    console.log(this.state);

    if (backgroundUrl) {
      document.body.style.backgroundImage = `url(${backgroundUrl.value})`;
    } else {
      const season = getSeason().toLowerCase();
      document.body.style.backgroundImage = defaultImages[season];
    }

    const weatherData = this.state.weather ? this.state.weather.value.data : responce.data;
    return (
      <WeatherContext.Provider value={context}>
        <div className="weather-container">
          {isLoading && <Loader />}
          <div className="weather-wrapper">
            <Header />
            <div className="grid-wrapper">
              <Today data={weatherData}/>
            </div>
          </div>
        </div>
      </WeatherContext.Provider>
    );
  }
}

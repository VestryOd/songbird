import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Forecast from '../Forecast/Forecast';
import { checkTemperature } from '../../common/services';
import { weatherData, restText } from '../../common/vocabulary';
import moment from 'moment';
import './index.scss';
import icons from '../../common/weather-icons';

class Today extends Component {
  state ={
    clock: null,
    timerId: null,
    timezone: null,
  }

  // componentWillMount() {
  //   const { geo } = this.props;
  //   const timezone = geo[0].annotations.timezone.name;
  //   this.setState({
  //     timezone: timezone
  //   })
  // }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      const { timerId } = this.state;
      if (timerId) {
        clearInterval(timerId);
      }
    }

  }

  componentDidMount() {
    const { geo } = this.props;
    const timezone = geo.annotations.timezone.name;
    this.setState({
      timezone: timezone,
    });
    const { timerId } = this.state;
    if (!timerId) {
      const timerId = setInterval(() => {
        this.handleTick();
      }, 1000);
      this.saveClockId(timerId);
    }
  }

  handleTick = () => {
    const { timezone } = this.state;
    const date = new Date(
      new Date().toLocaleString("en-US", { timeZone: timezone })
    );
    this.setState({
      clock: moment(date).format("ddd D MMMM hh:mm:ss")
    })
  }

  saveClockId = (id) => {
    this.setState({
      timerId: id
    })
  }

  prepareWeather = (weather) => {
    const today = weather[0];
    const todayTemp = checkTemperature(today.temp);
    const todayWeatherIcon = icons[today.weather.icon];
    const wind = Math.round(today.wind_spd);
    const humidity = Math.round(today.rh);
    const feelsTemp = checkTemperature(Math.round((today.app_min_temp + today.app_max_temp) / 2));
    const forecast = [weather[1], weather[2], weather[3]];
    const { code } = today.weather;
    return { todayTemp, todayWeatherIcon, wind, humidity, feelsTemp, forecast, code}
  }
  
  render() {
    const { weather, lang, geo } = this.props;
    const { todayTemp, todayWeatherIcon, wind, humidity, feelsTemp, forecast, code } = this.prepareWeather(weather);
    const { formatted } = geo;
    
    const { clock } = this.state;
    return (
      <div className="today-wrapper">
        <div className="today-forecast">
          <div className="today-info--wrapper">
            <h1 className="place-title">{formatted}</h1>
            <h3 className="place-datetime">{clock}</h3>
          </div>
          <div className="today-weather-wrapper">
            <div className="today-temperature">
              <p className="info-details-text weather-temperature">{todayTemp}</p>
              <div className="description">
                <p className="info-details-text weather-type">{weatherData[lang][code]}</p>
              </div>
            </div>
            <div className="today-info">
              <div className="today-image--wrapper">
                <img src={todayWeatherIcon} alt={weatherData[lang][code]} />
              </div>
            </div>
          </div>

          <div className="today-details">
            <p className="info-details-text">{`${restText['feels'][lang]}: ${feelsTemp}`}</p>
            <p className="info-details-text">{`${restText['wind'][lang]}: ${wind} m/s`}</p>
            <p className="info-details-text">{`${restText['humidity'][lang]}: ${humidity}%`}</p>
          </div>
        </div>

        <Forecast forecast={forecast} lang={lang} />
      </div>
    )
  }
}

Today.propTypes = {
  lang: PropTypes.string,
  weather: PropTypes.array.isRequired,
  geo: PropTypes.object.isRequired,
}

Today.defaultProps = {
  lang: 'en',
  weather: [],
  geo: {},
}
export default Today;
import React from 'react';
import Forecast from '../Forecast/Forecast';
import { checkTemperature } from '../../common/services';
import { weekday, months, weatherData, placeholder, restText, location } from '../../common/vocabulary';
import './index.scss';
import icons from '../../common/weather-icons';

export default function Today(props) {
  const { data } = props;
  const today = data[0];
  const temp = checkTemperature(today.temp);
  const icon = icons[today.weather.icon];
  const { description } = today.weather;
  const wind = Math.round(today.wind_spd);
  const humidity = Math.round(today.rh);
  const feelsTemp = checkTemperature(Math.round((today.app_min_temp + today.app_max_temp) / 2));
  const forecast = [data[1], data[2], data[3]];
  const lang = localStorage.getItem('fancyWeatherLang');
  const { code } = today.weather;
  return (
    <div className="today-wrapper">
      <div className="today-forecast">
        <div className="today-info--wrapper">
          <h1 className="place-title">{'Odessa, Ukraine'}</h1>
          <h3 className="place-datetime">{'Tue 2 June 16:58'}</h3>
        </div>
        <div className="today-weather-wrapper">
          <div className="today-temperature">
            <p className="info-details-text weather-temperature">{temp}</p>
            <div className="description">
              <p className="info-details-text weather-type">{weatherData[lang][code]}</p>
            </div>
          </div>
          <div className="today-info">
            <div className="today-image--wrapper">
              <img src={icon} alt={weatherData[lang][code]} />
            </div>
          </div>
        </div>
        
        <div className="today-details">
          <p className="info-details-text">{`${restText['feels'][lang]}: ${feelsTemp}`}</p>
          <p className="info-details-text">{`${restText['wind'][lang]}: ${wind} m/s`}</p>
          <p className="info-details-text">{`${restText['humidity'][lang]}: ${humidity}%`}</p>
        </div>
      </div>
      
      <Forecast forecast={forecast} />
    </div>
  )
}

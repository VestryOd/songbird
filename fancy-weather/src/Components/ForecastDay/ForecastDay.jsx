import React from 'react';
import { checkTemperature } from '../../common/services';
import icons from '../../common/weather-icons';
import { weekday } from '../../common/vocabulary';
import moment from 'moment';
import './index.scss';

export default function ForecastDay(props) {
  const { data } = props;
  const day = data;
  const temp = checkTemperature(day.temp);
  const icon = icons[day.weather.icon];
  let lang = localStorage.getItem('fancyWeatherLang');
  const dayNumber = moment(day.valid_date).weekday();

  return (
    <div className="forecast-item">
      <h4 className="forecast-day">{weekday[lang][dayNumber]}</h4>
      <div className="forecast-weather">
        <div className="forecast-temperature">
          <p>{temp}</p>
        </div>
        <div className="forecast-icon">
          <img src={icon} alt="sunny" />
        </div>
      </div>
    </div>
  )
}

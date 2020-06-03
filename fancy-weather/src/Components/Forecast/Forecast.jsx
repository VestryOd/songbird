import React from 'react';
import ForecastDay from '../ForecastDay/ForecastDay';
import './index.scss';

export default function Forecast(props) {
  const { forecast } = props;
  console.log(forecast);
  return (
    <div className="forecast-wrapper">
      {
        forecast.map((el, i) => <ForecastDay key={i} data={el} />)
      }
    </div>
  )
}

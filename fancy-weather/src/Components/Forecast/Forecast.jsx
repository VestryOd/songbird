import React from 'react';
import PropTypes from 'prop-types';
import ForecastDay from '../ForecastDay/ForecastDay';
import './index.scss';

const Forecast = (props) => {
  const { forecast, lang } = props;
  return (
    <div className="forecast-wrapper">
      {
        forecast.map((el, i) => <ForecastDay key={i} data={el} lang={lang}/>)
      }
    </div>
  )
}

Forecast.propTypes = {
  lang: PropTypes.string,
  forecast: PropTypes.array.isRequired,
}

Forecast.defaultProps = {
  lang: 'en',
  forecast: [],
}

export default Forecast;
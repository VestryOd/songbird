import React from 'react';
import PropTypes from 'prop-types';
import ForecastDay from '../ForecastDay';
import { defaultState } from '../../common/constants';
import style from './Forecast.module.scss';

const Forecast = ({ forecast, lang, units }) => {
  return (
    <div className={style['forecast-wrapper']}>
      {
        forecast.map((el, i) => <ForecastDay key={i} data={el} lang={lang} units={units} />)
      }
    </div>
  )
}

Forecast.propTypes = {
  lang: PropTypes.string,
  units: PropTypes.string.isRequired,
  forecast: PropTypes.array.isRequired,
}

Forecast.defaultProps = {
  lang: defaultState.lang,
  units: defaultState.units,
  forecast: [],
}

export default Forecast;
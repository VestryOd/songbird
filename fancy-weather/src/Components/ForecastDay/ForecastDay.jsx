import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { checkTemperature } from '../../common/services';
import { defaultState } from '../../common/constants';
import icons from '../../common/weather-icons';
import { weekday } from '../../common/vocabulary';
import style from './ForecastDay.module.scss';

const ForecastDay = ({ data, lang, units }) => {
  const temp = checkTemperature(data.temp, units);
  const icon = icons[data.weather.icon];
  const dayNumber = moment(data.valid_date).weekday();

  return (
    <div className={style['forecast-item']}>
      <h4 className={style['forecast-day']}>{weekday[lang][dayNumber]}</h4>
      <div className={style['forecast-weather']}>
        <div className={style['forecast-temperature']}>
          <p>{temp}</p>
        </div>
        <div className={style['forecast-icon']}>
          <img src={icon} alt="sunny" />
        </div>
      </div>
    </div>
  );
};

ForecastDay.propTypes = {
  lang: PropTypes.string,
  units: PropTypes.string.isRequired,
  forecast: PropTypes.object.isRequired,
};

ForecastDay.defaultProps = {
  lang: defaultState.lang,
  units: defaultState.units,
  forecast: {},
};

export default ForecastDay;

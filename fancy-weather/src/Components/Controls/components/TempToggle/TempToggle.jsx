import React from 'react';
import PropTypes from 'prop-types';
import { defaultState } from '../../../../common/constants';
import style from './TempToggle.module.scss';

const TempToggle = ({ units, onUnitsChange }) => {
  const handleUnitsChange = ({ target: { checked } }) => {
    const newUnits = checked ? 'fahrenheit' : 'metric';
    if (units !== newUnits) {
      onUnitsChange(newUnits);
    }
  };

  return (
    <div className={style['button-toggler']}>
      <input
        type="checkbox"
        className={style.checkbox}
        onClick={handleUnitsChange}
      />
      <div className={style.knobs}>
        <span>°C</span>
      </div>
      <div className={style.layer}></div>
    </div>
  );
};

TempToggle.propTypes = {
  units: PropTypes.string,
  onUnitsChange: PropTypes.func.isRequired,
};

TempToggle.defaultProps = {
  units: defaultState.units,
  onUnitsChange: () => { },
};

export default TempToggle;

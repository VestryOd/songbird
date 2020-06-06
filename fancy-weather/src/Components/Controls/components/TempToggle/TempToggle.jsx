import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';

const TempToggle = ({ units, onUnitsChange }) => {

  const handleUnitsChange = ({ target: { checked } }) => {
    console.log(checked);
    const newUnits = checked ? 'fahrenheit' : 'metric';
    console.log('units', units, 'newUnits', newUnits);
    if (units !== newUnits) {
      onUnitsChange(newUnits);
    }
  };

  return (
    <div className="button-toggler">
      <input type="checkbox" className="checkbox" onClick={handleUnitsChange}/>
      <div className="knobs"><span>°C</span></div>
      <div className="layer"></div>
    </div>
  )
}

TempToggle.propTypes = {
  units: PropTypes.string,
  onUnitsChange: PropTypes.func.isRequired,
}

TempToggle.defaultProps = {
  units: 'metric',
  onUnitsChange: () => { },
}

export default TempToggle;
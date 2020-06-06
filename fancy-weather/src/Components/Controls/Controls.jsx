import React from 'react';
import PropTypes from 'prop-types';
import LanguageSelect from './components/LanguageSelect/LanguageSelect';
import RefreshButton from './components/RefreshButton/RefreshButton';
import TempToggle from './components/TempToggle/TempToggle';

import './index.scss';

const Controls = ({ lang, onLangChange, onRefresh, onUnitsChange, isLoading, units }) => {
  return (
    <div className='controls-container'>
      <RefreshButton onRefresh={onRefresh} isLoading={isLoading}/>
      <LanguageSelect lang={lang} onLangChange={onLangChange}/>
      <TempToggle onUnitsChange={onUnitsChange} units={units}/>
    </div>
  );
}

Controls.propTypes = {
  lang: PropTypes.string,
  units: PropTypes.string,
  isLoading: PropTypes.bool,
  onLangChange: PropTypes.func.isRequired,
  onRefresh: PropTypes.func.isRequired,
  onUnitsChange: PropTypes.func.isRequired,
};

Controls.defaultProps = {
  lang: "en",
  units: 'metric',
  isLoading: false,
  onLangChange: () => { },
  onRefresh: () => { },
  onUnitsChange: () => { },
};

export default Controls;
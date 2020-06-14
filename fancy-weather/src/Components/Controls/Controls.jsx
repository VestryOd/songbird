import React from 'react';
import PropTypes from 'prop-types';
import LanguageSelect from './components/LanguageSelect';
import RefreshButton from './components/RefreshButton';
import TempToggle from './components/TempToggle';
import { defaultState } from '../../common/constants';

import style from './Controls.module.scss';

const Controls = ({
  lang, onLangChange, onRefresh, onUnitsChange, isLoading, units,
}) => {
  return (
    <div className={style['controls-container']}>
      <RefreshButton onRefresh={onRefresh} isLoading={isLoading} />
      <LanguageSelect lang={lang} onLangChange={onLangChange} />
      <TempToggle onUnitsChange={onUnitsChange} units={units} />
    </div>
  );
};

Controls.propTypes = {
  lang: PropTypes.string,
  units: PropTypes.string,
  isLoading: PropTypes.bool,
  onLangChange: PropTypes.func.isRequired,
  onRefresh: PropTypes.func.isRequired,
  onUnitsChange: PropTypes.func.isRequired,
};

Controls.defaultProps = {
  lang: defaultState.lang,
  units: defaultState.units,
  isLoading: defaultState.isLoading,
  onLangChange: () => { },
  onRefresh: () => { },
  onUnitsChange: () => { },
};

export default Controls;

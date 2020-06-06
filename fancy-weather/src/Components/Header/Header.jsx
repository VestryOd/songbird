import React from 'react';
import PropTypes from 'prop-types';
import Controls from '../Controls/Controls';
import Search from '../Search/Search';
import './index.scss';

const Header = ({ lang, onLangChange, onRefresh, onUnitsChange, isLoading, onAddressChange, units }) => {
  return (
    <div className="header-wrapper">
      <Controls
        lang={lang}
        units={units}
        isLoading={isLoading}
        onLangChange={onLangChange}
        onRefresh={onRefresh}
        onUnitsChange={onUnitsChange}
      />
      <Search
        lang={lang}
        onAddressChange={onAddressChange}
        isLoading={isLoading}
      />
    </div>
  );
}

Header.propTypes = {
  lang: PropTypes.string,
  units: PropTypes.string,
  isLoading: PropTypes.bool,
  onLangChange: PropTypes.func.isRequired,
  onRefresh: PropTypes.func.isRequired,
  onUnitsChange: PropTypes.func.isRequired,
  onAddressChange: PropTypes.func.isRequired,
};

Header.defaultProps = {
  lang: 'en',
  units: 'metric',
  isLoading: false,
  onLangChange: () => { },
  onRefresh: () => { },
  onUnitsChange: () => { },
  onAddressChange: () => { },
};

export default Header;
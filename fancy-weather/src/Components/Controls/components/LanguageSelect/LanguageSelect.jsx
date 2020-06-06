import React from 'react';
import PropTypes from 'prop-types';

import './index.scss';
import { Lang } from '../../../../common/constants';

const LanguageSelect = ({ lang, onLangChange }) => {

  const handleLangChange = ({ target: { value } }) =>
    onLangChange(value.toLowerCase());

  return (
    <select className="controls-ui language-select" id="language" value={lang.toLowerCase()} onChange={handleLangChange}>
      {Object.keys(Lang).map((key) => {
        return <option key={key} value={key}>{Lang[key]}</option>
      })}
    </select>
  );
};

LanguageSelect.propTypes = {
  lang: PropTypes.string,
  onLangChange: PropTypes.func.isRequired,
};

LanguageSelect.defaultProps = {
  lang: "en",
  onLangChange: () => { },
};

export default LanguageSelect;
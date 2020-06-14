import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { defaultState, Lang } from '../../../../common/constants';

import style from './LanguageSelect.module.scss';

const LanguageSelect = ({ lang, onLangChange }) => {
  const handleLangChange = ({ target: { value } }) => onLangChange(value.toLowerCase());

  return (
    <select
      className={classNames(style['controls-ui'], style['language-select'])}
      id="language"
      value={lang.toLowerCase()}
      onChange={handleLangChange}
    >
      {Object.keys(Lang).map((key) => {
        return (
          <option key={key} value={key}>
            {Lang[key]}
          </option>
        );
      })}
    </select>
  );
};

LanguageSelect.propTypes = {
  lang: PropTypes.string,
  onLangChange: PropTypes.func.isRequired,
};

LanguageSelect.defaultProps = {
  lang: defaultState.lang,
  onLangChange: () => { },
};

export default LanguageSelect;

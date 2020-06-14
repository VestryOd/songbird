import React from 'react';
import { noResults } from '../../common/vocabulary';
import { defaultState } from '../../common/constants';
import PropTypes from 'prop-types';
import style from './ErrorModal.module.scss';
import classNames from 'classnames';

const ErrorModal = ({ lang, isShowError, message }) => {
  const styles = classNames(style.wrapper, { [style.show]: isShowError })
  return (
    <div className={styles}>
      <div className={style.content}>
        <div className={style.icon} />
        <div className={style.message}>
          <h3>{message ? message : noResults[lang]}</h3>
        </div>
      </div>
    </div>
  )
}

ErrorModal.prototype = {
  lang: PropTypes.string,
  isShowError: PropTypes.bool,
  error: PropTypes.string,
}

ErrorModal.defaultProps = {
  lang: defaultState.lang,
  isShowError: defaultState.isShowError,
}
export default ErrorModal; 
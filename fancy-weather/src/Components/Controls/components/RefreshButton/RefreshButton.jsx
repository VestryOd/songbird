import React from 'react';
import PropTypes from "prop-types";
import classNames from 'classnames';
import { defaultState } from '../../../../common/constants';
import style from './RefreshButton.module.scss';

const RefreshButton = ({ isLoading, onRefresh }) => {
  const rotate = !isLoading
    ? {}
    : {
      transform: "rotate(360deg)",
      transition: "transform 0.5s ease-in",
    };
  return (
    <button
      className={classNames(style['button-ui'], style['refresh'])}
      onClick={() => onRefresh()}
    >
      <span className={style['refresh-icon']} style={rotate}></span>
    </button>
  );
};

RefreshButton.propTypes = {
  isLoading: PropTypes.bool,
  onRefresh: PropTypes.func.isRequired,
};

RefreshButton.defaultProps = {
  isLoading: defaultState.isLoading,
  onRefresh: () => { },
};

export default RefreshButton;
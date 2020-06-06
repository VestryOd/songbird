import React from 'react';
import PropTypes from "prop-types";
import './index.scss';

const RefreshButton = ({ isLoading, onRefresh }) => {
  const rotate = !isLoading
    ? {}
    : {
      transform: "rotate(360deg)",
      transition: "transform 0.5s ease-in",
    };
  return (
    <button className="button-ui refresh" onClick={() => onRefresh()}>
      <span className="refresh-icon" style={rotate}></span>
    </button>
  );
};

RefreshButton.propTypes = {
  isLoading: PropTypes.bool,
  onRefresh: PropTypes.func.isRequired,
};

RefreshButton.defaultProps = {
  isLoading: false,
  onRefresh: () => { },
};

export default RefreshButton;
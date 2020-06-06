import React from 'react';
import PropTypes from "prop-types";
import { defaultError } from '../../common/vocabulary';
import './index.scss';
const lang = localStorage.getItem('fancyWeatherLang');

const ErrorMessage = ({ error, message }) => {

return (
    <div className="error-wrapper">
      {error && (
      <div className="error-content">
        <h3 className="error-title">{error.name}</h3>
        {/* <p className="error-description">{error.message}</p> */}
        <p className="error-message">{message}</p>
      </div>
      )}
      {/* {message && (
        <div>
          <p className="message">{message}</p>
        </div>
      )} */}
    </div>
  )
}

ErrorMessage.propTypes = {
  error: PropTypes.instanceOf(Error),
  message: PropTypes.string,
}

ErrorMessage.defaultProps = {
  message: defaultError[lang],
}
export default ErrorMessage;
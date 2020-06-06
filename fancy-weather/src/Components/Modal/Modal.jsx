import React from 'react';
import PropTypes from "prop-types";
import './index.scss';

const Modal = (props) => {
  const { classes } = props;
  return (
    <div className={`modal-wrapper ${classes}`}>
      {props.children}
    </div>
  )
}

Modal.propTypes = {
  classes: PropTypes.string,
}

Modal.defaultProps = {
  classes: 'default-modal',
}

export default Modal;

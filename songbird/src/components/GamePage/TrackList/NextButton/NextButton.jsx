import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import style from './NextButton.module.scss';
import { nextButton } from '../../../../assets/text-data';

const NextButton = ({ isGuessed, onGroupChange, onGuessed }) => {
  const handleNext = () => {
    onGroupChange(1);
    onGuessed(false);
  };

  const { unguessed } = style;
  const buttonClasses = `${style.next} ${!isGuessed ? unguessed : null}`;

  return (
    <div className={style.wrapper}>
      <button className={buttonClasses} disabled={!isGuessed} onClick={handleNext}>
        {nextButton.ru}
      </button>
    </div>
  );
};

NextButton.propTypes = {
  isGuessed: PropTypes.bool,
  onGroupChange: PropTypes.func,
  onGuessed: PropTypes.func,
};

export default NextButton;

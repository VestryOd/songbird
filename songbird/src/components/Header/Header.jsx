import React from 'react';
import PropTypes from 'prop-types';
import { score } from '../../assets/text-data';
import style from './Header.module.scss';

const Header = ({ isPlaying, scorePoints = 0 }) => (
  <div className={style.wrapper}>
    <div className={style.logo}></div>
    {isPlaying && <div className={style.score}>{`${score.ru}: ${scorePoints}`}</div>}
  </div>
);

Header.propTypes = {
  scorePoints: PropTypes.number.isRequired,
  isPlaying: PropTypes.bool.isRequired,
};

export default Header;

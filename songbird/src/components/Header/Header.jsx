import React from 'react';
import PropTypes from 'prop-types';
import { score } from '../../assets/text-data';
import style from './Header.module.scss';

const Header = ({ scorePoints = 0 }) => (
  <div className={style.wrapper}>
    <div className={style.logo}></div>
    <div className={style.score}>{`${score.ru}: ${scorePoints}`}</div>
  </div>
);

Header.propTypes = {
  scorePoints: PropTypes.number.isRequired,
};

export default Header;

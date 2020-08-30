import React from 'react';
import PropTypes from 'prop-types';
import style from './ResultsPage.module.scss';

const ResultsPage = ({ gender, name, score }) => {
  console.log(gender, name, score);
  return (
    <div className={style.wrapper}>
      <h1>This is result</h1>
    </div>
  );
};

ResultsPage.propTypes = {
  gender: PropTypes.string,
  name: PropTypes.string,
  score: PropTypes.number,
};

export default ResultsPage;

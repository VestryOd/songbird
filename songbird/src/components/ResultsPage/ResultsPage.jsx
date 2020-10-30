import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import style from './ResultsPage.module.scss';
import { defineAge, getAvatarImage, prepareTitle, getResultsStatus } from '../../helpers/services';
import avatars from '../../assets/avatars';
import calculate from './calculate.gif';
import { resultPage } from '../../assets/text-data';

const ResultsPage = ({ userData: { gender, name }, scoreSets, score }) => {
  const [isCalculated, setIsCalculated] = useState(false);

  const { title, calculateLabel, ageLabel, status, buttonLabel } = resultPage.ru;
  const preparedTitle = prepareTitle(title, name, score);

  const age = defineAge(scoreSets);
  const avatar = getAvatarImage(gender, age, avatars);
  console.log(avatar, avatars);
  const preparedStatus = getResultsStatus(gender, age, status);

  const mainOutput = !isCalculated ? (
    <div className={style.result}>
      <h3 className={style['calculate-label']}>{calculateLabel}</h3>
      <div className={style.calculate}>
        <img src={calculate} alt="" />
      </div>
    </div>
  ) : (
    <div className={style.result}>
      <p className={style['age-label']}>
        {ageLabel}
        <span className={style.age}>{age}</span>
      </p>
      <img className={style.avatar} src={avatar} alt={preparedStatus} />
      <p className={style.status}>{`Статус: ${preparedStatus}`}</p>
      <button className={style.again}>{buttonLabel}</button>
    </div>
  );
  return (
    <div className={style.wrapper}>
      <h1 className={style.title}>{preparedTitle}</h1>
      {mainOutput}
    </div>
  );
};

ResultsPage.propTypes = {
  userData: PropTypes.object,
  scoreSets: PropTypes.array,
  score: PropTypes.number,
};

export default ResultsPage;

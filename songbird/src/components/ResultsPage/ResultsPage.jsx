import React, { useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import style from './ResultsPage.module.scss';
import { defineAge, getAvatarImage, prepareTitle, getResultsStatus } from '../../helpers/services';
import avatars from '../../assets/avatars';
import calculate from './calculate.gif';
import { resultPage } from '../../assets/text-data';

const ResultsPage = ({ userData: { gender, name }, scoreSets, score, onGameAgain }) => {
  const [isCalculated, setIsCalculated] = useState(false);

  const { title, calculateLabel, ageLabel, status, buttonLabel } = resultPage.ru;
  const preparedTitle = useMemo(() => prepareTitle(title, name, score), [title, name, score]);

  const age = useMemo(() => defineAge(scoreSets), [scoreSets]);
  const avatar = useMemo(() => getAvatarImage(gender, age, avatars), [gender, age]);
  const preparedStatus = useMemo(() => getResultsStatus(gender, age, status), [gender, age, status]);
  const logger = useCallback(() => {
    console.log(age, avatar, preparedStatus);
  }, [age, avatar, preparedStatus]);

  logger();

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
      <button className={style.again} onClick={onGameAgain}>
        {buttonLabel}
      </button>
    </div>
  );

  setTimeout(() => {
    setIsCalculated(true);
  }, 3000);

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
  onGameAgain: PropTypes.func,
};

export default ResultsPage;

import React, { useState, useEffect } from 'react';
import style from './App.module.scss';
import Header from '../Header';
import moviesData from '../../assets/films/movies';
import quotesData from '../../assets/films/quotes';
import WelcomePage from '../WelcomePage';
import GamePage from '../GamePage';
import prepareAllData from '../../assets/films';
import ResultsPage from '../ResultsPage';

const initialUserData = Object.freeze({
  gender: '',
  name: '',
});

const dataSets = prepareAllData(moviesData, quotesData);

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [userData, setUserData] = useState(initialUserData);
  const [isFinish, setIsFinish] = useState(false);
  const [groupCount, setGroupCount] = useState(0);
  const [score, setScore] = useState(0);
  const [scoreSets, setScoreSets] = useState([]);

  const onUserDataChange = (target) => {
    const { gender, name } = target;
    setUserData({
      gender: gender.value,
      name: name.value,
    });
    setIsPlaying(true);
  };

  const onScoreChange = (value) => {
    const newValue = value < 0 ? 0 : value;
    setScore((prevScore) => prevScore + newValue);
    const newScoreSets = [...scoreSets];
    newScoreSets[groupCount] = value;
    setScoreSets(newScoreSets);
  };

  const onGroupChange = () => {
    setGroupCount((prevGroup) => prevGroup + 1);
  };

  useEffect(() => {
    if (groupCount === 3) {
      setIsFinish(true);
    }
  }, [groupCount]);

  let mainOutput = null;

  if (isFinish) {
    mainOutput = <ResultsPage userData={userData} scoreSets={scoreSets} score={score} />;
  }

  mainOutput = !isPlaying ? (
    <WelcomePage onUserDataChange={onUserDataChange} />
  ) : (
    <GamePage dataSets={dataSets} groupCount={groupCount} onScoreChange={onScoreChange} onGroupChange={onGroupChange} />
  );

  return (
    <div className={style.app}>
      <div className={style.container}>
        <Header scorePoints={score} />
        {mainOutput}
      </div>
      <div className={style.bg}></div>
    </div>
  );
}

export default App;

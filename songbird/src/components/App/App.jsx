import React, { useState } from 'react';
import style from './App.module.scss';
import Header from '../Header';
import moviesData from '../../assets/films/movies';
import quotesData from '../../assets/films/quotes';
import WelcomePage from '../WelcomePage';
import GamePage from '../GamePage';
import prepareAllData from '../../assets/films';

const initialUserData = Object.freeze({
  gender: '',
  name: '',
});

const dataSets = prepareAllData(moviesData, quotesData);

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [userData, setUserData] = useState(initialUserData);
  const [groupCount, setGroupCount] = useState(0);
  const [score, setScore] = useState(0);

  const onUserDataChange = (target) => {
    const { gender, name } = target;
    setUserData({
      gender: gender.value,
      name: name.value,
    });
    setIsPlaying(true);
  };

  const onScoreChange = (value) => {
    setScore((prevScore) => prevScore + value);
  };

  const onGroupChange = () => {
    setGroupCount((prevGroup) => prevGroup + 1);
  };

  // const mainOutput = !isPlaying ? (
  //   <WelcomePage onUserDataChange={onUserDataChange} />
  // ) : (
  //   <GamePage />
  // );

  const mainOutput = (
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

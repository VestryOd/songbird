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
  const [errorCount, setErrorCount] = useState(0);

  const handleUserDataChange = (target) => {
    const { gender, name } = target;
    setUserData({
      gender: gender.value,
      name: name.value,
    });
    setIsPlaying(true);
  };

  // const mainOutput = !isPlaying ? (
  //   <WelcomePage onUserDataChange={handleUserDataChange} />
  // ) : (
  //   <GamePage />
  // );

  const mainOutput = <GamePage dataSets={dataSets} groupCount={groupCount} />;
  return (
    <div className={style.app}>
      <div className={style.container}>
        <Header scorePoints={0} />
        {mainOutput}
      </div>
      <div className={style.bg}></div>
    </div>
  );
}

export default App;

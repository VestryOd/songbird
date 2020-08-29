import React, { useState } from 'react';
import style from './App.module.scss';
import Header from '../Header';
import WelcomePage from '../WelcomePage';

const initialUserData = Object.freeze({
  gender: '',
  name: '',
});

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [userData, setUserData] = useState(initialUserData);

  const handleUserDataChange = (target) => {
    const { gender, name } = target;
    setUserData({
      gender: gender.value,
      name: name.value,
    });
    setIsPlaying(true);
  };

  const mainOutput = !isPlaying ? (
    <WelcomePage onUserDataChange={handleUserDataChange} />
  ) : (
    2
  );
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

import React, { useState } from 'react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
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

const initSets = prepareAllData(moviesData, quotesData);

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [userData, setUserData] = useState(initialUserData);
  const [groupCount, setGroupCount] = useState(0);
  const [score, setScore] = useState(0);
  const [scoreSets, setScoreSets] = useState([]);
  const [dataSets, setDataSets] = useState(initSets);

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

  const onGameAgain = () => {
    setUserData(initialUserData);
    setIsPlaying(false);
    setGroupCount(0);
    setScore(0);
    setScoreSets([]);
    const newSets = prepareAllData(moviesData, quotesData);
    setDataSets(newSets);
  };

  let mainOutput = null;
  let mainKey = null;

  if (groupCount < 4) {
    mainKey = !isPlaying ? 'welcomepage' : `gamepage-${groupCount}`;
    mainOutput = !isPlaying ? (
      <WelcomePage key={'welcomepage'} onUserDataChange={onUserDataChange} />
    ) : (
      <GamePage
        key={'gamepage'}
        dataSets={dataSets}
        groupCount={groupCount}
        onScoreChange={onScoreChange}
        onGroupChange={onGroupChange}
      />
    );
  } else {
    mainKey = 'resultspage';
    mainOutput = (
      <ResultsPage
        key={'resultspage'}
        userData={userData}
        scoreSets={scoreSets}
        score={score}
        onGameAgain={onGameAgain}
      />
    );
  }

  return (
    <div className={style.app}>
      <div className={style.container}>
        <Header scorePoints={score} isPlaying={isPlaying} />
        <SwitchTransition mode={'out-in'}>
          <CSSTransition
            key={mainKey}
            enter={true}
            addEndListener={(node, done) => node.addEventListener('transitionend', done, false)}
            classNames={{
              enter: style.transitionEnter,
              enterActive: style.transitionEnterActive,
              exit: style.transitionExit,
              exitActive: style.transitionExitActive,
            }}
          >
            <div>{mainOutput}</div>
          </CSSTransition>
        </SwitchTransition>
      </div>
      <div className={style.bg}></div>
    </div>
  );
}

export default App;

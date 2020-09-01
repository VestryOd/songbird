import React, { useState } from 'react';
import PropTypes from 'prop-types';
import style from './GamePage.module.scss';
import GameHeader from './GameHeader';
import CurrentAudio from './CurrentAudio';
import TrackList from './TrackList';
import audios from '../../assets/audios';
import posters from '../../assets/posters';

const GamePage = ({ dataSets, groupCount, onScoreChange, onGroupChange }) => {
  const [isGuessed, setIsGuessed] = useState(false);

  const onGuessed = (value) => {
    setIsGuessed(value);
  };

  const { filmsData, gameDataSets } = dataSets;
  const current = gameDataSets[groupCount];
  console.log(current);
  const { nameRu, nameEn } = current?.currentFilm;
  const { filmId, name } = current?.currentAudio;
  return (
    <div className={style.wrapper}>
      {gameDataSets && (
        <>
          <GameHeader categories={gameDataSets} groupCount={groupCount} />
          <div className={style.game}>
            <CurrentAudio audio={audios[name]} nameRu={nameRu} poster={posters[nameEn]} isGuessed={isGuessed} />
            <TrackList
              filmsData={filmsData}
              tracks={current.data}
              gussedTrackId={filmId}
              onScoreChange={onScoreChange}
              onGroupChange={onGroupChange}
              isGuessed={isGuessed}
              onGuessed={onGuessed}
            />
          </div>
        </>
      )}
    </div>
  );
};

GamePage.propTypes = {
  dataSets: PropTypes.object,
  groupCount: PropTypes.number,
  onScoreChange: PropTypes.func,
  onGroupChange: PropTypes.func,
};

export default GamePage;

import React from 'react';
import PropTypes from 'prop-types';
import style from './GamePage.module.scss';
import GameHeader from './GameHeader';
import CurrentAudio from './CurrentAudio';
import TrackList from './TrackList';
import audios from '../../assets/audios';
import posters from '../../assets/posters';

const GamePage = ({ dataSets, groupCount }) => {
  const { filmsData, gameDataSets } = dataSets;
  const current = gameDataSets[groupCount];
  const { nameRu, nameEn } = current?.currentFilm;
  const { name } = current?.currentAudio;
  return (
    <div className={style.wrapper}>
      {gameDataSets && (
        <>
          <GameHeader categories={gameDataSets} groupCount={groupCount} />
          <div className={style.game}>
            <CurrentAudio audio={audios[name]} nameRu={nameRu} poster={posters[nameEn]} isGuessed={false} />
            <TrackList filmsData={filmsData} tracks={current.data} />
          </div>
        </>
      )}
    </div>
  );
};

GamePage.propTypes = {
  dataSets: PropTypes.object,
  groupCount: PropTypes.number,
};

export default GamePage;

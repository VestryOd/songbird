import React, { useState } from 'react';
import PropTypes from 'prop-types';
import style from './TrackList.module.scss';
import Player from '../Player';
import posters from '../../../assets/posters';
import audios from '../../../assets/audios';
import { noTrackChoised } from '../../../assets/text-data';

const Details = ({ film, name }) => {
  const { nameEn, nameRu } = film;
  return (
    <>
      <div className={style.poster}>
        <img src={posters[nameEn]} alt={nameRu} />
      </div>
      <div className={style.track}>
        <h3 className={style.title}>{nameRu}</h3>
        <Player isPlaying={false} audio={audios[name]} />
      </div>
    </>
  );
};

const TrackList = ({ filmsData, tracks, gussedTrackId }) => {
  const [current, setCurrent] = useState(null);
  const handleTrackClick = (name) => {
    console.log(name);
  };

  const trackList = tracks.map((item, idx) => {
    const { filmId, name } = item;
    const { nameRu } = filmsData[filmId];
    return (
      <div key={`${filmId}-${idx}`} className={style.item} onClick={() => handleTrackClick(name)}>
        <span className={style.marker}>●</span>
        <span>{nameRu}</span>
      </div>
    );
  });

  const details = noTrackChoised.ru;
  // const details = !current ? noTrackChoised : null;

  return (
    <div className={style.wrapper}>
      <div className={style.tracks}>
        <ul className={style.list}>{trackList}</ul>
      </div>
      <div className={style.details}>{details}</div>
    </div>
  );
};

TrackList.propTypes = {
  filmsData: PropTypes.object,
  tracks: PropTypes.array,
  gussedTrackId: PropTypes.number,
};

Details.propTypes = {
  film: PropTypes.object,
  name: PropTypes.string,
};

export default TrackList;

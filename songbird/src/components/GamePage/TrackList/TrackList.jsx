import React, { useState } from 'react';
import PropTypes from 'prop-types';
import style from './TrackList.module.scss';
import Details from './Details';
import { noTrackChoised } from '../../../assets/text-data';

const TrackList = ({ filmsData, tracks, gussedTrackId, onScoreChange, onGroupChange }) => {
  const [current, setCurrent] = useState(null);
  const [score, setScore] = useState(5);
  const [isGuessed, setIsGuessed] = useState(false);

  const handleTrackClick = (item) => {
    const { filmId, name } = item;
    console.log(filmId);
    setCurrent({
      film: filmsData[filmId],
      name,
    });
    if (gussedTrackId === filmId) {
      setIsGuessed(true);
      onScoreChange(score);
      onGroupChange(1);
    } else {
      setScore((prevScore) => prevScore - 1);
    }
  };

  const trackList = tracks.map((item, idx) => {
    const { filmId } = item;
    const { nameRu } = filmsData[filmId];
    return (
      <li key={`${filmId}-${idx}`} className={style.item} onClick={() => handleTrackClick(item)}>
        <span className={style.marker}>●</span>
        <span className={style.name}>{nameRu}</span>
      </li>
    );
  });

  const noDetails = <span>{noTrackChoised.ru}</span>;
  const details = !current ? noDetails : <Details {...current} />;

  return (
    <div className={style.wrapper}>
      <div className={style.tracks}>
        <ul className={style.list}>{trackList}</ul>
      </div>
      <div className={style.details}>
        <div className={style.inner}>{details}</div>
      </div>
    </div>
  );
};

TrackList.propTypes = {
  filmsData: PropTypes.object,
  tracks: PropTypes.array,
  gussedTrackId: PropTypes.number,
  onScoreChange: PropTypes.func,
  onGroupChange: PropTypes.func,
};

export default TrackList;

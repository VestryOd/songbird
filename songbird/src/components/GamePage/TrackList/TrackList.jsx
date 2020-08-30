import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import style from './TrackList.module.scss';
import Details from './Details';
import NextButton from './NextButton';
import { noTrackChoised } from '../../../assets/text-data';
import { playAudio, generateTracksStyles } from '../../../helpers/services';
import success from './audios/success.mp3';
import error from './audios/error.mp3';

const TrackList = ({ filmsData, tracks, gussedTrackId, onScoreChange, onGroupChange, isGuessed, onGuessed }) => {
  const initTracksStyles = generateTracksStyles(tracks, 'unmarked');

  const [current, setCurrent] = useState(null);
  const [score, setScore] = useState(5);
  // const [isGuessed, setIsGuessed] = useState(false);
  const [trackStyles, setTrackStyles] = useState(initTracksStyles);

  const markTrack = (idx, nameOfClass) => {
    setTrackStyles((prevStyles) => {
      const updated = [...prevStyles];
      updated[idx] = nameOfClass;
      return updated;
    });
  };

  useEffect(() => {
    setTrackStyles(initTracksStyles);
    setScore(5);
    setCurrent(null);
  }, [filmsData, tracks]);

  const handleTrackClick = (item, idx) => {
    const { filmId, name } = item;

    setCurrent({
      film: filmsData[filmId],
      name,
    });

    if (!isGuessed) {
      const SUCCESS = 'success';
      const ERROR = 'error';
      if (gussedTrackId === filmId) {
        onGuessed(true);
        onScoreChange(score);
        playAudio(success);
        markTrack(idx, SUCCESS);
      } else {
        setScore((prevScore) => prevScore - 1);
        playAudio(error);
        markTrack(idx, ERROR);
      }
    }
  };

  const trackList = tracks.map((item, idx) => {
    const { filmId } = item;
    const { nameRu } = filmsData[filmId];
    return (
      <li key={`${filmId}-${idx}`} className={style.item} onClick={() => handleTrackClick(item, idx)}>
        <span className={classNames(style.marker, style[trackStyles[idx]])}>●</span>
        <p className={style.name}>{nameRu}</p>
      </li>
    );
  });

  const noDetails = <span>{noTrackChoised.ru}</span>;
  const details = !current ? noDetails : <Details {...current} />;

  return (
    <div className={style.wrapper}>
      <div className={style.content}>
        <div className={style.tracks}>
          <ul className={style.list}>{trackList}</ul>
        </div>
        <div className={style.details}>
          <div className={style.inner}>{details}</div>
        </div>
      </div>
      <NextButton isGuessed={isGuessed} onGroupChange={onGroupChange} onGuessed={onGuessed} />
    </div>
  );
};

TrackList.propTypes = {
  filmsData: PropTypes.object,
  tracks: PropTypes.array,
  gussedTrackId: PropTypes.number,
  onScoreChange: PropTypes.func,
  onGroupChange: PropTypes.func,
  isGuessed: PropTypes.bool,
  onGuessed: PropTypes.func,
};

export default TrackList;

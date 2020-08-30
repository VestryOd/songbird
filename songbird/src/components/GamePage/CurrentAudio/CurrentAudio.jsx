import React from 'react';
import PropTypes from 'prop-types';
import Player from '../Player';
import style from './CurrentAudio.module.scss';
import noPoster from './no_poster.jpg';

const CurrentAudio = ({ audio, nameRu, poster, isGuessed = true }) => {
  const title = isGuessed ? nameRu : new Array(nameRu.length).fill('*').join('');
  const image = isGuessed ? poster : noPoster;
  return (
    <div className={style.wrapper}>
      <div className={style.poster}>
        <img src={image} alt={nameRu} />
      </div>
      <div className={style.track}>
        <h3 className={style.title}>{title}</h3>
        <Player isPlaying={false} audio={audio} />
      </div>
    </div>
  );
};

CurrentAudio.propTypes = {
  audio: PropTypes.string,
  nameRu: PropTypes.string,
  poster: PropTypes.string,
  isGuessed: PropTypes.bool,
};

export default CurrentAudio;

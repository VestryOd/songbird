import React from 'react';
import PropTypes from 'prop-types';
import Player from '../Player';
import NextButton from './NextButton';
import style from './CurrentAudio.module.scss';
import noPoster from '../../../assets/pictures/no_poster.jpg';

const CurrentAudio = ({ audio, nameRu, poster, onGroupChange, onGuessed, isGuessed = true }) => {
  const title = isGuessed ? nameRu : new Array(nameRu.length).fill('*').join('');
  const image = isGuessed ? poster : noPoster;
  console.log(`Правильный ответ: ${nameRu}`);
  return (
    <div className={style.wrapper}>
      <div className={style.poster}>
        <img src={image} alt={nameRu} />
      </div>
      <div className={style.track}>
        <h3 className={style.title}>{title}</h3>
        <div className={style['player-wrapper']}>
          <Player isPlaying={false} audio={audio} isStopped={isGuessed} />
          <NextButton isGuessed={isGuessed} onGroupChange={onGroupChange} onGuessed={onGuessed} />
        </div>
      </div>
    </div>
  );
};

CurrentAudio.propTypes = {
  audio: PropTypes.string,
  nameRu: PropTypes.string,
  poster: PropTypes.string,
  isGuessed: PropTypes.bool,
  onGroupChange: PropTypes.func,
  onGuessed: PropTypes.func,
};

export default CurrentAudio;

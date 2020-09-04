import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/src/styles.scss';
import style from './Player.module.scss';

const Player = ({ isPlaying, isStopped, audio = '' }) => {
  const setting = {
    autoPlay: isPlaying,
    src: audio,
    showSkipControls: false,
    showJumpControls: false,
    autoPlayAfterSrcChange: false,
    volume: 0.5,
  };

  const audioElem = useRef(null);

  if (isStopped) {
    audioElem.current.audio.current.pause();
  }
  return (
    <div className={style.wrapper}>
      <AudioPlayer ref={audioElem} {...setting} />
    </div>
  );
};

Player.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  isStopped: PropTypes.bool,
  audio: PropTypes.string.isRequired,
};

export default Player;

import React from 'react';
import PropTypes from 'prop-types';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/src/styles.scss';
import style from './Player.module.scss';

const Player = ({ isPlaying, audio = '' }) => {
  const setting = {
    autoPlay: isPlaying,
    src: audio,
    showSkipControls: false,
    showJumpControls: false,
    autoPlayAfterSrcChange: false,
  };

  return (
    <div className={style.wrapper}>
      <AudioPlayer {...setting} />
    </div>
  );
};

Player.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  audio: PropTypes.string.isRequired,
};

export default Player;

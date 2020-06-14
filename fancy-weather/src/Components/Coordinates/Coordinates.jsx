import React from 'react';
import PropTypes from "prop-types";
import { location }from '../../common/vocabulary';
import { initialCenterMap, defaultState } from "../../common/constants";
import style from './Coordinates.module.scss';

const Coordinates = ({ lang, mapInfo }) => {
  return (
    <div className={style['coordinates-wrapper']}>
      <p className={style.latitude}>{`${location["latitude"][lang]}: ${mapInfo.lat}`}</p>
      <p className={style.longitude}>{`${location["longitude"][lang]}: ${mapInfo.lng}`}</p>
    </div>
  );
}

Coordinates.propTypes = {
  lang: PropTypes.string,
  mapInfo: PropTypes.object.isRequired,
};

Coordinates.defaultProps = {
  lang: defaultState.lang,
  mapInfo: initialCenterMap,
};

export default Coordinates;
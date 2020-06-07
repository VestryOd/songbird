import React from 'react';
import PropTypes from "prop-types";
import { location }from '../../common/vocabulary';
import { initialCenterMap } from "../../common/constants";
import './index.scss';

const LatLon = (props) => {
  const { lang, coordinates } = props;
  return (
    <div className="coordinates-wrapper">
      <p className="latitude">{`${location['latitude'][lang]}: ${coordinates.lat}`}</p>
      <p className="longitude">{`${location['longitude'][lang]}: ${coordinates.lng}`}</p>
    </div>
  );
}

LatLon.propTypes = {
  lang: PropTypes.string,
  coordinates: PropTypes.object.isRequired,
};

LatLon.defaultProps = {
  lang: "en",
  coordinates: initialCenterMap,
};

export default LatLon;
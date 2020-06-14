import React, { Component } from 'react';
import { MAPBOX_API_KEY, initialCenterMap, defaultState } from '../../common/constants';
import PropTypes from 'prop-types';
import mapboxgl from 'mapbox-gl';
import Coordinates from '../Coordinates';

import 'mapbox-gl/dist/mapbox-gl.css';
import style from './Map.module.scss';

mapboxgl.accessToken = MAPBOX_API_KEY;
class Map extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      mapContainer: null,
      map: null,
      marker: null,
    }
  }

  componentDidMount() {
    const { lng, lat } = this.props?.mapCoordinates;
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: 11,
      essential: true,
    });
  }

  addMarker() {
    const { lng, lat } = this.props?.mapCoordinates;
    this.marker = new mapboxgl.Marker().setLngLat([lng, lat]).addTo(this.map);
  }

  componentDidUpdate(prevProps) {
    if (
      this.props?.mapCoordinates !== prevProps.mapCoordinates
    ) {
      const { mapCoordinates } = this.props;
      this.map.flyTo({ center: mapCoordinates });
      this.addMarker();
    }
  }

  render() {
    const { lang, mapInfo } = this.props;
    return (
      <div className={style['map-section']}>
        <div className={style['map-wrapper']}>
          <div
            className={style['map-container']}
            ref={(el) => {
              this.mapContainer = el;
            }}
          />
          <Coordinates lang={lang} mapInfo={mapInfo} />
        </div>
      </div>
    );
  }
}

Map.propTypes = {
  lang: PropTypes.string,
  mapCoordinates: PropTypes.object.isRequired,
  mapInfo: PropTypes.object.isRequired,
};

Map.defaultProps = {
  lang: defaultState.lang,
  mapCoordinates: [initialCenterMap.lng, initialCenterMap.lat],
  mapInfo: initialCenterMap,
};

export default Map;
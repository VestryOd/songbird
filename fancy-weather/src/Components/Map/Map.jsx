import React, { Component } from 'react';
import { MAPBOX_API_KEY } from '../../common/constants';
import PropTypes from 'prop-types';
import { initialCenterMap } from '../../common/constants';
import mapboxgl from 'mapbox-gl';
import MapboxLanguage from '@mapbox/mapbox-gl-language';
import LatLon from '../LatLon/LatLon';
import { CSSTransitionGroup } from "react-transition-group";

import 'mapbox-gl/dist/mapbox-gl.css';
import './index.scss';

mapboxgl.accessToken = MAPBOX_API_KEY;
class Map extends Component {
  state = {
    map: null,
    container: null,
    marker: null,
    coordinates: null,
  };

  addMarker = () => {
    const { coordinates } = this.state;
    const marker = new mapboxgl.Marker().setLngLat(coordinates).addTo(this.map);
    this.setState({
      marker: marker
    })
  };

  componentDidMount() {
    const { coordinates } = this.props;
    this.setState({
      coordinates: coordinates,
    });
    const map = new mapboxgl.Map({
      container: this.container,
      style: "mapbox://styles/mapbox/streets-v10",
      center: coordinates,
      zoom: 12,
      essential: true,
      logoPosition: 'bottom-left'
    });
    this.setState({
      map: map
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.coordinates !== prevProps.coordinates) {
      this.map.flyTo({ center: this.props.coordinates });
      this.addMarker();
    }
  }

  render() {
    const { lang, coordinates } = this.props;
    return (
      <div className="map-section">
        <div className="map-wrapper">
          <div
            className="map-container"
            ref={(el) => {
              this.container = el;
            }}
          />
          <LatLon lang={lang} coordinates={coordinates} />
        </div>
      </div>
    );
  }
}

Map.propTypes = {
  lang: PropTypes.string,
  coordinates: PropTypes.object.isRequired,
};

Map.defaultProps = {
  lang: "en",
  coordinates: initialCenterMap,
};

export default Map;
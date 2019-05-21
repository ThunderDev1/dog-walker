import * as React from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import {connect} from 'react-redux';
import {AppState} from '../store';
import * as MapStore from '../store/map';
import Map from '../components/Map';
import {useEffect} from 'react';

interface DispatchProps {
  setPlaceCoordinates: (position: mapboxgl.LngLat) => void;
  addPlace: (placeTypeId: number, placeName: string) => void;
  getPlaces: () => Promise<void>;
  deletePlace: (placeId: number) => void;
}

type MapContainerProps = MapStore.MapState & DispatchProps;

const MapContainer = (props: MapContainerProps) => {
  useEffect(() => {
    props.getPlaces();
  }, []);

  return <Map {...props} />;
};

export default connect(
  (state: AppState) => ({...state.map}),
  MapStore.actionCreators
)(MapContainer);

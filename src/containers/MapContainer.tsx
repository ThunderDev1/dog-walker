import * as React from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import {connect} from 'react-redux';
import {AppState} from '../store';
import * as MapStore from '../store/map';
import * as MeetingsStore from '../store/meetings/createMeeting';
import Map from '../components/map/Map';
import {useEffect} from 'react';

interface DispatchProps {
  setPlaceCoordinates: (position: mapboxgl.LngLat) => void;
  addPlace: (placeTypeId: number, placeName: string) => void;
  getPlaces: () => Promise<void>;
  deletePlace: (placeId: number) => void;
  getPlacesByDistance: () => Promise<void>;
  createMeeting: (placeId: number) => void;
  getOnGoingMeeting: () => void;
  cancelMeeting: (meetingId: number) => void;
}

type MapContainerProps = MapStore.MapState & MeetingsStore.CreateMeetingState & DispatchProps;

const MapContainer = (props: MapContainerProps) => {
  useEffect(() => {
    props.getPlaces();
  }, []);

  return <Map {...props} />;
};

export default connect(
  (state: AppState) => ({...state.map, ...state.meetings.createMeeting}),
  {...MapStore.actionCreators, ...MeetingsStore.actionCreators}
)(MapContainer);

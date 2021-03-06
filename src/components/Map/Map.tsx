import * as React from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import * as mapboxgl from 'mapbox-gl';
import {MapboxGeoJSONFeature} from 'mapbox-gl';
import * as MapStore from '../../store/map';
import * as MeetingsStore from '../../store/meetings/createMeeting';
import AddPlace from './AddPlace';
import PlaceDetailsModal from './PlaceDetailsModal';
import {PlaceDetails} from '../../store/meetings/createMeeting';
import CreateMeeting from './CreateMeeting';
import CreateMeetingButton from './CreateMeetingButton';
import CancelMeetingButton from './CancelMeetingButton';
import {Fragment} from 'react';
import CurrentMeetingButton from './CurrentMeetingButton';

declare const MAPBOX_TOKEN: string;
declare const MAPBOX_STYLE: string;

interface DispatchProps {
  setPlaceCoordinates: (position: mapboxgl.LngLat) => void;
  addPlace: (placeTypeId: number, placeName: string) => void;
  getPlaces: () => Promise<void>;
  deletePlace: (placeId: number) => void;
  getPlacesByDistance: () => Promise<void>;
  createMeeting: (placeId: number) => void;
  getOnGoingMeeting: () => void;
  cancelMeeting: (meetingId: number) => void;
  updateLastPosition: (position: mapboxgl.LngLat, zoom: number) => void;
}

enum MapModal {
  AddPlace,
  PlaceDetails,
  CreateMeeting,
  CreateMeetingButton,
}

type MapProps = MapStore.MapState & MeetingsStore.CreateMeetingState & DispatchProps;

interface MapState {
  activeModal: MapModal;
  placeDetails: PlaceDetails;
}

export default class Map extends React.Component<MapProps, MapState> {
  public map: mapboxgl.Map;
  public addPlaceMarker: mapboxgl.Marker = new mapboxgl.Marker();

  public constructor(props: MapProps) {
    super(props);
    this.state = {
      activeModal: MapModal.CreateMeetingButton,
      placeDetails: {
        id: 0,
        name: '',
        placeTypeId: 1,
        latitude: 0,
        longitude: 0,
        distance: 0,
      },
    };
  }

  private showPlaceDetails(feature: MapboxGeoJSONFeature) {
    this.cancelAddPlace();
    if (feature.properties) {
      // center on marquer
      const placeCoordinates = (feature.geometry as any).coordinates;
      this.map.easeTo({
        center: [placeCoordinates[0], placeCoordinates[1] - 0.0015],
        zoom: 14,
      });
      var details: PlaceDetails = {
        id: feature.properties['id'],
        name: feature.properties['name'],
        placeTypeId: feature.properties['placeTypeId'],
        latitude: placeCoordinates[1],
        longitude: placeCoordinates[0],
        distance: 0,
      };

      this.setState({activeModal: MapModal.PlaceDetails, placeDetails: details});
    }
  }

  public componentDidMount() {
    this.props.getOnGoingMeeting();

    (mapboxgl as any).accessToken = MAPBOX_TOKEN;

    const {lastPosition, lastZoom} = this.props;

    this.map = new mapboxgl.Map({
      container: 'map',
      style: MAPBOX_STYLE,
      center: [lastPosition.lng, lastPosition.lat],
      zoom: lastZoom,
      minZoom: 3,
      maxZoom: 18,
      pitchWithRotate: false,
    });

    const geolocateControl = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      fitBoundsOptions: {maxZoom: 15},
      trackUserLocation: true,
    });

    this.map.addControl(geolocateControl);

    this.map.on('load', () => {
      // geolocateControl.trigger();
      this.map.addSource('places', {
        type: 'geojson',
        data: this.props.geoData,
      });
      this.map.addLayer({
        id: 'waste-bags',
        type: 'circle',
        source: 'places',
        filter: ['all', ['!has', 'point_count'], ['==', 'placeTypeId', 1]],
        paint: {
          'circle-radius': 6,
          'circle-color': '#8332A5',
        },
      });
      this.map.addLayer({
        id: 'parks',
        type: 'symbol',
        source: 'places',
        filter: ['all', ['!has', 'point_count'], ['==', 'placeTypeId', 2]],
        layout: {
          'icon-image': 'veterinary-15',
          'icon-size': 1,
        },
        paint: {},
      });
      this.map.on('contextmenu', e => {
        this.addPlaceMarker.remove();
        this.addPlaceMarker = new mapboxgl.Marker().setLngLat(e.lngLat).addTo(this.map);
        this.setState({activeModal: MapModal.AddPlace});
        this.props.setPlaceCoordinates(e.lngLat);
      });
      this.map.on('click', 'parks', e => {
        e.features && this.showPlaceDetails(e.features[0]);
      });
      this.map.on('click', 'waste-bags', e => {
        e.features && this.showPlaceDetails(e.features[0]);
      });
      this.map.on('moveend', () => {
        const position = this.map.getCenter();
        const zoom = this.map.getZoom();
        this.props.updateLastPosition(position, zoom);
      });
    });
  }

  public componentDidUpdate = (prevProps: MapProps) => {
    const {geoData} = this.props;
    if (prevProps.geoData.features.length !== geoData.features.length) {
      var source = this.map.getSource('places') as mapboxgl.GeoJSONSource;
      source && source.setData(this.props.geoData);
    }
  };

  public resetModals = () => {
    this.setState({activeModal: MapModal.CreateMeetingButton});
  };

  public cancelAddPlace = () => {
    this.resetModals();
    this.addPlaceMarker.remove();
  };

  public renderActiveModal = () => {
    const {placeDetails, activeModal} = this.state;
    const {addPlace, deletePlace, getPlacesByDistance, meetingPlaces, createMeeting, onGoingMeetingId, cancelMeeting} = this.props;

    switch (activeModal) {
      case MapModal.AddPlace:
        return <AddPlace close={this.cancelAddPlace} addPlace={addPlace} />;
      case MapModal.PlaceDetails:
        return <PlaceDetailsModal {...placeDetails} close={this.resetModals} delete={deletePlace} />;
      case MapModal.CreateMeeting:
        return (
          <CreateMeeting loadPlaces={getPlacesByDistance} close={this.resetModals} places={meetingPlaces} createMeeting={createMeeting} />
        );
      case MapModal.CreateMeetingButton:
        return onGoingMeetingId ? (
          <Fragment>
            <CurrentMeetingButton meetingId={onGoingMeetingId} />
            <CancelMeetingButton meetingId={onGoingMeetingId} cancelMeeting={cancelMeeting} />
          </Fragment>
        ) : (
          <CreateMeetingButton click={() => this.setState({activeModal: MapModal.CreateMeeting})} />
        );
    }
  };

  private getMapHeight = () => {
    const menuHeight = 49;
    const viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    return viewportHeight - menuHeight + 'px';
  };

  public render() {
    return (
      <React.Fragment>
        <div id="map" style={{width: '100vw', height: this.getMapHeight()}} className="map-container" />
        {this.renderActiveModal()}
      </React.Fragment>
    );
  }
}

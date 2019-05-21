import {Dispatch} from 'redux';
import {ThunkDispatch} from 'redux-thunk';
import * as mapboxgl from 'mapbox-gl';
import axios from 'axios';
import {AppState} from '.';
import {Feature, Geometry, GeoJsonProperties} from 'geojson';
import {ToastsStore} from 'react-toasts';

const UPDATE_LAST_MAP_POSITION = 'UPDATE_LAST_MAP_POSITION';
const SET_COORDINATES = 'SET_COORDINATES';

const ADD_PLACE_START = 'ADD_PLACE_START';
const ADD_PLACE_SUCCESS = 'ADD_PLACE_SUCCESS';
const ADD_PLACE_FAILURE = 'ADD_PLACE_FAILURE';

const LOAD_PLACES_START = 'LOAD_PLACES_START';
const LOAD_PLACES_SUCCESS = 'LOAD_PLACES_SUCCESS';
const LOAD_PLACES_FAILURE = 'LOAD_PLACES_FAILURE';

export interface MapState {
  lastPosition: mapboxgl.LngLat;
  lastZoom: number;
  placeCoordinates: mapboxgl.LngLat;
  isLoading: boolean;
  geoData: GeoJSON.FeatureCollection<GeoJSON.GeometryObject>;
}

interface LoadPlacesStartAction {
  type: typeof LOAD_PLACES_START;
  isLoading: boolean;
}

interface LoadPlacesSuccessAction {
  type: typeof LOAD_PLACES_SUCCESS;
  geoData: GeoJSON.FeatureCollection<GeoJSON.GeometryObject>;
  isLoading: boolean;
}

interface LoadPlacesFailureAction {
  type: typeof LOAD_PLACES_FAILURE;
  isLoading: boolean;
}

interface UpdateLastPositionAction {
  type: typeof UPDATE_LAST_MAP_POSITION;
  lastPosition: mapboxgl.LngLat;
  lastZoom: number;
}

interface SetCoordinatesAction {
  type: typeof SET_COORDINATES;
  placeCoordinates: mapboxgl.LngLat;
}

interface AddPlaceStartAction {
  type: typeof ADD_PLACE_START;
  isLoading: boolean;
}

interface AddPlaceSuccessAction {
  type: typeof ADD_PLACE_SUCCESS;
  isLoading: boolean;
}

interface AddPlaceFailureAction {
  type: typeof ADD_PLACE_FAILURE;
  isLoading: boolean;
}

export type MapActionTypes =
  | UpdateLastPositionAction
  | SetCoordinatesAction
  | AddPlaceStartAction
  | AddPlaceSuccessAction
  | AddPlaceFailureAction
  | LoadPlacesStartAction
  | LoadPlacesSuccessAction
  | LoadPlacesFailureAction;

export const actionCreators = {
  addPlace: (placeTypeId: number, placeName: string) => {
    return async (dispatch: ThunkDispatch<{}, {}, any>, getState: () => AppState) => {
      dispatch({type: ADD_PLACE_START, isLoading: true});

      const state = getState();

      const place = {
        latitude: state.map.placeCoordinates.lat,
        longitude: state.map.placeCoordinates.lng,
        placeTypeId,
        placeName,
      };
      return axios
        .post('/place', place)
        .then((response: any) => {
          dispatch({type: ADD_PLACE_SUCCESS, isLoading: false});

          const createdId = response.data;

          // add to existing geodata
          const addedPlace: Feature<Geometry, GeoJsonProperties> = {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [place.longitude, place.latitude],
            },
            properties: {
              id: createdId,
              placeTypeId: place.placeTypeId,
            },
          };

          const geoData = {
            type: state.map.geoData.type,
            features: state.map.geoData.features.slice(),
          };
          geoData.features.push(addedPlace);

          dispatch({type: LOAD_PLACES_SUCCESS, isLoading: false, geoData: geoData});

          ToastsStore.success('Lieu ajouté')
        })
        .catch(() => {
          dispatch({type: ADD_PLACE_FAILURE, isLoading: false});
        });
    };
  },

  getPlaces: () => {
    return async (dispatch: ThunkDispatch<{}, {}, any>) => {
      dispatch({type: LOAD_PLACES_START, isLoading: true});
      return axios
        .get('/place')
        .then((response: any) => {
          dispatch({type: LOAD_PLACES_SUCCESS, isLoading: false, geoData: response.data});
        })
        .catch((error: Error) => {
          dispatch({type: LOAD_PLACES_FAILURE, isLoading: false});
          console.log(error);
        });
    };
  },

  setPlaceCoordinates: (position: mapboxgl.LngLat) => (dispatch: Dispatch) => {
    dispatch({type: SET_COORDINATES, placeCoordinates: position});
  },
  updateLastPosition: (position: mapboxgl.LngLat, zoom: number) => (dispatch: Dispatch) => {
    dispatch({type: UPDATE_LAST_MAP_POSITION, lastPosition: position, lastZoom: zoom});
  },
};

const bordeaux = new mapboxgl.LngLat(-0.551228, 44.8694);

const initialState: MapState = {
  lastPosition: bordeaux,
  lastZoom: 11,
  placeCoordinates: bordeaux,
  isLoading: false,
  geoData: {
    type: 'FeatureCollection',
    features: [],
  },
};

export const reducer = (state = initialState, action: MapActionTypes): MapState => {
  switch (action.type) {
    case UPDATE_LAST_MAP_POSITION:
      return {...state, lastPosition: action.lastPosition, lastZoom: action.lastZoom};
    case SET_COORDINATES:
      return {...state, placeCoordinates: action.placeCoordinates};
    case ADD_PLACE_START:
      return {...state, isLoading: action.isLoading};
    case ADD_PLACE_SUCCESS:
      return {...state, isLoading: action.isLoading};
    case ADD_PLACE_FAILURE:
      return {...state, isLoading: action.isLoading};
    case LOAD_PLACES_START:
      return {...state, isLoading: action.isLoading};
    case LOAD_PLACES_SUCCESS:
      return {...state, isLoading: action.isLoading, geoData: action.geoData};
    case LOAD_PLACES_FAILURE:
      return {...state, isLoading: action.isLoading};
    default:
      return state;
  }
};

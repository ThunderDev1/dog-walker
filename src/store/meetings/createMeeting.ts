import {ThunkDispatch} from 'redux-thunk';
import axios from 'axios';
import {ToastsStore} from 'react-toasts';

const CREATE_MEETING_START = 'CREATE_MEETING_START';
const CREATE_MEETING_SUCCESS = 'CREATE_MEETING_SUCCESS';
const CREATE_MEETING_FAILURE = 'CREATE_MEETING_FAILURE';

const LOAD_PLACES_BY_DIST_START = 'LOAD_PLACES_BY_DIST_START';
const LOAD_PLACES_BY_DIST_SUCCESS = 'LOAD_PLACES_BY_DIST_SUCCESS';
const LOAD_PLACES_BY_DIST_FAILURE = 'LOAD_PLACES_BY_DIST_FAILURE';

export interface PlaceDetails {
  id: number;
  name: string;
  placeTypeId: number;
  latitude: number;
  longitude: number;
  distance: number;
}

export interface CreateMeetingState {
  isLoading: boolean;
  meetingPlaces: PlaceDetails[];
}

interface LoadPlacesByDistStartAction {
  type: typeof LOAD_PLACES_BY_DIST_START;
  isLoading: boolean;
}

interface LoadPlacesByDistSuccessAction {
  type: typeof LOAD_PLACES_BY_DIST_SUCCESS;
  meetingPlaces: PlaceDetails[];
  isLoading: boolean;
}

interface LoadPlacesByDistFailureAction {
  type: typeof LOAD_PLACES_BY_DIST_FAILURE;
  isLoading: boolean;
}

interface CreateMeetingStartAction {
  type: typeof CREATE_MEETING_START;
  isLoading: boolean;
}

interface CreateMeetingSuccessAction {
  type: typeof CREATE_MEETING_SUCCESS;
  isLoading: boolean;
}

interface CreateMeetingFailureAction {
  type: typeof CREATE_MEETING_FAILURE;
  isLoading: boolean;
}

export type CreateMeetingActionTypes =
  | CreateMeetingStartAction
  | CreateMeetingSuccessAction
  | CreateMeetingFailureAction
  | LoadPlacesByDistStartAction
  | LoadPlacesByDistSuccessAction
  | LoadPlacesByDistFailureAction;

export const actionCreators = {
  createMeeting: (placeId: number) => {
    return async (dispatch: ThunkDispatch<{}, {}, any>) => {
      dispatch({type: CREATE_MEETING_START, isLoading: true});
      return axios
        .post('/meeting', {placeId})
        .then(() => {
          dispatch({type: CREATE_MEETING_SUCCESS, isLoading: false});
          ToastsStore.success('La balade est lancée!');
        })
        .catch(() => {
          dispatch({type: CREATE_MEETING_FAILURE, isLoading: false});
        });
    };
  },

  getPlacesByDistance: () => {
    return async (dispatch: ThunkDispatch<{}, {}, any>) => {
      dispatch({type: LOAD_PLACES_BY_DIST_START, isLoading: true});
      navigator.geolocation.getCurrentPosition(position => {
        const {latitude, longitude} = position.coords;
        console.log(position.coords);
        return axios
          .post('/place/meeting', {latitude, longitude})
          .then((response: any) => {
            dispatch({type: LOAD_PLACES_BY_DIST_SUCCESS, isLoading: false, meetingPlaces: response.data});
          })
          .catch(() => {
            dispatch({type: LOAD_PLACES_BY_DIST_FAILURE, isLoading: false});
          });
      });
    };
  },
};

const initialState: CreateMeetingState = {
  isLoading: false,
  meetingPlaces: [],
};

export const reducer = (state = initialState, action: CreateMeetingActionTypes): CreateMeetingState => {
  switch (action.type) {
    case CREATE_MEETING_START:
      return {...state, isLoading: action.isLoading};
    case CREATE_MEETING_SUCCESS:
      return {...state, isLoading: action.isLoading};
    case CREATE_MEETING_FAILURE:
      return {...state, isLoading: action.isLoading};
    case LOAD_PLACES_BY_DIST_START:
      return {...state, isLoading: action.isLoading};
    case LOAD_PLACES_BY_DIST_SUCCESS:
      return {...state, isLoading: action.isLoading, meetingPlaces: action.meetingPlaces};
    case LOAD_PLACES_BY_DIST_FAILURE:
      return {...state, isLoading: action.isLoading};
    default:
      return state;
  }
};

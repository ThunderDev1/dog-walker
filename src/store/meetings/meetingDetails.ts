import {ThunkDispatch} from 'redux-thunk';
import axios from 'axios';
import {Guest, MeetingStatus} from '.';
import {AppState} from '..';

const LOAD_MEETING_START = 'LOAD_MEETING_START';
const LOAD_MEETING_SUCCESS = 'LOAD_MEETING_SUCCESS';
const LOAD_MEETING_FAILURE = 'LOAD_MEETING_FAILURE';

const UPDATE_STATUS_START = 'UPDATE_STATUS_START';
const UPDATE_STATUS_SUCCESS = 'UPDATE_STATUS_SUCCESS';
const UPDATE_STATUS_FAILURE = 'UPDATE_STATUS_FAILURE';

export interface Meeting {
  meetingId: number;
  creatorName: string;
  creatorAvatarUrl: string;
  title: string;
  startDate: string;
  endDate: string;
  guests: Guest[];
  creationDate: string;
  status: number;
  isCreator: boolean;
  isPastEvent: boolean;
  placeTypeId: number;
  placeId: number;
  latitude: number;
  longitude: number;
}

export interface MeetingDetailsState {
  meeting: Meeting;
  isLoading: boolean;
}

interface LoadMeetingStartAction {
  type: typeof LOAD_MEETING_START;
  isLoading: boolean;
}

interface LoadMeetingSuccessAction {
  type: typeof LOAD_MEETING_SUCCESS;
  isLoading: boolean;
  meeting: Meeting;
}

interface LoadMeetingFailureAction {
  type: typeof LOAD_MEETING_FAILURE;
  isLoading: boolean;
}

interface UpdateStatusStartAction {
  type: typeof UPDATE_STATUS_START;
  isLoading: boolean;
}

interface UpdateStatusSuccessAction {
  type: typeof UPDATE_STATUS_SUCCESS;
  isLoading: boolean;
  meeting: Meeting;
}

interface UpdateStatusFailureAction {
  type: typeof UPDATE_STATUS_FAILURE;
  isLoading: boolean;
}

export type MeetingDetailsActionTypes =
  | LoadMeetingStartAction
  | LoadMeetingSuccessAction
  | LoadMeetingFailureAction
  | UpdateStatusStartAction
  | UpdateStatusSuccessAction
  | UpdateStatusFailureAction;

export const actionCreators = {
  getMeeting: (meetingId: number) => {
    return async (dispatch: ThunkDispatch<{}, {}, any>) => {
      dispatch({type: LOAD_MEETING_START, isLoading: true});
      return axios
        .get(`/meeting/${meetingId}`)
        .then((response: any) => {
          dispatch({type: LOAD_MEETING_SUCCESS, isLoading: false, meeting: response.data});
        })
        .catch(() => {
          dispatch({type: LOAD_MEETING_FAILURE, isLoading: false});
        });
    };
  },

  updateStatus: (meetingId: number, status: MeetingStatus) => {
    return async (dispatch: ThunkDispatch<{}, {}, any>, getState: () => AppState) => {
      dispatch({type: UPDATE_STATUS_START, isLoading: true});
      return axios
        .post('/meeting/presence', {meetingId: meetingId, status: status})
        .then(function(response: any) {
          const {meetingDetails} = getState().meetings;
          dispatch({type: UPDATE_STATUS_SUCCESS, meeting: {...meetingDetails.meeting, status, guests: response.data}, isLoading: false});
        })
        .catch(() => {
          dispatch({type: UPDATE_STATUS_FAILURE, isLoading: true});
        });
    };
  },
};

const defaultMeeting: Meeting = {
  meetingId: 0,
  creatorName: '',
  creatorAvatarUrl: '',
  title: '',
  startDate: '',
  endDate: '',
  guests: [],
  creationDate: '',
  status: 0,
  isCreator: false,
  isPastEvent: false,
  placeTypeId: 0,
  placeId: 0,
  latitude: 0,
  longitude: 0,
};

const initialState: MeetingDetailsState = {
  meeting: defaultMeeting,
  isLoading: false,
};

export const reducer = (state = initialState, action: MeetingDetailsActionTypes): MeetingDetailsState => {
  switch (action.type) {
    case LOAD_MEETING_START:
      return {...state, isLoading: action.isLoading};
    case LOAD_MEETING_SUCCESS:
      return {...state, isLoading: action.isLoading, meeting: action.meeting};
    case LOAD_MEETING_FAILURE:
      return {...state, isLoading: action.isLoading};
    case UPDATE_STATUS_START:
      return {...state, isLoading: action.isLoading};
    case UPDATE_STATUS_SUCCESS:
      return {...state, isLoading: action.isLoading, meeting: action.meeting};
    case UPDATE_STATUS_FAILURE:
      return {...state, isLoading: action.isLoading};
    default:
      return state;
  }
};

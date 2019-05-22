import {ThunkDispatch} from 'redux-thunk';
import axios from 'axios';

const LOAD_MEETINGS_START = 'LOAD_MEETINGS_START';
const LOAD_MEETINGS_SUCCESS = 'LOAD_MEETINGS_SUCCESS';
const LOAD_MEETINGS_FAILURE = 'LOAD_MEETINGS_FAILURE';

export interface Meeting {
  meetingId: string;
  title: string;
  startDate: string;
  endDate: string;
  placeName: string;
  creatorName: string;
  creatorAvatarUrl: string;
}

export interface MeetingListState {
  meetingList: Meeting[];
  isLoading: boolean;
}

interface LoadMeetingsStartAction {
  type: typeof LOAD_MEETINGS_START;
  isLoading: boolean;
}

interface LoadMeetingsSuccessAction {
  type: typeof LOAD_MEETINGS_SUCCESS;
  meetingList: Meeting[];
  isLoading: boolean;
}

interface LoadMeetingsFailureAction {
  type: typeof LOAD_MEETINGS_FAILURE;
  isLoading: boolean;
}

export type MeetingListActionTypes = LoadMeetingsStartAction | LoadMeetingsSuccessAction | LoadMeetingsFailureAction;

export const actionCreators = {
  getMeetings: () => {
    return async (dispatch: ThunkDispatch<{}, {}, any>) => {
      dispatch({type: LOAD_MEETINGS_START, isLoading: true});
      return axios
        .get('/meetings')
        .then((response: any) => {
          dispatch({type: LOAD_MEETINGS_SUCCESS, isLoading: false, meetingList: response.data});
        })
        .catch(() => {
          dispatch({type: LOAD_MEETINGS_FAILURE, isLoading: false});
        });
    };
  },
};

const initialState: MeetingListState = {
  meetingList: [],
  isLoading: false,
};

export const reducer = (state = initialState, action: MeetingListActionTypes): MeetingListState => {
  switch (action.type) {
    case LOAD_MEETINGS_START:
      return {...state, isLoading: action.isLoading};
    case LOAD_MEETINGS_SUCCESS:
      return {...state, isLoading: action.isLoading, meetingList: action.meetingList};
    case LOAD_MEETINGS_FAILURE:
      return {...state, isLoading: action.isLoading};
    default:
      return state;
  }
};

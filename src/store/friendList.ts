import {ThunkDispatch} from 'redux-thunk';
import axios from 'axios';

const LOAD_FRIENDS_START = 'LOAD_FRIENDS_START';
const LOAD_FRIENDS_SUCCESS = 'LOAD_FRIENDS_SUCCESS';
const LOAD_FRIENDS_FAILURE = 'LOAD_FRIENDS_FAILURE';

export interface Friend {
  id: string;
  name: string;
  avatarUrl: string;
  description: string;
}

export interface FriendListState {
  friendList: Friend[];
  isLoading: boolean;
}

interface LoadFriendsStartAction {
  type: typeof LOAD_FRIENDS_START;
  isLoading: boolean;
}

interface LoadFriendsSuccessAction {
  type: typeof LOAD_FRIENDS_SUCCESS;
  friendList: Friend[];
  isLoading: boolean;
}

interface LoadFriendsFailureAction {
  type: typeof LOAD_FRIENDS_FAILURE;
  isLoading: boolean;
}

export type FriendListActionTypes = LoadFriendsStartAction | LoadFriendsSuccessAction | LoadFriendsFailureAction;

export const actionCreators = {
  getFriends: () => {
    return async (dispatch: ThunkDispatch<{}, {}, any>) => {
      dispatch({type: LOAD_FRIENDS_START, isLoading: true});
      return axios
        .get('/profile/all')
        .then((response: any) => {
          dispatch({type: LOAD_FRIENDS_SUCCESS, isLoading: false, friendList: response.data});
        })
        .catch(() => {
          dispatch({type: LOAD_FRIENDS_FAILURE, isLoading: false});
        });
    };
  },
}

const initialState: FriendListState = {
  friendList: [],
  isLoading: false,
};

export const reducer = (state = initialState, action: FriendListActionTypes): FriendListState => {
  switch (action.type) {
    case LOAD_FRIENDS_START:
      return {...state, isLoading: action.isLoading};
    case LOAD_FRIENDS_SUCCESS:
      return {...state, isLoading: action.isLoading, friendList: action.friendList};
    case LOAD_FRIENDS_FAILURE:
      return {...state, isLoading: action.isLoading};
    default:
      return state;
  }
};
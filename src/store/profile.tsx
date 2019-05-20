import {ThunkDispatch} from 'redux-thunk';
import axios from 'axios';
import {AppState} from '.';

const LOAD_PROFILE_START = 'LOAD_PROFILE_START';
const LOAD_PROFILE_SUCCESS = 'LOAD_PROFILE_SUCCESS';
const LOAD_PROFILE_FAILURE = 'LOAD_PROFILE_FAILURE';

const UPLOAD_AVATAR_START = 'UPLOAD_AVATAR_START';
const UPLOAD_AVATAR_SUCCESS = 'UPLOAD_AVATAR_SUCCESS';
const UPLOAD_AVATAR_FAILURE = 'UPLOAD_AVATAR_FAILURE';

const UPDATE_NAME_START = 'UPDATE_NAME_START';
const UPDATE_NAME_SUCCESS = 'UPDATE_NAME_SUCCESS';
const UPDATE_NAME_FAILURE = 'UPDATE_NAME_FAILURE';

export interface Profile {
  name: string;
  email: string;
  avatarUrl: string;
}

export interface ProfileState {
  profile: Profile;
  isLoading: boolean;
  isNameLoading: boolean;
}

interface LoadProfileStartAction {
  type: typeof LOAD_PROFILE_START;
  isLoading: boolean;
}

interface LoadProfileSuccessAction {
  type: typeof LOAD_PROFILE_SUCCESS;
  profile: Profile;
  isLoading: boolean;
}

interface LoadProfileFailureAction {
  type: typeof LOAD_PROFILE_FAILURE;
  isLoading: boolean;
}

interface UploadAvatarStartAction {
  type: typeof UPLOAD_AVATAR_START;
  isLoading: boolean;
}

interface UploadAvatarSuccessAction {
  type: typeof UPLOAD_AVATAR_SUCCESS;
  avatarUrl: string;
  isLoading: boolean;
}

interface UploadAvatarFailureAction {
  type: typeof UPLOAD_AVATAR_FAILURE;
  isLoading: boolean;
}

interface UpdateNameStartAction {
  type: typeof UPDATE_NAME_START;
  isNameLoading: boolean;
}

interface UpdateNameSuccessAction {
  type: typeof UPDATE_NAME_SUCCESS;
  name: string;
  isNameLoading: boolean;
}

interface UpdateNameFailureAction {
  type: typeof UPDATE_NAME_FAILURE;
  isNameLoading: boolean;
}

export type ProfileActionTypes =
  | LoadProfileStartAction
  | LoadProfileSuccessAction
  | LoadProfileFailureAction
  | UploadAvatarStartAction
  | UploadAvatarSuccessAction
  | UploadAvatarFailureAction
  | UpdateNameStartAction
  | UpdateNameSuccessAction
  | UpdateNameFailureAction;

export const actionCreators = {
  getProfile: () => {
    return async (dispatch: ThunkDispatch<{}, {}, any>, getState: () => AppState) => {
      dispatch({type: LOAD_PROFILE_START, isLoading: true});
      return axios
        .get('/profile')
        .then((response: any) => {
          const user = response.data;

          if (user) {
            dispatch({type: LOAD_PROFILE_SUCCESS, isLoading: false, profile: user});
          } else {
            const email = getState().oidc.user.profile.name;
            axios
              .post('/profile', {email})
              .then((response: any) => {
                dispatch({type: LOAD_PROFILE_SUCCESS, isLoading: false, profile: response.data});
              })
              .catch(() => {
                dispatch({type: LOAD_PROFILE_FAILURE, isLoading: false});
              });
          }
        })
        .catch(() => {
          dispatch({type: LOAD_PROFILE_FAILURE, isLoading: false});
        });
    };
  },
  uploadAvatar: (fileBase64: string, fileType: string, fileName: string) => async (dispatch: ThunkDispatch<{}, {}, any>): Promise<void> => {
    dispatch({type: UPLOAD_AVATAR_START, isLoading: true});

    var data = {
      imageBase64: fileBase64,
      fileType: fileType,
      fileName: fileName,
    };

    return axios
      .post('/profile/avatar', data)
      .then(function(response: any) {
        dispatch({type: UPLOAD_AVATAR_SUCCESS, avatarUrl: response.data.avatarUrl, isLoading: false});
      })
      .catch(function(error) {
        dispatch({type: UPLOAD_AVATAR_FAILURE, isLoading: false});
        console.log(error);
      });
  },
  submitName: (name: string) => async (dispatch: ThunkDispatch<{}, {}, any>) => {
    dispatch({type: UPDATE_NAME_START, isNameLoading: true});
    axios
      .post('/profile/name', {name: name})
      .then(() => {
        dispatch({type: UPDATE_NAME_SUCCESS, name: name});
      })
      .catch(() => {
        dispatch({type: UPDATE_NAME_FAILURE, isNameLoading: false});
      });
  },
};

const initialState: ProfileState = {
  isLoading: false,
  isNameLoading: false,
  profile: {
    name: '',
    email: '',
    avatarUrl: '',
  },
};

export const reducer = (state = initialState, action: ProfileActionTypes): ProfileState => {
  switch (action.type) {
    case LOAD_PROFILE_START:
      return {...state, isLoading: action.isLoading};
    case LOAD_PROFILE_SUCCESS:
      return {...state, isLoading: action.isLoading, profile: action.profile};
    case LOAD_PROFILE_FAILURE:
      return {...state, isLoading: action.isLoading};
    case UPLOAD_AVATAR_START:
      return {...state, isLoading: action.isLoading};
    case UPLOAD_AVATAR_SUCCESS:
      return {...state, isLoading: action.isLoading, profile: {...state.profile, avatarUrl: action.avatarUrl}};
    case UPLOAD_AVATAR_FAILURE:
      return {...state, isLoading: action.isLoading};
    case UPDATE_NAME_START:
      return {...state, isNameLoading: action.isNameLoading};
    case UPDATE_NAME_SUCCESS:
      return {...state, isNameLoading: action.isNameLoading, profile: {...state.profile, name: action.name}};
    case UPDATE_NAME_FAILURE:
      return {...state, isNameLoading: action.isNameLoading};
    default:
      return state;
  }
};

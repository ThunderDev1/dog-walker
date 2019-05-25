import {ThunkDispatch} from 'redux-thunk';
import axios from 'axios';
import {AppState} from '.';
import {ToastsStore} from 'react-toasts';

declare var API_URL: string;

const LOAD_PROFILE_START = 'LOAD_PROFILE_START';
const LOAD_PROFILE_SUCCESS = 'LOAD_PROFILE_SUCCESS';
const LOAD_PROFILE_FAILURE = 'LOAD_PROFILE_FAILURE';

const LOAD_PUBLIC_PROFILE_START = 'LOAD_PUBLIC_PROFILE_START';
const LOAD_PUBLIC_PROFILE_SUCCESS = 'LOAD_PUBLIC_PROFILE_SUCCESS';
const LOAD_PUBLIC_PROFILE_FAILURE = 'LOAD_PUBLIC_PROFILE_FAILURE';

const UPLOAD_AVATAR_START = 'UPLOAD_AVATAR_START';
const UPLOAD_AVATAR_SUCCESS = 'UPLOAD_AVATAR_SUCCESS';
const UPLOAD_AVATAR_FAILURE = 'UPLOAD_AVATAR_FAILURE';

const UPDATE_PROFILE_START = 'UPDATE_PROFILE_START';
const UPDATE_PROFILE_SUCCESS = 'UPDATE_PROFILE_SUCCESS';
const UPDATE_PROFILE_FAILURE = 'UPDATE_PROFILE_FAILURE';

export interface Profile {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  description: string;
}

export interface ProfileState {
  profile: Profile;
  isLoading: boolean;
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
interface LoadPublicProfileStartAction {
  type: typeof LOAD_PUBLIC_PROFILE_START;
  isLoading: boolean;
}

interface LoadPublicProfileSuccessAction {
  type: typeof LOAD_PUBLIC_PROFILE_SUCCESS;
  profile: Profile;
  isLoading: boolean;
}

interface LoadPublicProfileFailureAction {
  type: typeof LOAD_PUBLIC_PROFILE_FAILURE;
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

interface UpdateProfileStartAction {
  type: typeof UPDATE_PROFILE_START;
  isLoading: boolean;
}

interface UpdateProfileSuccessAction {
  type: typeof UPDATE_PROFILE_SUCCESS;
  name: string;
  description: string;
  isLoading: boolean;
}

interface UpdateProfileFailureAction {
  type: typeof UPDATE_PROFILE_FAILURE;
  isLoading: boolean;
}

export type ProfileActionTypes =
  | LoadProfileStartAction
  | LoadProfileSuccessAction
  | LoadProfileFailureAction
  | LoadPublicProfileStartAction
  | LoadPublicProfileSuccessAction
  | LoadPublicProfileFailureAction
  | UploadAvatarStartAction
  | UploadAvatarSuccessAction
  | UploadAvatarFailureAction
  | UpdateProfileStartAction
  | UpdateProfileSuccessAction
  | UpdateProfileFailureAction;

export const actionCreators = {
  getOrCreateProfile: (authToken: string) => {
    return async (dispatch: ThunkDispatch<{}, {}, any>, getState: () => AppState) => {
      dispatch({type: LOAD_PROFILE_START, isLoading: true});
      // special case where axios is not yet initialized, pass auth token manually
      return axios
        .get(`${API_URL}/profile`, {
          headers: {Authorization: 'Bearer ' + authToken},
        })
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
  getProfile: () => {
    return async (dispatch: ThunkDispatch<{}, {}, any>) => {
      dispatch({type: LOAD_PROFILE_START, isLoading: true});
      return axios
        .get('/profile')
        .then((response: any) => {
          const user = response.data;
          dispatch({type: LOAD_PROFILE_SUCCESS, isLoading: false, profile: user});
        })
        .catch(() => {
          dispatch({type: LOAD_PROFILE_FAILURE, isLoading: false});
        });
    };
  },
  getPublicProfile: (userId: string) => {
    return async (dispatch: ThunkDispatch<{}, {}, any>) => {
      dispatch({type: LOAD_PUBLIC_PROFILE_START, isLoading: true});
      return axios
        .get(`/profile/${userId}`)
        .then((response: any) => {
          const user = response.data;
          dispatch({type: LOAD_PUBLIC_PROFILE_SUCCESS, isLoading: false, profile: user});
        })
        .catch(() => {
          dispatch({type: LOAD_PUBLIC_PROFILE_FAILURE, isLoading: false});
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
  updateProfile: (name: string, description: string) => async (dispatch: ThunkDispatch<{}, {}, any>) => {
    dispatch({type: UPDATE_PROFILE_START, isLoading: true});
    axios
      .post('/profile/update', {name, description})
      .then(() => {
        dispatch({type: UPDATE_PROFILE_SUCCESS, isLoading: false, name, description});
        ToastsStore.success('Profil mis à jour ✔️');
      })
      .catch(() => {
        dispatch({type: UPDATE_PROFILE_FAILURE, isLoading: false});
      });
  },
};

const initialState: ProfileState = {
  isLoading: false,
  profile: {
    id: '',
    name: '',
    email: '',
    avatarUrl: '',
    description: '',
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
    case LOAD_PUBLIC_PROFILE_START:
      return {...state, isLoading: action.isLoading};
    case LOAD_PUBLIC_PROFILE_SUCCESS:
      return {...state, isLoading: action.isLoading, profile: action.profile};
    case LOAD_PUBLIC_PROFILE_FAILURE:
      return {...state, isLoading: action.isLoading};
    case UPLOAD_AVATAR_START:
      return {...state, isLoading: action.isLoading};
    case UPLOAD_AVATAR_SUCCESS:
      return {...state, isLoading: action.isLoading, profile: {...state.profile, avatarUrl: action.avatarUrl}};
    case UPLOAD_AVATAR_FAILURE:
      return {...state, isLoading: action.isLoading};
    case UPDATE_PROFILE_START:
      return {...state, isLoading: action.isLoading};
    case UPDATE_PROFILE_SUCCESS:
      return {...state, isLoading: action.isLoading, profile: {...state.profile, name: action.name, description: action.description}};
    case UPDATE_PROFILE_FAILURE:
      return {...state, isLoading: action.isLoading};
    default:
      return state;
  }
};

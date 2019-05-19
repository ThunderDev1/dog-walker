import {combineReducers} from 'redux';
import {User} from 'oidc-client';
import {RouterState, connectRouter} from 'connected-react-router';
import {History} from 'history';
import {reducer as oidcReducer} from 'redux-oidc';

import * as Map from './map';
import * as Profile from './profile';

interface OidcState {
  isLoadingUser: boolean;
  user: User;
}

export interface AppState {
  router: RouterState;
  oidc: OidcState;
  map: Map.MapState;
  profile: Profile.ProfileState;
}

const rootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    oidc: oidcReducer,
    map: Map.reducer,
    profile: Profile.reducer,
  });

export default rootReducer;

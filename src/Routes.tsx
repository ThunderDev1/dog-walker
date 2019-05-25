import * as React from 'react';
import {connect} from 'react-redux';
import {Route, Switch} from 'react-router-dom';
import {ToastsContainer, ToastsStore, ToastsContainerPosition} from 'react-toasts';

import CallbackPage from './components/CallbackPage';
import {AppState} from './store';

import userManager from './userManager';
import {User} from 'oidc-client';
import Nav from './components/Nav';
import AuthRoutes from './AuthRoutes';
import Spinner from './components/Spinner';
import {actionCreators, ProfileState} from './store/profile';
import {ThunkDispatch} from 'redux-thunk';
import * as OfflinePluginRuntime from 'offline-plugin/runtime';
import {useEffect} from 'react';

interface RoutesProps {
  user: User;
  isLoadingUser: boolean;
  dispatch: ThunkDispatch<{}, {}, any>;
  location: any;
  profile: ProfileState;
  getOrCreateProfile: (authToken: string) => void;
}

const Routes = (props: RoutesProps) => {

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      OfflinePluginRuntime.install();
    }
  }, []);

  // wait for user to be loaded, and location is known
  if (props.isLoadingUser || !props.location) {
    return <Spinner />;
  }

  // if location is callback page, return only CallbackPage route to allow signin process
  // IdentityServer 'bug' with hash history: if callback page contains a '#' params are appended with no delimiter
  // eg. /callbacktoken_id=...
  const url = props.location.pathname.substring(0, 9);
  if (url === '/callback') {
    const rest = props.location.pathname.substring(9);
    return <CallbackPage {...props} signInParams={`${url}#${rest}`} />;
  }

  // check if user is signed in
  userManager.getUser().then(user => {
    if (!user || user.expired) {
      userManager.signinRedirect({data: {path: window.location.pathname}});
    }
  });

  const {getOrCreateProfile, user, profile} = props;

  if (!user) return <Spinner />; 

  return (
    <React.Fragment>
      {profile.profile.name && <Nav />}
      <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.TOP_CENTER} />
      <Switch>
        <Route path="*" render={() => <AuthRoutes accessToken={user.access_token} getOrCreateProfile={getOrCreateProfile} profile={profile} />} />
      </Switch>
    </React.Fragment>
  );
};

function mapStateToProps(state: AppState) {
  return {
    user: state.oidc.user,
    isLoadingUser: state.oidc.isLoadingUser,
    location: state.router.location,
    profile: state.profile,
  };
}

function mapDispatchToProps(dispatch: ThunkDispatch<{}, {}, any>) {
  return {
    dispatch,
    getOrCreateProfile: (authToken: string) => dispatch(actionCreators.getOrCreateProfile(authToken)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Routes);

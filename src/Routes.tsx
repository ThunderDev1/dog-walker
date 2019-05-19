import * as React from 'react';
import {connect} from 'react-redux';
import {Route, Switch} from 'react-router-dom';
import {ToastsContainer, ToastsStore, ToastsContainerPosition} from 'react-toasts';

import CallbackPage from './components/CallbackPage';
import {AppState} from './store';

import userManager from './userManager';
import {User} from 'oidc-client';
import {Dispatch} from 'redux';
import Nav from './components/Nav';
import AuthRoutes from './AuthRoutes';

interface RoutesProps {
  user: User;
  isLoadingUser: boolean;
  dispatch: Dispatch;
  location: any;
}

const Routes = (props: RoutesProps) => {
  // wait for user to be loaded, and location is known
  if (props.isLoadingUser || !props.location) {
    return <div>Loading...</div>;
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

  const isConnected: boolean = !!props.user;

  if (!isConnected) return <div>Loading...</div>;

  return (
    <React.Fragment>
      <Nav />
      <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.BOTTOM_CENTER} />
      <Switch>
        <Route path="*" render={() => <AuthRoutes user={props.user} />} />
      </Switch>
    </React.Fragment>
  );
};

function mapStateToProps(state: AppState) {
  return {
    user: state.oidc.user,
    isLoadingUser: state.oidc.isLoadingUser,
    location: state.router.location,
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    dispatch,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Routes);

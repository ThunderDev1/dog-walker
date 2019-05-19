import MapContainer from './containers/MapContainer';

import * as React from 'react';
import {Route, Switch} from 'react-router-dom';
import {User} from 'oidc-client';
import UserInfo from './components/UserInfo';
import Contact from './components/Contact';
import {initAxios} from './utils/startupHelper';

interface AuthRoutesProps {
  user: User;
}

const AuthRoutes = (props: AuthRoutesProps) => {
  initAxios(props.user.access_token);
  console.log('render')

  return (
    <React.Fragment>
      <Switch>
        <Route exact path="/" component={MapContainer} />
        <Route path="/user" component={UserInfo} />
        <Route path="/contact" component={Contact} />
      </Switch>

    </React.Fragment>
  );
};

export default AuthRoutes;

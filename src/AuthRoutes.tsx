import MapContainer from './containers/MapContainer';

import * as React from 'react';
import {Route, Switch} from 'react-router-dom';
import {User} from 'oidc-client';
import UserProfile from './components/UserProfile';
import Contact from './components/Contact';
import {initAxios} from './utils/startupHelper';
import FriendList from './components/FriendList';
import PublicProfile from './components/PublicProfile';
import MeetingList from './components/meetings/MeetingList';

interface AuthRoutesProps {
  user: User;
}

const AuthRoutes = (props: AuthRoutesProps) => {
  initAxios(props.user.access_token);
  return (
    <React.Fragment>
      <Switch>
        <Route exact path="/" component={MapContainer} />
        <Route exact path="/user" component={UserProfile} />
        <Route path="/user/:userId" component={PublicProfile} />
        <Route path="/friends" component={FriendList} />
        <Route path="/contact" component={Contact} />
        <Route path="/meetings" component={MeetingList} />
      </Switch>
    </React.Fragment>
  );
};

export default AuthRoutes;

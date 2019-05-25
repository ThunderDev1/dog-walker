import * as React from 'react';
import {useEffect} from 'react';
import {Route, Switch} from 'react-router-dom';
import * as moment from 'moment';
import UserProfile from './components/UserProfile';
import Contact from './components/Contact';
import {initAxios} from './utils/startupHelper';
import FriendList from './components/FriendList';
import PublicProfile from './components/PublicProfile';
import MeetingList from './components/meetings/MeetingList';
import MeetingDetails from './components/meetings/MeetingDetails';
import MapContainer from './containers/MapContainer';
import {ProfileState} from './store/profile';
import Spinner from './components/Spinner';

interface AuthRoutesProps {
  accessToken: string;
  profile: ProfileState;
  getOrCreateProfile: (authToken: string) => void;
}

const AuthRoutes = (props: AuthRoutesProps) => {
  useEffect(() => {
    moment.locale('fr');
    // get profile if not loaded and not loading
    if (!props.profile.profile.id && !props.profile.isLoading) {
      props.getOrCreateProfile(props.accessToken);
    }
  }, []);

  initAxios(props.accessToken);

  const {profile} = props.profile;
  // wait for profile to load
  if (!profile.id) return <Spinner />;

  // force account creation page
  if (!profile.name) return <UserProfile />;

  return (
    <React.Fragment>
      <Switch>
        <Route exact path="/" component={MapContainer} />
        <Route exact path="/user" component={UserProfile} />
        <Route path="/user/:userId" component={PublicProfile} />
        <Route path="/friends" component={FriendList} />
        <Route path="/contact" component={Contact} />
        <Route path="/meetings" component={MeetingList} />
        <Route path="/meeting/:meetingId" component={MeetingDetails} />
      </Switch>
    </React.Fragment>
  );
};

export default AuthRoutes;

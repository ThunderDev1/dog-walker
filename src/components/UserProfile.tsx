import * as React from 'react';
import {connect} from 'react-redux';
import {AppState} from '../store';
import * as ProfileStore from '../store/profile';
import {useEffect} from 'react';

interface DispatchProps {
  getProfile: () => void;
}

type UserProfileProps = ProfileStore.ProfileState & DispatchProps;

const UserProfile = (props: UserProfileProps) => {
  useEffect(() => {
    props.getProfile();
  }, []);

  return (
    <div className="container">
      <fieldset disabled>
        <div className="form-group">
          <label className="form-label">Email</label>
          <input className="form-input" type="text" defaultValue={props.profile.email} />
        </div>
      </fieldset>
    </div>
  );
};

export default connect(
  (state: AppState) => ({...state.profile}),
  ProfileStore.actionCreators
)(UserProfile);

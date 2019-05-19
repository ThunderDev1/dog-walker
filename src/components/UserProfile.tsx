import * as React from 'react';
import {connect} from 'react-redux';
import {AppState} from '../store';
import * as ProfileStore from '../store/profile';
import {useEffect} from 'react';
import {FileUpload} from './utilities/FileUpload';

interface DispatchProps {
  getProfile: () => void;
  uploadAvatar: (fileBase64: string, fileType: string, fileName: string) => Promise<void>;
}

type UserProfileProps = ProfileStore.ProfileState & DispatchProps;

const UserProfile = (props: UserProfileProps) => {
  useEffect(() => {
    props.getProfile();
  }, []);

  return (
    <div className="container">
      <div className="">
        <FileUpload submitFile={props.uploadAvatar} maxWidth={300} maxHeight={300} isUploading={props.isLoading}>
          <div className="">
            <img src={props.profile.avatarUrl} alt="user avatar" className="s-circle p-centered" style={{height: '200px'}}/>
          </div>
        </FileUpload>
      </div>
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

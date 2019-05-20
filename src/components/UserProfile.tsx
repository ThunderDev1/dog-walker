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

  const renderEmptyView = () => {
    return (
      <div className="empty">
        <p className="empty-title h5">{`Vous n'avez pas de photo`}</p>
        <p className="empty-subtitle">Cliquez ici pour ajouter une photo de votre chien</p>
      </div>
    );
  };

  return (
    <div className="my-2">
      <FileUpload submitFile={props.uploadAvatar} maxWidth={300} maxHeight={300} isUploading={props.isLoading}>
        {props.profile.avatarUrl ? (
          <img src={props.profile.avatarUrl} alt="user avatar" className="s-circle p-centered" style={{height: '200px'}} />
        ) : (
          renderEmptyView()
        )}
      </FileUpload>
      <div className="container">
        <fieldset disabled>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input className="form-input" type="text" defaultValue={props.profile.email} />
          </div>
        </fieldset>
      </div>
    </div>
  );
};

export default connect(
  (state: AppState) => ({...state.profile}),
  ProfileStore.actionCreators
)(UserProfile);

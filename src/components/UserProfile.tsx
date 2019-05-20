import * as React from 'react';
import {connect} from 'react-redux';
import {AppState} from '../store';
import * as ProfileStore from '../store/profile';
import {useEffect, useRef} from 'react';
import {FileUpload} from './utilities/FileUpload';

interface DispatchProps {
  getProfile: () => void;
  uploadAvatar: (fileBase64: string, fileType: string, fileName: string) => Promise<void>;
  submitName: (name: string) => void;
}

type UserProfileProps = ProfileStore.ProfileState & DispatchProps;

const UserProfile = (props: UserProfileProps) => {
  const nameRef = useRef<HTMLInputElement>(null);

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
        <fieldset>
          <div className="form-group">
            <label className="form-label">Nom de votre animal</label>
            <div className="has-icon-right">
              <input type="text" ref={nameRef} className="form-input" defaultValue={props.profile.name} placeholder="ex: Nova" />
              {props.isNameLoading ? (
                <i className="form-icon loading" />
              ) : (
                <i className="form-icon icon icon-check" onClick={() => nameRef.current && props.submitName(nameRef.current.value)} />
              )}
            </div>
            <label className="form-label">Email</label>
            <input className="form-input" type="text" defaultValue={props.profile.email} disabled />
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

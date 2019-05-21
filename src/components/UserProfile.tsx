import * as React from 'react';
import {connect} from 'react-redux';
import {AppState} from '../store';
import * as ProfileStore from '../store/profile';
import {useEffect, useRef} from 'react';
import {FileUpload} from './utilities/FileUpload';

interface DispatchProps {
  getProfile: () => void;
  uploadAvatar: (fileBase64: string, fileType: string, fileName: string) => Promise<void>;
  updateProfile: (name: string, description: string) => void;
}

type UserProfileProps = ProfileStore.ProfileState & DispatchProps;

const UserProfile = (props: UserProfileProps) => {
  const nameRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    props.getProfile();
  }, []);

  const handleSave = () => {
    const name = (nameRef.current && nameRef.current.value) || '';
    const description = (descRef.current && descRef.current.value) || '';
    props.updateProfile(name, description);
  };

  const renderEmptyView = () => {
    return (
      <div className="empty">
        <p className="empty-title h5">{`Vous n'avez pas de photo`}</p>
        <p className="empty-subtitle">Cliquez ici pour ajouter une photo de votre chien</p>
      </div>
    );
  };

  console.log(props.profile.avatarUrl);

  return (
    <div className="my-2">
      <FileUpload submitFile={props.uploadAvatar} maxWidth={300} maxHeight={300} isUploading={false}>
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
            <input type="text" ref={nameRef} className="form-input" defaultValue={props.profile.name} placeholder="ex: Nova" />
            <label className="form-label">Description</label>
            <input
              className="form-input"
              type="text"
              ref={descRef}
              defaultValue={props.profile.description}
              placeholder="ex: Chien plein d'énergie"
            />
            <label className="form-label">Email</label>
            <input className="form-input" type="text" defaultValue={props.profile.email} disabled />
          </div>
        </fieldset>
        <button className={'btn btn-primary p-centered' + (props.isLoading ? ' loading' : '')} onClick={() => handleSave()}>
          Sauvegarder
        </button>
      </div>
    </div>
  );
};

export default connect(
  (state: AppState) => ({...state.profile}),
  ProfileStore.actionCreators
)(UserProfile);

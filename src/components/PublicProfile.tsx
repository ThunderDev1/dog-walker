import * as React from 'react';
import {connect} from 'react-redux';
import {AppState} from '../store';
import * as ProfileStore from '../store/profile';
import {useEffect} from 'react';
import {RouteComponentProps} from 'react-router';

interface DispatchProps {
  getPublicProfile: (userId: string) => void;
}

type PublicProfileProps = ProfileStore.ProfileState 
& DispatchProps 
& RouteComponentProps<{userId: string}>;

const PublicProfile = (props: PublicProfileProps) => {
  useEffect(() => {
    props.getPublicProfile(props.match.params.userId);
  }, []);

  const renderEmptyView = () => {
    return (
      <div className="empty">
        <p className="empty-title h5">{`Cet utilisateur n'a pas encore de photo de profil`}</p>
      </div>
    );
  };

  return (
    <div className="my-2">
      {props.profile.avatarUrl ? (
        <img src={props.profile.avatarUrl} alt="user avatar" className="s-circle p-centered" style={{height: '200px'}} />
      ) : (
        renderEmptyView()
      )}
      <div className="container">
        <div className="h5 text-center m-2">{props.profile.name}</div>
        <div className="text-gray text-center m-2">{props.profile.description}</div>
      </div>
    </div>
  );
};

export default connect(
  (state: AppState) => ({...state.profile}),
  ProfileStore.actionCreators
)(PublicProfile);

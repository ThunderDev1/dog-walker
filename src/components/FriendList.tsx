import * as React from 'react';
import {connect} from 'react-redux';
import {AppState} from '../store';
import * as FriendListStore from '../store/friendList';
import {useEffect} from 'react';

interface DispatchProps {
  getFriends: () => void;
}

type FriendListProps = FriendListStore.FriendListState & DispatchProps;

const FriendList = (props: FriendListProps) => {
  useEffect(() => {
    props.getFriends();
  }, []);

  const renderEmptyView = () => {
    return (
      <div className="empty">
        <p className="empty-title h5">{`Vous n'avez pas d'amis :(`}</p>
      </div>
    );
  };

  return (
    <div className="container my-2">
      {!props.isLoading && props.friendList.length == 0 && renderEmptyView()}
      {props.friendList.map(user => (
        <div className="tile tile-centered my-2" key={user.id}>
          <div className="tile-icon">
            <figure className="avatar avatar-lg" data-initial="?">
              {user.avatarUrl && <img src={user.avatarUrl} alt="Avatar" />}
            </figure>
          </div>
          <div className="tile-content">
            <p className="tile-title">{user.name}</p>
            <small className="tile-subtitle text-gray">{user.description}</small>
          </div>
        </div>
      ))}
    </div>
  );
};

export default connect(
  (state: AppState) => ({...state.friendList}),
  FriendListStore.actionCreators
)(FriendList);

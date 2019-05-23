import * as React from 'react';
import {connect} from 'react-redux';
import {AppState} from '../store';
import * as FriendListStore from '../store/friendList';
import {useEffect} from 'react';
import {Link} from 'react-router-dom';
import UserItem from './UserItem';

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
        <Link to={`/user/${user.id}`} key={user.id}>
          <UserItem user={user} />
        </Link>
      ))}
    </div>
  );
};

export default connect(
  (state: AppState) => ({...state.friendList}),
  FriendListStore.actionCreators
)(FriendList);

import * as React from 'react';
import {User} from '../store/friendList';

export interface UserItemState {
  user: User;
}

const UserItem = (props: UserItemState) => {
  const {user} = props;
  return (
    <div className="tile tile-centered my-2">
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
  );
};

export default UserItem;

import * as React from 'react';
import {MeetingStatus, Guest} from '../../store/meetings';
import {Link} from 'react-router-dom';
import UserItem from '../UserItem';

export interface GuestListProps {
  guests: Guest[];
}

const GuestList = (props: GuestListProps) => {
  const {guests} = props;

  const going = guests.filter(guest => guest.status == MeetingStatus.Going);
  const noGoing = guests.filter(guest => guest.status == MeetingStatus.NotGoing);
  const pending = guests.filter(guest => guest.status == MeetingStatus.Pending);

  return (
    <div className="container my-2">
      <span className="h5">Viennent</span>
      {going.map(user => (
        <Link to={`/user/${user.id}`} key={user.id}>
          <UserItem user={user} />
        </Link>
      ))}

      {noGoing.length > 0 && <span className="h5">Ne viennent pas</span>}
      {noGoing.map(user => (
        <Link to={`/user/${user.id}`} key={user.id}>
          <UserItem user={user} />
        </Link>
      ))}

      {pending.length > 0 && <span className="h5">Invités</span>}
      {pending.map(user => (
        <Link to={`/user/${user.id}`} key={user.id}>
          <UserItem user={user} />
        </Link>
      ))}
    </div>
  );
};

export default GuestList;

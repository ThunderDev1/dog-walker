import * as React from 'react';
import {connect} from 'react-redux';
import {AppState} from '../../store';
import * as MeetingListStore from '../../store/meetings/meetingList';
import {useEffect} from 'react';
import {Link} from 'react-router-dom';
import * as moment from 'moment';

interface DispatchProps {
  getMeetings: () => void;
}

type MeetingListProps = MeetingListStore.MeetingListState & DispatchProps;

const MeetingList = (props: MeetingListProps) => {
  useEffect(() => {
    props.getMeetings();
  }, []);

  const renderEmptyView = () => {
    return (
      <div className="empty">
        <p className="empty-title h5">{`Il n'y a aucune balade en cours`}</p>
      </div>
    );
  };

  const renderStatus = (endDate: string) => {
    const now = moment();
    const isPastEvent = moment(endDate, moment.ISO_8601).diff(now) < 0;
    if (isPastEvent) {
      return <span className="label label-warning">Terminé</span>;
    } else {
      return <span className="label label-success">En cours</span>;
    }
  };

  return (
    <div className="container my-2">
      {!props.isLoading && props.meetingList.length == 0 && renderEmptyView()}
      {props.meetingList.map(meeting => (
        <Link to={`/meeting/${meeting.meetingId}`} key={meeting.meetingId}>
          <div className="tile tile-centered my-2">
            <div className="tile-icon">
              <figure className="avatar avatar-lg" data-initial="?">
                {meeting.creatorAvatarUrl && <img src={meeting.creatorAvatarUrl} alt="Avatar" />}
              </figure>
            </div>
            <div className="tile-content">
              <p className="tile-title">{meeting.title}</p>
              <small className="tile-subtitle text-gray">{meeting.placeName}</small>
            </div>
            <div className="tile-action">
              {renderStatus(meeting.endDate)}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default connect(
  (state: AppState) => ({...state.meetings.meetingList}),
  MeetingListStore.actionCreators
)(MeetingList);

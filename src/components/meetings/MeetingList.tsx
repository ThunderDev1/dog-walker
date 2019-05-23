import * as React from 'react';
import {connect} from 'react-redux';
import {AppState} from '../../store';
import * as MeetingListStore from '../../store/meetings/meetingList';
import {useEffect} from 'react';
import {Link} from 'react-router-dom';
import StatusLabel from './StatusLabel';

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

  return (
    <React.Fragment>
      {!props.isLoading && props.meetingList.length == 0 && renderEmptyView()}
      <div className="container my-2">
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
                <StatusLabel date={meeting.endDate} />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </React.Fragment>
  );
};

export default connect(
  (state: AppState) => ({...state.meetings.meetingList}),
  MeetingListStore.actionCreators
)(MeetingList);

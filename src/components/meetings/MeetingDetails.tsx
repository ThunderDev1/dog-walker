import * as React from 'react';
import {connect} from 'react-redux';
import {AppState} from '../../store';
import * as MeetingDetailsStore from '../../store/meetings/meetingDetails';
import {useEffect} from 'react';
import {RouteComponentProps} from 'react-router-dom';
import * as moment from 'moment';
import StatusLabel from './StatusLabel';
import GuestList from './GuestList';
import {MeetingStatus} from '../../store/meetings';

interface DispatchProps {
  getMeeting: (meetingId: number) => void;
  updateStatus: (meetingId: number, status: MeetingStatus) => void;
}

type MeetingDetailsProps = MeetingDetailsStore.MeetingDetailsState & DispatchProps & RouteComponentProps<{meetingId: string}>;

const MeetingDetails = (props: MeetingDetailsProps) => {
  useEffect(() => {
    const meetingId = Number(props.match.params.meetingId);
    props.getMeeting(meetingId);
  }, []);

  const {meeting} = props;
  const subtitle = `Créé par ${meeting.isCreator ? 'vous' : meeting.creatorName} ${moment(meeting.startDate).fromNow()}`;
  const isHappening = moment(meeting.endDate, moment.ISO_8601).diff(moment()) > 0;
  const remainingTime = moment(meeting.endDate, moment.ISO_8601).fromNow();
  const showActions = !meeting.isCreator && meeting.status == MeetingStatus.Pending && isHappening;

  return (
    <div className="container py-2">
      <div className="columns">
        <div className="column col-12 py-1">
          <div className="h4">{meeting.title}</div>
          <span className="text-gray">{subtitle}</span>
        </div>
      </div>
      {isHappening && (
        <div className="columns">
          <div className="column col-9">Se termine {remainingTime}</div>
        </div>
      )}
      <div className="columns">
        <div className="column col-3">
          <StatusLabel date={meeting.endDate} />
        </div>
      </div>

      {showActions && (
        <div className="columns" style={{margin: '30px'}}>
          <div className="column col-6">
            <button className="btn p-centered" onClick={() => props.updateStatus(meeting.meetingId, MeetingStatus.NotGoing)}>
              Peux pas
            </button>
          </div>
          <div className="column col-6">
            <button className="btn btn-primary p-centered" onClick={() => props.updateStatus(meeting.meetingId, MeetingStatus.Going)}>
              Oui, je viens!
            </button>
          </div>
        </div>
      )}
      <div className="columns">
        <div className="column col-12">
          <GuestList guests={meeting.guests} />
        </div>
      </div>
    </div>
  );
};

export default connect(
  (state: AppState) => ({...state.meetings.meetingDetails}),
  MeetingDetailsStore.actionCreators
)(MeetingDetails);

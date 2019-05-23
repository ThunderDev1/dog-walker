import * as React from 'react';

interface Props {
  meetingId: number;
  cancelMeeting: (meetingId: number) => void;
}

const CancelMeetingButton = (props: Props) => {
  const {meetingId, cancelMeeting} = props;
  return (
    <div className="card fixed-bottom m-2 bg-warning" style={{color: 'white'}} onClick={() => cancelMeeting(meetingId)}>
      <div className="card-header">
        <div className="card-title h5 text-center">Terminer la balade</div>
      </div>
    </div>
  );
};

export default CancelMeetingButton;

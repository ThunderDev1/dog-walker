import * as React from 'react';

interface Props {
  meetingId: number;
  cancelMeeting: (meetingId: number) => void;
}

const CancelMeetingButton = (props: Props) => {
  const {meetingId, cancelMeeting} = props;
  return (
    <div className="card fixed-bottom m-2 bg-error text-secondary p-2" onClick={() => cancelMeeting(meetingId)}>
      <div className="card-title h5 text-center">Terminer la balade</div>
    </div>
  );
};

export default CancelMeetingButton;

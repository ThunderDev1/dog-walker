import * as React from 'react';
import * as pug from '../../assets/pug-small.gif';
import {Link} from 'react-router-dom';

interface Props {
  meetingId: number;
}

const CurrentMeetingButton = (props: Props) => {
  const {meetingId} = props;
  return (
    <Link to={`/meeting/${meetingId}`}>
      <div className="card fixed-bottom m-2" style={{bottom: '70px'}}>
        <div className="columns p-2">
          <div className="column col-7 text-center my-1">
            <span className="h5">Balade en cours</span>
          </div>
          <div className="column col-5">
            <img src={pug} className="p-centered" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CurrentMeetingButton;

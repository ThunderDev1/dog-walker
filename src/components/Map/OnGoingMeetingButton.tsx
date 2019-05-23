import * as React from 'react';
import {Link} from 'react-router-dom';
import * as pug from '../../assets/pug.gif';

interface Props {
  meetingId: number;
}

const OnGoingMeetingButton = (props: Props) => {
  return (
    <Link to={`/meeting/${props.meetingId}`}>
      <div className="card fixed-bottom m-2">
        <div className="card-header">
          <div className="columns">
            <div className="column col-8 py-2">
              <span className="card-title h4">Balade en cours</span>
            </div>
            <div className="column col-4">
              <img src={pug} className="p-centered"/>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default OnGoingMeetingButton;

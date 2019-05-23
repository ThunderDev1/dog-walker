import * as React from 'react';

interface Props {
  click: () => void;
}

const CreateMeetingButton = (props: Props) => {
  return (
    <div className="card fixed-bottom m-2" style={{'backgroundColor': '#5755d9', 'color': 'white'}} onClick={() => props.click()}>
      <div className="card-header">
        <div className="card-title h5">Démarrer une balade</div>
      </div>
    </div>
  );
};

export default CreateMeetingButton;

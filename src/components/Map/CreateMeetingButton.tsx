import * as React from 'react';

interface Props {
  click: () => void;
}

const CreateMeetingButton = (props: Props) => {
  return (
    <div className="card fixed-bottom m-2 bg-primary text-secondary" onClick={() => props.click()}>
      <div className="card-header">
        <div className="card-title h5 text-center">Démarrer une balade</div>
      </div>
    </div>
  );
};

export default CreateMeetingButton;

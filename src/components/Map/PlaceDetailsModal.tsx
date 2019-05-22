import * as React from 'react';
import {PlaceDetails} from '../../store/meetings/createMeeting';
import placeTypes from '../../constants/placeTypes';

interface DispatchProps {
  close: () => void;
  delete: (placeId: number) => void;
}

type PlaceDetailsModal = PlaceDetails & DispatchProps;

const PlaceDetailsModal = (props: PlaceDetailsModal) => {
  const handleDelete = () => {
    props.delete(props.id);
    props.close();
  };

  return (
    <div className="card fixed-bottom m-2">
      <div className="card-header">
        <div className="card-title h5">{placeTypes[props.placeTypeId]}</div>
      </div>
      {props.name != null && <div className="card-body">{props.name}</div>}
      <div className="card-footer">
        <button className="btn btn-secondary" onClick={() => props.close()}>
          Annuler
        </button>
        <button className="btn btn-error mx-1" onClick={() => handleDelete()}>
          Supprimer
        </button>
      </div>
    </div>
  );
};

export default PlaceDetailsModal;

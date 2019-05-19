import * as React from 'react';
import {ChangeEvent, useState} from 'react';

interface AddPlaceProps {
  close: () => void;
  addPlace: (placeTypeId: number) => void;
}

const AddPlace = (props: AddPlaceProps) => {
  const [placeTypeId, setPlaceTypeId] = useState(1);

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setPlaceTypeId(Number(event.target.value));
  };

  const handleSubmit = () => {
    props.addPlace(placeTypeId);
    props.close();
  };

  return (
    <div className="card add-place m-2">
      <div className="card-header">
        <div className="card-title h5">Ajouter ce lieu</div>
      </div>
      <div className="card-body">
        <div className="form-group">
          <select className="form-select" value={placeTypeId} onChange={handleChange}>
            <option value="1">Point sachet</option>
            <option value="2">Point balade</option>
          </select>
        </div>
      </div>
      <div className="card-footer">
        <button className="btn btn-secondary" onClick={() => props.close()}>
          Annuler
        </button>
        <button className="btn btn-primary mx-1" onClick={() => handleSubmit()}>
          Ajouter
        </button>
      </div>
    </div>
  );
};

export default AddPlace;

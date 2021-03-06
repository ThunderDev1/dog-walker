import * as React from 'react';
import {useEffect} from 'react';
import {PlaceDetails} from '../../store/meetings/createMeeting';

interface CreateMeetingProps {
  places: PlaceDetails[];
  close: () => void;
  createMeeting: (placeId: number) => void;
  loadPlaces: () => void;
}

const CreateMeeting = (props: CreateMeetingProps) => {
  const [selectedPlace, setSelectedPlace] = React.useState(0);

  useEffect(() => {
    props.loadPlaces();
  }, []);

  const handleSubmit = () => {
    props.createMeeting(selectedPlace);
    props.close();
  };

  const renderEmptyView = () => {
    return (
      <div className="empty">
        <p className="empty-title h5">{`Aucun lieu disponible`}</p>
        <p className="empty-subtitle">Veuillez ajouter des nouveaux lieux</p>
      </div>
    );
  };

  return (
    <div className="card fixed-bottom m-2" style={{maxHeight: '85%'}}>
      <div className="card-header">
        <div className="card-title h5">Choisissez un lieu</div>
      </div>
      <div className="card-body" style={{overflowX: 'scroll'}}>
        {props.places.length === 0 && renderEmptyView()}
        {props.places.map((place: PlaceDetails) => (
          <div
            className={`tile tile-centered my-2 p-2 ${selectedPlace === place.id ? 'selected' : ''}`}
            key={place.id}
            onClick={() => setSelectedPlace(place.id)}>
            <div className="tile-content">
              <p className="tile-title">{place.name}</p>
              <small className="tile-subtitle text-gray">{`${Math.floor(place.distance * 100000)}m`}</small>
            </div>
            {selectedPlace === place.id && <div className="tile-action">
              <button className="btn btn-link">
                <i className="icon icon-check" />
              </button>
            </div>}
          </div>
        ))}
      </div>
      <div className="card-footer">
        <div className="columns">
          <div className="column col-6">
            <button className="btn p-centered" onClick={() => props.close()}>
              Annuler
            </button>
          </div>
          <div className="column col-6">
            <button className={`btn btn-primary p-centered ${selectedPlace ? '' : 'disabled'}`} onClick={() => handleSubmit()}>
              Valider
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateMeeting;

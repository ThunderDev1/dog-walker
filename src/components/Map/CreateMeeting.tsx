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
    props.createMeeting(selectedPlace)
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
    <div className="card fixed-bottom m-2">
      <div className="card-header">
        <div className="card-title h5">Cliquez sur le lieu de la balade</div>
      </div>
      <div className="card-body">
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
            <div className="tile-action">
              <button className="btn btn-link">
                <i className="icon icon-check" />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="card-footer">
        <button className="btn btn-secondary" onClick={() => props.close()}>
          Annuler
        </button>
        <button className="btn btn-primary mx-1" onClick={() => handleSubmit()}>
          Valider
        </button>
      </div>
    </div>
  );
};

export default CreateMeeting;

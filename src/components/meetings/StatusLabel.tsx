import * as React from 'react';
import * as moment from 'moment';

interface StatusLabelProps {
  date: string;
}

const StatusLabel = (props: StatusLabelProps) => {
  const now = moment();
  const isPastEvent = moment(props.date, moment.ISO_8601).diff(now) < 0;
  if (isPastEvent) {
    return <span className="label label-warning">Terminé</span>;
  } else {
    return <span className="label label-success">En cours</span>;
  }
};

export default StatusLabel;

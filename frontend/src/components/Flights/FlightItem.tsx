import * as React from 'react';
import { Flight } from '../../Models/Flight';
import './FlightItem.css'
import { format } from 'date-fns'

export interface IFlightItemProps {
  flight: Flight
}

const toHHMM = (secs: number) => {
  var hours = Math.floor(secs / 1000 / 3600) % 24
  var minutes = Math.floor(secs / 1000 / 60) % 60
  return [hours, minutes]
    .map(v => v < 10 ? "0" + v : v)
    .filter((v, i) => v !== "00" || i > 0)
    .join(":")
}

export function FlightItem(props: IFlightItemProps) {
  return (
    <div className="row">
      <div className="column">
        {props.flight.flightCode}
      </div>
      <div className="column">
        {props.flight.depStation}
      </div>
      <div className="column">
        {props.flight.arrStation}
      </div>
      <div className="column">
        {format(new Date(props.flight.depDateTime), 'dd.MM. HH:mm')}
      </div>
      <div className="column">
        {format(new Date(props.flight.arrDateTime), 'dd.MM. HH:mm')}
      </div>
      <div className="column">
        {toHHMM(new Date(props.flight.arrDateTime).getTime() - new Date(props.flight.depDateTime).getTime())}
      </div>

    </div>
  );
}

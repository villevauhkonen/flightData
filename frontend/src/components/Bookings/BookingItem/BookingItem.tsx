import * as React from 'react';
import './BookingItem.css'
import { BookingType } from '../../../Models/Booking';

export interface IBookingItemProps {
  booking: BookingType
  overweightLimit: number
}

export function BookingItem(props: IBookingItemProps) {
  const alertClass = props.booking.totalWeight > props.overweightLimit ? 'alert' : ''
  return (
    <div className="row">
      <div className="column">
        {props.booking.flightCode}
      </div>
      <div className="column">
        {props.booking.count}
      </div>
      <div className="column">
        {props.booking.totalVolume.toFixed(1)}
      </div>
      <div className={"column " + alertClass}>
        {props.booking.totalWeight.toFixed(1)}
      </div>
    </div>
  );
}

import * as React from 'react';

export interface IBookingProps {
}

export interface IBookingState {
}

export default class Booking extends React.Component<IBookingProps, IBookingState> {
  constructor(props: IBookingProps) {
    super(props);

    this.state = {
    }
  }

  public render() {
    return (
      <div>
        bookings
      </div>
    );
  }
}

import * as React from 'react';
import './BookingItemHeader.css'

interface IBookingItemHeaderProps {
  sortData: (selector: string) => void
}

export default class BookingItemHeader extends React.Component<IBookingItemHeaderProps, any> {
  public render() {
    return (
      <div className="headerRow">

        <div className="headerColumn" onClick={e => this.props.sortData('flightCode')}>
          FLIGHT CODE
        </div>
        <div className="headerColumn" onClick={e => this.props.sortData('count')}>
          BOOKING COUNT
        </div>
        <div className="headerColumn" onClick={e => this.props.sortData('totalVolume')}>
          TOTAL VOLUME
        </div>
        <div className="headerColumn" onClick={e => this.props.sortData('totalWeight')}>
          TOTAL WEIGHT
        </div>
      </div>
    )
  }
}

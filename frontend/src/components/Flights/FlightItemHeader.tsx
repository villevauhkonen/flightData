import * as React from 'react';
import './FlightItemHeader.css'

interface IFlightItemHeaderProps {
  sortData: (selector: string) => void
}

export default class FlightItemHeader extends React.Component<IFlightItemHeaderProps, any> {
  public render() {
    return (
      <div className="headerRow">

        <div className="headerColumn" onClick={e => this.props.sortData('flightCode')}>
          FLIGHT CODE
        </div>
        <div className="headerColumn" onClick={e => this.props.sortData('depStation')}>
          DEPARTURE STATION
        </div>
        <div className="headerColumn" onClick={e => this.props.sortData('arrStation')}>
          ARRIVAL STATION
        </div>
        <div className="headerColumn" onClick={e => this.props.sortData('depDate')}>
          DEPARTURE TIME
        </div>
        <div className="headerColumn" onClick={e => this.props.sortData('arrDate')}>
          ARRIVAL TIME
        </div>
        <div className="headerColumn">
          DURATION
        </div>

      </div>
    )
  }
}

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
          DEP STATION
        </div>
        <div className="headerColumn" onClick={e => this.props.sortData('arrStation')}>
          ARR STATION
        </div>
        <div className="headerColumn" onClick={e => this.props.sortData('depDateTime')}>
          DEP TIME
        </div>
        <div className="headerColumn" onClick={e => this.props.sortData('arrDateTime')}>
          ARR TIME
        </div>
        <div className="headerColumn">
          DURATION
        </div>

      </div>
    )
  }
}

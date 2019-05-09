import * as React from 'react';
import './FlightMenu.css'
import DatePicker from 'react-date-picker';
import { QueryObject } from '../../Models/QueryObject';

export interface IFlightMenuProps {
  updateQuery: (queryObject: QueryObject) => void
}

export default class FlightMenu extends React.Component<IFlightMenuProps, any> {
  constructor(props: IFlightMenuProps) {
    super(props);
    this.state = {
      flightCode: '',
      depStation: '',
      arrStation: '',
      depDate: null,
      arrDate: null
    }
  }

  setStateValue = (e: any) => {
    this.setState({
      [e.target.name]: e.target.value
    }, () => this.props.updateQuery(this.state as QueryObject))

  }

  setDepartureTime = (date: any) => {
    this.setState({
      depDate: date
    }, () => this.props.updateQuery(this.state as QueryObject))
  }

  setArrivalTime = (date: any) => {
    this.setState({
      arrDate: date
    }, () => this.props.updateQuery(this.state as QueryObject))
  }

  public render() {
    return (
      <div className="flightMenuContainer">

        <div className="inputElement">
          <p className="label">FLIGHT CODE</p>
          <input className="textInput" type="text" name="flightCode" value={this.state.flightCode} onChange={this.setStateValue} />
        </div>

        <div className="inputElement">
          <p className="label">DEPARTURE STATION</p>
          <input className="textInput" type="text" name="depStation" value={this.state.depAirport} onChange={this.setStateValue} />
        </div>

        <div className="inputElement">
          <p className="label">ARRIVAL STATION</p>
          <input className="textInput" type="text" name="arrStation" value={this.state.arrAirport} onChange={this.setStateValue} />
        </div>

        <div className="inputElement">
          <p className="label">DEPARTURE DATE</p>
          <DatePicker
            className="input"
            locale="fi-FI"
            onChange={this.setDepartureTime}
            value={this.state.depDate}
          />
        </div>

        <div className="inputElement">
          <p className="label">ARRIVAL DATE</p>
          <DatePicker
            className="input"
            locale="fi-FI"
            onChange={this.setArrivalTime}
            value={this.state.arrDate}
          />
        </div>

      </div>
    );
  }
}

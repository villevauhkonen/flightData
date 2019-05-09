import * as React from 'react';
import qs from 'qs'
import { Flight } from '../../Models/Flight';
import FlightMenu from './FlightMenu'
import './Flights.css'
import { GetRequest } from '../../Services/Api'

export interface IFlightProps {
}

export default class Flights extends React.Component<IFlightProps, any> {
  private timeout: any = null

  constructor(props: IFlightProps) {
    super(props);

    this.state = {
      queryData: '',
      flightData: [],
      error: false,
      loading: false
    }
  }

  triggerRequest = () => {
    this.setState({
      loading: true
    }, () => this.timeout = setTimeout(this.getData, 1000))
  }

  getData = async () => {
    const response = await GetRequest('http://localhost:5000/flights?', qs.stringify(this.state.queryData))
    if (response.status === 200) {
      this.setState({
        flightData: response.data,
        error: false,
        loading: false
      })
    } else {
      this.setState({
        error: true,
        loading: false
      })
    }
  }

  updateQuery = (queryObject: any) => {
    clearTimeout(this.timeout)
    Object.keys(queryObject).forEach(key => queryObject[key] === null || queryObject[key] === '' ? delete queryObject[key] : queryObject[key])
    this.setState({
      queryData: queryObject
    }, () => this.triggerRequest())

  }

  renderFlights = () => {
    const res = this.state.flightData.map((flight: Flight, index: number) => (<li key={index}>{flight.flightCode}</li>))
    return res
  }

  public render() {
    return (
      <div className="panel">
        <FlightMenu
          updateQuery={this.updateQuery}
        />
      </div>
    );
  }
}

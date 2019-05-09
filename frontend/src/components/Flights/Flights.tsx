import * as React from 'react';
import qs from 'qs'
import { Flight } from '../../Models/Flight';
import FlightMenu from './FlightMenu'
import './Flights.css'
import { GetRequest } from '../../Services/Api'
import { FlightItem } from './FlightItem';
import FlightItemHeader from './FlightItemHeader';

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
      loading: false,
      sortDirection: true
    }
  }

  componentDidMount() {
    this.getData()
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
    const res = this.state.flightData.map((flight: Flight, index: number) => (<FlightItem key={index} flight={flight} />))
    return res
  }

  sortData = (selector: string) => {
    const dir = this.state.sortDirection ? [1, -1] : [-1, 1]
    const result = this.state.flightData.sort((a: any, b: any) => (a[selector] > b[selector]) ? dir[0] : dir[1])
    this.setState({
      flightData: result,
      sortDirection: !this.state.sortDirection
    })
  }

  public render() {
    return (
      <div className="panel">
        <FlightMenu
          updateQuery={this.updateQuery}
        />
        {this.state.flightData.length > 0 &&
          <FlightItemHeader
            sortData={this.sortData}
          />
        }
        <div className="results">
          {this.renderFlights()}
        </div>
      </div>
    );
  }
}

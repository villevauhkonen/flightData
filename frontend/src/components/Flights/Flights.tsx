import * as React from 'react';
import qs from 'qs'
import { Flight } from '../../Models/Flight';
import FlightMenu from './FlightMenu/FlightMenu'
import './Flights.css'
import { GetRequest } from '../../Services/Api'
import { FlightItem } from './FlightItem/FlightItem'
import FlightItemHeader from './FlightItemHeader/FlightItemHeader'
import { Loader } from '../Loader/Loader'
import { sort, fakeDelay } from '../../utils/common'

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
      sortDirection: true,
      searchMessage: ''
    }
  }

  componentDidMount() {
    this.getData()
  }

  triggerRequest = () => {
    this.timeout = setTimeout(this.getData, 1000)
  }

  getData = async () => {
    this.setState({
      loading: true
    })
    await fakeDelay(2000)
    const response = await GetRequest('http://localhost:5000/flights?', qs.stringify(this.state.queryData))
    if (response.status === 200) {
      this.setState({
        flightData: response.data,
        error: false,
        loading: false,
        searchMessage: 'NO SEARCH RESULTS, CHECK PARAMETERS!'
      })
    } else {
      this.setState({
        error: true,
        loading: false,
        searchMessage: 'ERROR FETCHING DATA!'
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
    const result = sort(this.state.flightData, selector, this.state.sortDirection)
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
        {this.state.loading &&
          <Loader />
        }
        {this.state.flightData.length > 0 ?
          <FlightItemHeader
            sortData={this.sortData}
          /> :
          <div>{this.state.searchMessage}</div>
        }
        <div className="results">
          {this.renderFlights()}
        </div>
      </div>
    );
  }
}

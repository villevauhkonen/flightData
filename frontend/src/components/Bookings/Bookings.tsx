import * as React from 'react';
import { sort, fakeDelay } from '../../utils/common';
import { GetRequest } from '../../Services/Api';
import qs from 'qs'
import { BookingType } from '../../Models/Booking';
import { Loader } from '../Loader/Loader';
import './Bookings.css'
import BookingMenu from './BookingMenu/BookingMenu';
import BookingItemHeader from './BookingItemHeader/BookingItemHeader';
import { BookingItem } from './BookingItem/BookingItem';

export interface IBookingProps {
}

export default class Booking extends React.Component<IBookingProps, any> {
  private timeout: any
  constructor(props: IBookingProps) {
    super(props);
    this.state = {
      bookingData: [],
      queryData: '',
      error: false,
      loading: false,
      sortDirection: true,
      overWeightLimit: 10,
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
    const response = await GetRequest('http://localhost:5000/bookings?', qs.stringify(this.state.queryData))
    if (response.status === 200) {
      this.setState({
        bookingData: response.data,
        error: false,
        loading: false,
        searchMessage: 'NO SEARCH RESULTS, CHECK PARAMETERS!'
      })
    } else {
      this.setState({
        error: true,
        loading: false,
        searchMessage: 'ERROR FETCHING DATA'
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

  renderBookings = () => {
    const res = this.state.bookingData.map((booking: BookingType, index: number) => (<BookingItem key={index} booking={booking} overweightLimit={this.state.overWeightLimit} />))
    return res
  }

  sortData = (selector: string) => {
    const result = sort(this.state.bookingData, selector, this.state.sortDirection)
    this.setState({
      bookingData: result,
      sortDirection: !this.state.sortDirection
    })
  }

  updateOverweightLimit = (limit: number) => this.setState({ overWeightLimit: limit })

  public render() {
    return (
      <div className="panel">
        <BookingMenu
          updateQuery={this.updateQuery}
          updateOverweightLimit={this.updateOverweightLimit}
        />
        {this.state.loading &&
          <Loader />
        }
        {this.state.bookingData.length > 0 ?
          <BookingItemHeader
            sortData={this.sortData}
          /> :
          <div>{this.state.searchMessage}</div>
        }
        <div className="results">
          {this.renderBookings()}
        </div>
      </div>
    );
  }
}

import * as React from 'react';
import './BookingMenu.css'

export interface IBookingMenuProps {
  updateQuery: (queryObject: any) => void
  updateOverweightLimit: (limit: number) => void
}

export default class BookingMenu extends React.Component<IBookingMenuProps, any> {
  constructor(props: IBookingMenuProps) {
    super(props);
    this.state = {
      flightCode: '',
      overweightLimit: 10,
    }
  }

  updateQuery = (e: any) => {
    this.setState({
      [e.target.name]: e.target.value
    }, () => this.props.updateQuery(this.state))
  }

  updateOverweightLimit = (e: any) => {
    this.setState({
      [e.target.name]: e.target.value
    }, () => this.props.updateOverweightLimit(this.state.overweightLimit))
  }

  public render() {
    return (
      <div className="BookingMenuContainer">

        <div className="inputElement">
          <p className="label">FLIGHT CODE</p>
          <input className="textInput" type="text" name="flightCode" value={this.state.flightCode} onChange={this.updateQuery} />
        </div>

        <div className="inputElement">
          <p className="label">OVERWEIGHT LIMIT</p>
          <input className="textInput" type="text" name="overweightLimit" value={this.state.overweightLimit} onChange={this.updateOverweightLimit} />
        </div>

      </div>
    );
  }
}

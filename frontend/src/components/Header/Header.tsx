import * as React from 'react';
import './Header.css';
import HeaderButton from '../Buttons/HeaderButton';
import { Link } from 'react-router-dom';

export interface IHeaderProps {
}

export interface IHeaderState {
}

export default class Header extends React.Component<IHeaderProps, IHeaderState> {
  constructor(props: IHeaderProps) {
    super(props);

    this.state = {
    }
  }

  public render() {
    return (
      <>
        <div className="logo">
          <img src="/assets/images/avion-logo-png.png" alt="logo" />
        </div>
        <div className="buttons">
          <Link to='/flights'>
            <HeaderButton title="Flights" />
          </Link>
          <Link to='/bookings'>
            <HeaderButton title="Bookings" />
          </Link>
        </div>
      </>
    );
  }
}

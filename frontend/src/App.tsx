import React from 'react';
import './App.css';
import Flights from './components/Flights/Flights'
import Bookings from './components/Bookings/Bookings'
import Header from './components/Header/Header';
import { Route, BrowserRouter as Router } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <div className="header">
          <Header />
        </div>

        <div className="main">

          <Route exact path="/" component={Flights} />
          <Route exact path="/flights" component={Flights} />
          <Route exact path="/bookings" component={Bookings} />

        </div>
      </Router>
    </div>
  );
}

export default App;

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Location from './Location';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to Track My Trucker</h2>
        </div>
        <Location />
      </div>
    );
  }
}

export default App;

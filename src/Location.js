import React, { Component } from 'react';

class Location extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLocation: {}
    };
  }

  componentDidMount() {
    /* geolocation is available */
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.updateLocation(position)
      });
    }

    this.watchId = navigator.geolocation.watchPosition((position) => {
      this.updateLocation(position);
    });
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
  }

  updateLocation(pos) {
    this.setState({
      currentLocation: pos.coords
    });
  }

  render() {
    return (
      <div>
        {"geolocation" in navigator ? (
        <p>
          Your location is: <span>{this.state.currentLocation.latitude}</span>, <span>{this.state.currentLocation.longitude}</span>
        </p>
        ) : (
          <p>Geolocation is not supported by your browser</p>
        )}
      </div>
    );
  }
}

export default Location;
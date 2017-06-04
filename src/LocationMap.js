import React, { Component } from 'react';
import googleMaps from '@google/maps';

const googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyB0m-DzqagTyk0EFlOwZwQCwIZJnT96uSY',
  Promise: Promise
});

class LocationMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLocation: {},
      currentLocationURL: {}
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




    // // Geocode an address.
    // googleMapsClient.geocode({
    //   address: '1600 Amphitheatre Parkway, Mountain View, CA'
    // }, function(err, response) {
    //   if (!err) {
    //     console.log(response.json.results);
    //   }
    // });





    // this.map = new google.maps.Map(document.getElementById('map'), {
    //   center: { lat: -34.397, lng: 150.644 },
    //   zoom: 6
    // });
    // this.infoWindow = new google.maps.InfoWindow;

    // // Try HTML5 geolocation.
    // if (navigator.geolocation) {
    //   navigator.geolocation.getCurrentPosition(function (position) {
    //     var pos = {
    //       lat: position.coords.latitude,
    //       lng: position.coords.longitude
    //     };

    //     this.infoWindow.setPosition(pos);
    //     this.infoWindow.setContent('Location found.');
    //     this.infoWindow.open(this.map);
    //     this.map.setCenter(pos);
    //   }, function () {
    //     this.handleLocationError(true, this.infoWindow, this.map.getCenter());
    //   });
    // } else {
    //   // Browser doesn't support Geolocation
    //   this.handleLocationError(false, this.infoWindow, this.map.getCenter());
    // }





  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
  }

  updateLocation(pos) {
    this.getReverseGeo(pos);
    // fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${pos.coords.latitude},${pos.coords.longitude}&key=AIzaSyB0m-DzqagTyk0EFlOwZwQCwIZJnT96uSY`)
    //   .then((response) => {
    //     if (response.status !== 200) {
    //       console.log('Looks like there was a problem. Status Code: ' + response.status);
    //       return;
    //     }
    //     // Examine the text in the response  
    //     response.json().then(function (data) {
    //       console.log('data:', data);
    //     });
    //   })
    //   .catch((err) => {
    //     console.log('Fetch Error :-S', err);
    //   });

    this.setState({
      currentLocation: pos.coords,
      currentLocationURL: `//www.google.com/maps/embed/v1/view?key=AIzaSyB0m-DzqagTyk0EFlOwZwQCwIZJnT96uSY&zoom=15&center=${pos.coords.latitude},${pos.coords.longitude}`
      // currentLocationURL: `//www.google.com/maps/embed/v1/place?key=AIzaSyB0m-DzqagTyk0EFlOwZwQCwIZJnT96uSY&zoom=12&q=Lehi+Utah,USA`
    });
  }

  getReverseGeo(pos) {
    const query = {latlng: `${pos.coords.latitude},${pos.coords.longitude}`};
    googleMapsClient.reverseGeocode(query).asPromise().then((response) => {
      console.log('prom,,ise real', response);
      if(response.status === 200) {
      }
    });
  }

  handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
      'Error: The Geolocation service failed.' :
      'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(this.map);
  }

  render() {
    return (
      <div id="map">
        {"geolocation" in navigator ? (
          <p>
            Your location is: <span>{this.state.currentLocation.latitude}</span>, <span>{this.state.currentLocation.longitude}</span>
            <iframe
              title="locationMap"
              frameBorder="0"
              allowFullScreen
              style={{ border: 0 + 'px' }}
              src={this.state.currentLocationURL}
              height="500px"
              width="100%"
            >
            </iframe>
          </p>
        ) : (
            <p>Geolocation is not supported by your browser</p>
          )}
      </div>
    );
  }
}

export default LocationMap;




// // Note: This example requires that you consent to location sharing when
// // prompted by your browser. If you see the error "The Geolocation service
// // failed.", it means you probably did not give permission for the browser to
// // locate you.
// var map, infoWindow;
// function initMap() {
//   map = new google.maps.Map(document.getElementById('map'), {
//     center: { lat: -34.397, lng: 150.644 },
//     zoom: 6
//   });
//   infoWindow = new google.maps.InfoWindow;

//   // Try HTML5 geolocation.
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(function (position) {
//       var pos = {
//         lat: position.coords.latitude,
//         lng: position.coords.longitude
//       };

//       infoWindow.setPosition(pos);
//       infoWindow.setContent('Location found.');
//       infoWindow.open(map);
//       map.setCenter(pos);
//     }, function () {
//       handleLocationError(true, infoWindow, map.getCenter());
//     });
//   } else {
//     // Browser doesn't support Geolocation
//     handleLocationError(false, infoWindow, map.getCenter());
//   }
// }

// function handleLocationError(browserHasGeolocation, infoWindow, pos) {
//   infoWindow.setPosition(pos);
//   infoWindow.setContent(browserHasGeolocation ?
//     'Error: The Geolocation service failed.' :
//     'Error: Your browser doesn\'t support geolocation.');
//   infoWindow.open(map);
// }`
import React, { Component } from 'react';
import { Map } from 'react-arcgis';
import axios from 'axios';

import './App.css';
import Marker from './Marker';

class App extends Component {
  constructor() {
    super();
    this.state = { markers: [] };
  }

  componentDidMount() {
    this.fetchFoodTrucks().then(markers =>
      this.setState({ ...this.state, markers }),
    );
  }

  fetchFoodTrucks() {
    return axios
      .get(
        'https://data.sfgov.org/resource/6a9r-agq8.json?$where=status%20!=%20%27REQUESTED%27',
      )
      .then(response => this.parseFoodTruckResponse(response));
  }

  parseFoodTruckResponse(response) {
    return response.data.map(item => ({
      position: {
        latitude: Number(item.latitude),
        longitude: Number(item.longitude),
      },
      id: item.objectid,
      address: item.address,
      title: item.applicant,
      description: item.fooditems,
    }));
  }

  getMarkers() {
    return this.state.markers.map(marker => (
      <Marker key={marker.id} {...marker} />
    ));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">SF Food Trucks</h1>
        </header>
        <div className="App-map">
          <Map
            viewProperties={{
              center: { latitude: 37.758431, longitude: -122.426622 },
              zoom: 10,
            }}
          >
            {this.getMarkers()}
          </Map>
        </div>
      </div>
    );
  }
}

export default App;

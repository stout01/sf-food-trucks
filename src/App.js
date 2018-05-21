import React, { Component } from 'react';
import { Map } from 'react-arcgis';
import axios from 'axios';

import logo from './logo.svg';
import './App.css';
import Marker from './Marker';

class App extends Component {
  constructor() {
    super();
    this.state = { markers: [] };
  }

  componentDidMount() {
    axios
      .get(
        'https://data.sfgov.org/resource/6a9r-agq8.json?$where=status%20!=%20%27REQUESTED%27',
      )
      .then(response => {
        const markers = [];
        response.data.forEach(item => {
          markers.push({
            position: {
              latitude: Number(item.latitude),
              longitude: Number(item.longitude),
            },
            id: item.objectid,
            title: item.applicant,
            description: item.fooditems,
          });
        });
        this.setState({ ...this.state, markers });
      });
  }

  markerList() {
    return this.state.markers.map(marker => (
      <Marker key={marker.id} {...marker} />
    ));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <div style={{ height: '50vh' }}>
          <Map
            viewProperties={{
              center: { latitude: 37.758431, longitude: -122.426622 },
            }}
          >
            {this.markerList()}
          </Map>
        </div>
      </div>
    );
  }
}

export default App;

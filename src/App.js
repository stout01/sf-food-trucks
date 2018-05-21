import React, { Component } from 'react';
import { Map } from 'react-arcgis';

import logo from './logo.svg';
import './App.css';
import Marker from './Marker';

class App extends Component {
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
          <Map>
            <Marker
              position={{ latitude: 37.758431, longitude: -122.426622 }}
            />
          </Map>
        </div>
      </div>
    );
  }
}

export default App;

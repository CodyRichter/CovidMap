import React from 'react';
import ReactDOM from 'react-dom';
import 'fontsource-roboto';
import HeaderBar from './layout/HeaderBar';
import MapContainer from './layout/MapContainer';

ReactDOM.render(
  <React.StrictMode>
    <HeaderBar />
    <MapContainer />
  </React.StrictMode>,
  document.getElementById('root')
);

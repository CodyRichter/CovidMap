import React from 'react';
import ReactDOM from 'react-dom';
import 'fontsource-roboto';
import HeaderBar from './layout/HeaderBar';
import MapContainer from './layout/MapContainer';


document.body.style.overflow = "hidden";
ReactDOM.render(
    <div style={{
        marginTop: 0,
        marginLeft: 0,
        marginRight: 0,
        marginBottom: 0,
    }}>
        <HeaderBar/>
        <MapContainer/>
    </div>,
    document.getElementById('root')
);

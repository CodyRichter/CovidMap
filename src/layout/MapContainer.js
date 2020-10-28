import React from 'react';
import MapComponent from '../components/MapComponent';

export default function MapContainer() {

    return (
        <div>
           <MapComponent isMarkerShown={false} />
        </div>
    );
}

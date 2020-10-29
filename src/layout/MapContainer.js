import React from 'react';
import AlertDialog from '../components/AlertDialog';
import MapComponent from '../components/MapComponent';
import ReportCovidDialog from '../components/ReportCovidDialog';

export default function MapContainer() {

    return (
        <div>
           <MapComponent />
           <AlertDialog />
           <ReportCovidDialog />
        </div>
    );
}

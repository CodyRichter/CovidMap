import React from 'react';
import LocationResultDrawer from '../components/LocationResultDrawer';
import MapComponent from '../components/MapComponent';
import ReportCovidDialog from '../components/ReportCovidDialog';
import SearchResultDrawer from '../components/SearchResultDrawer';


export default function MapContainer() {

    return (
        <div>
           <MapComponent />
           <div style={{ display: 'inline-flex' }}>
           <ReportCovidDialog />
           <SearchResultDrawer />
           <LocationResultDrawer />
           </div>
        </div>
    );
}

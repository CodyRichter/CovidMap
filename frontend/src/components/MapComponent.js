import GoogleMapReact from 'google-map-react';
import React, {useEffect, useState} from 'react';
import AlertPin from './AlertPin';
import axios from 'axios';
import Geocode from "react-geocode";
import ReportCovidDialog from "./ReportCovidDialog";
import {Fab} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';


export default function MapComponent() {

    let [pinLocations, setPinLocations] = useState([]);
    let [targetingMode, setTargetingMode] = useState(false);
    let [latitude, setLatitude] = useState(-1);
    let [longitude, setLongitude] = useState(-1);
    let [reportDialogOpen, setReportDialogOpen] = useState(false);

    // Add Geocoding data on load
    useEffect(() => {
        Geocode.setApiKey("AIzaSyAz2oL1-IeVDxCY7lWV2ivTZ3LIpEkrWEE");
        Geocode.setLanguage("en");
        Geocode.setRegion("us");

        reloadLocations();
    }, []);


    function reloadLocations() {
        axios.get('http://localhost:4250/locations').then((response) => {
            setPinLocations(response.data['locations']);
        });
    }

    function handleMapClick({x, y, lat, lng, event}) {
        if (targetingMode) {
            setReportDialogOpen(true);
            setLatitude(lat);
            setLongitude(lng);
            setTargetingMode(false);
        }
    }

    function addLocation() {
        const formData = new FormData();
        Geocode.fromLatLng(latitude, longitude).then((response) => {
            let locationName = response.results[0].formatted_address;
            formData.append('name', locationName);
            formData.append('lat', latitude);
            formData.append('lon', longitude);
            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }
            axios.post('http://localhost:4250/locations', formData, config).then((response) => {
                setPinLocations(response.data['locations']);
            });
        });
        setReportDialogOpen(false);
    }

    const mapStyle = require('../mapstyle.json');

    return (
        // Important! Always set the container height explicitly
        <div style={{height: '93vh', width: '100%'}}>
            <GoogleMapReact
                defaultCenter={{lat: 42.389564, lng: -72.526512}}
                defaultZoom={16}
                yesIWantToUseGoogleMapApiInternals
                bootstrapURLKeys={{key: "AIzaSyAz2oL1-IeVDxCY7lWV2ivTZ3LIpEkrWEE"}}
                options={{
                    disableDefaultUI: true, // disable default map UI
                    draggable: true, // make map draggable
                    keyboardShortcuts: false, // disable keyboard shortcuts
                    scaleControl: true, // allow scale controle
                    scrollwheel: true, // allow scroll wheel
                    styles: mapStyle, // change default map styles
                    draggableCursor: targetingMode ? 'crosshair' : 'grab',
                    draggingCursor: 'grabbing',
                }}
                onClick={handleMapClick}
            >
                {pinLocations.map((location) => (
                    <AlertPin
                        key={location['location_id']}
                        lat={location['latitude']}
                        lng={location['longitude']}
                        numCases={location['cases']}
                        location={location}
                        onLocationUpdate={reloadLocations}
                    />
                ))}

            </GoogleMapReact>
            {!targetingMode &&
            <Fab
                color="primary"
                aria-label="add"
                style={{
                    margin: 0,
                    top: 'auto',
                    right: 40,
                    bottom: 40,
                    left: 'auto',
                    position: 'fixed',
                }}
                variant="extended"
                size="large"
                onClick={() => setTargetingMode(true)}
            >
                <AddIcon/>
                Report Exposure
            </Fab>
            }
            {targetingMode &&
            <Fab
                color="secondary"
                aria-label="add"
                style={{
                    margin: 0,
                    top: 'auto',
                    right: 40,
                    bottom: 40,
                    left: 'auto',
                    position: 'fixed',
                }}
                variant="extended"
                size="large"
                onClick={() => setTargetingMode(false)}
            >
                <AddIcon/>
                Cancel Reporting
            </Fab>
            }
            <ReportCovidDialog handleSuccess={addLocation} handleNegative={() => setReportDialogOpen(false)}
                               isOpen={reportDialogOpen}/>
        </div>
    );
}
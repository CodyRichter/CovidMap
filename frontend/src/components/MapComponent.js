import GoogleMapReact from 'google-map-react';
import React, { Component } from 'react';
import AlertPin from './AlertPin';


class MapComponent extends Component {

  render() {

    const mapStyle = require('../mapstyle.json');

    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '90vh', width: '100%' }}>
        <GoogleMapReact
                defaultCenter={{ lat: 42.389564, lng: -72.526512 }}
                defaultZoom={16}
                yesIWantToUseGoogleMapApiInternals
                bootstrapURLKeys={{ key: "AIzaSyAz2oL1-IeVDxCY7lWV2ivTZ3LIpEkrWEE" }}
                options={{
                    disableDefaultUI: true, // disable default map UI
                    draggable: true, // make map draggable
                    keyboardShortcuts: false, // disable keyboard shortcuts
                    scaleControl: true, // allow scale controle
                    scrollwheel: true, // allow scroll wheel
                    styles: mapStyle // change default map styles
                }}
        >
          <AlertPin
            lat={42.389564}
            lng={-72.526512}
            numCases={11}
          />
          <AlertPin
            lat={42.390014}
            lng={-72.533509}
            numCases={9}
          />
          <AlertPin
            lat={42.386235}
            lng={-72.526887}
            numCases={10}
          />

        </GoogleMapReact>
      </div>
    );
  }
}

export default MapComponent;
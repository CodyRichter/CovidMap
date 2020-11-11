import React, {useState} from 'react';
import ReportIcon from '@material-ui/icons/Report';
import {Typography} from '@material-ui/core';
import LocationResultDrawer from "./LocationResultDrawer";


export default function AlertPin(props) {

    let [sidebarOpen, setSidebarOpen] = useState(false);

    function openLocationSidebar() {
        setSidebarOpen(true);
    }

    function closeLocationSidebar() {
        setSidebarOpen(false);
    }

    return (
        <div
        >
            <div
                onClick={openLocationSidebar}
                style={{
                    display: 'flex',
                    minWidth: '10vw',
                    minHeight: '3vw',
                    cursor: "pointer",
                }}
            >
                <ReportIcon color={'error'} />

                <Typography variant="h6" color={'error'}>
                    {props.numCases} {props.numCases !== 1 && <span>Cases</span>} {props.numCases === 1 && <span>Case</span>}
                </Typography>
            </div>

            <LocationResultDrawer drawerIsOpen={sidebarOpen} onClose={closeLocationSidebar} onLocationUpdate={props.onLocationUpdate} {...props.location}/>
        </div>
    );
}
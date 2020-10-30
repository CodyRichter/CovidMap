import React from 'react';
import ReportIcon from '@material-ui/icons/Report';
import { Typography } from '@material-ui/core';
export default function AlertPin(props) {

    return (
        <div style={{
            display: 'flex',
            minWidth: '10vw',
        }}>
            <ReportIcon color={'error'} />
            
            <Typography variant="h6" color={'error'}>
            {props.numCases} Cases 
            </Typography>
        </div>
    );
}
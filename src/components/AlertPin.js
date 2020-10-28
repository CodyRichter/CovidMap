import React from 'react';
import WarningTwoToneIcon from '@material-ui/icons/WarningTwoTone';

export default function AlertPin(props) {

    return (
        <div>
           <WarningTwoToneIcon color={'error'}/>
           {props.text}
        </div>
    );
}
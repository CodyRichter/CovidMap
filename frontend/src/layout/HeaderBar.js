import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MapIcon from '@material-ui/icons/Map';
import { Button, Input, InputAdornment } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import SearchIcon from '@material-ui/icons/Search';
import axios from "axios";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    textfield: {
        color: "white",
        minWidth: "30vw",
    },
}));

export default function HeaderBar() {
    const classes = useStyles();

    let [searchValue, setSearchValue] = useState("");

    let updateSearchStr = event => {
        setSearchValue(event.target.value);
    };

    function submitHandler(e) {
        console.log('Searching With: ['+ searchValue +']');
        axios.post('http://localhost:4250/search/'+searchValue).then((response) => {
            console.log(response.data['locations']);
        });
        e.preventDefault();
    }



    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <MapIcon />
                    <Typography variant="h6" className={classes.title}>
                        &nbsp;
                        <i>CovidTrack</i> by Team13
                    </Typography>

                    <form className={classes.root} onSubmit={submitHandler}>
                        <Input
                            id="input-with-icon-adornment"
                            className={classes.textfield}
                            onChange={updateSearchStr}
                            startAdornment={
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            }
                        />
                    </form>

                    <Button color="inherit">Logout</Button>
                     &nbsp;
                    <PersonIcon />
                </Toolbar>
            </AppBar>
        </div>
    );
}




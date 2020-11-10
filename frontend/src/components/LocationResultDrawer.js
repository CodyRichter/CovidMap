import React, {useEffect} from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import {Button, ButtonGroup, Container, Grid, IconButton, Typography} from '@material-ui/core';
import WarningIcon from '@material-ui/icons/Warning';
import BarChartIcon from '@material-ui/icons/BarChart';
import CommentCard from './CommentCard';
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import axios from "axios";

const useStyles = makeStyles({
    list: {
        width: 400,
    },
    fullList: {
        width: 'auto',
    },
    barHeader: {
        marginTop: '0.8em',
        marginBottom: '0.8em',
    },
    centeredFull: {
        justifyContent: 'center',
        width: '100%',
        marginTop: '0.8em',
        marginBottom: '0.8em',
    },
    centeredNotFull: {
        justifyContent: 'center',
        marginTop: '0.8em',
        marginBottom: '0.8em',
        width: 'auth',
        marginLeft: '0.85em',
    }
});

export default function LocationResultDrawer(props) {
    const classes = useStyles();
    const [drawerOpen, setDrawerOpen] = React.useState(false);

    useEffect(() => {
        setDrawerOpen(props.open);
    }, [props.open]);


    const toggleDrawer = (open) => (event) => {
        console.log(event.type);
        if ((event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift'))) {
            console.log('Not Closing')
            return;
        }

        setDrawerOpen(open);
    };

    function checkIn() {
        axios.post('http://localhost:4250/check_in/'+props.location_id).then((response) => {
            props.onLocationUpdate();
        });
    }


    function reportExposure() {
        axios.post('http://localhost:4250/report/'+props.location_id).then((response) => {
            props.onLocationUpdate();
        });
    }

    function addComment() {

    }

    const list = (anchor) => (
        <div
            className={clsx(classes.list, {
                [classes.fullList]: anchor === 'top' || anchor === 'bottom',
            })}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
            style={{overflowX: 'hidden'}}
        >

            <Container className={classes.barHeader}>
                <Typography variant="h4" >
                    Activity Report For:
                </Typography>
                <Typography variant="h6" >
                    {props.name}
                </Typography>
            </Container>

            <Divider />

            <div style={{
                display: 'flex',
                width: '100%',
                marginTop: '0.8em',
                marginBottom: '0.8em',
                marginLeft: '2em'
            }}>
                <WarningIcon fontSize='large' color="error" />
                
                <Typography variant="h5" style={{flexGrow: 1}} color="error">
                    &nbsp;
                    <strong>{props.cases} {props.cases !== 1 && <span>Cases</span>} {props.cases === 1 && <span>Case</span>} Reported</strong>
                </Typography>


            </div>

            <Divider />

            <div style={{
                display: 'flex',
                width: '100%',
                marginTop: '0.8em',
                marginBottom: '0.8em',
                marginLeft: '2em'
            }}>
                <BarChartIcon fontSize='large' color="primary" />
                
                <Typography variant="h6" style={{flexGrow: 1}} color="primary">
                    &nbsp;
                    <strong>{props.check_in} {props.check_in !== 1 && <span>People Have</span>} {props.check_in === 1 && <span>Person Has</span>} Checked In</strong>

                </Typography>

            </div>

            <Divider />

            <ButtonGroup variant="contained"  aria-label="contained primary button group" className={classes.centeredNotFull}>
                <Button color="primary" onClick={checkIn}>Check In</Button>
                <Button color="secondary" onClick={reportExposure}>Report Exposure</Button>
                <Button color="default" onClick={addComment}>Comment</Button>
            </ButtonGroup>

            <Divider />


            <Grid
                container
                spacing={0}
                direction="column"
                justify="center"
                width='80%'
            >

                <Grid item xl={3}>


                    <CommentCard 
                        title={'No Masks No Business!'}
                        comment={'Social distancing is NOT being observed between everyone at the pond, and nobody was wearing masks either! There is NO way I will come back here. '}
                        timestamp={"2 Hours Ago"}
                    />

                    <CommentCard 
                        title={'Not Safe!'}
                        comment={'I went here the other day and wow was I surprised! None of the geese were wearing masks!'}
                        timestamp={"2 Days Ago"}
                    />

                    <CommentCard 
                        title={"Don't Go Here!"}
                        comment={"Would NOT recommend. I ate here about a week ago and haven’t" + 
                        "gone out since. I get groceries delivered to my door and have no" +
                        "reason besides work to leave the house. A few days later, I started" +
                        "feeling sick and so I got a COVID test and tested POSITIVE. Social" +
                        "distancing was barely enforced and even some staff were mask-less" +
                        "so I am almost sure I contracted the virus from this restaurant."}
                        timestamp={"1 Week Ago"}
                    />

                </Grid>
            </Grid>


        </div>
    );

    return (
        <ClickAwayListener onClickAway={() => toggleDrawer(false)}>
            <Drawer anchor={'left'} open={drawerOpen} onClose={toggleDrawer(false)}>
                {list('left')}
            </Drawer>
        </ClickAwayListener>
    );
}

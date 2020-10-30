import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import { Container, Grid, Typography } from '@material-ui/core';
import WarningIcon from '@material-ui/icons/Warning';
import BarChartIcon from '@material-ui/icons/BarChart';
import CommentCard from './CommentCard';

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
    }
});

export default function LocationResultDrawer() {
    const classes = useStyles();
    const [drawerOpen, setDrawerOpen] = React.useState(false);

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setDrawerOpen(open);
    };

    const list = (anchor) => (
        <div
            className={clsx(classes.list, {
                [classes.fullList]: anchor === 'top' || anchor === 'bottom',
            })}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >

            <Container className={classes.barHeader}>
                <Typography variant="h4" >
                    Activity Report For:
                </Typography>
                <Typography variant="h6" >
                    Campus Pond
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
                    <strong>High Risk Location</strong>
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
                    <strong>23 People Have Checked In</strong>

                </Typography>

            </div>

            <Divider />

            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
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
        <div>
            <React.Fragment>
                <Button onClick={toggleDrawer(true)}>Location Results</Button>
                <Drawer anchor={'left'} open={drawerOpen} onClose={toggleDrawer(false)}>
                    {list('left')}
                </Drawer>
            </React.Fragment>
        </div>
    );
}

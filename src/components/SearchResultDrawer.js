import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import { ButtonGroup, Container, Grid, Typography } from '@material-ui/core';
import LocationInfoCard from './LocationInfoCard';

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

export default function SearchResultDrawer() {
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
                    Search Results For:
                </Typography>
                <Typography variant="h6" >
                    UMass Amherst
                </Typography>
            </Container>

            <Divider />

            <ButtonGroup size="large" color="primary" aria-label="large outlined primary button group" className={classes.centeredFull}>
                <Button>Sort</Button>
                <Button color="primary">Filter</Button>
                <Button>Route</Button>
            </ButtonGroup>

            <Divider />

            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
                width='100%'
            >

                <Grid item xl={3}>
                    <LocationInfoCard
                        locationName={'Campus Pond'}
                        imageName={'https://theblacksheeponline.com/wp-content/uploads/2017/03/nature-sanctuary.jpg'}
                        dangerLevel={'High Risk Location'}
                    />
                    <LocationInfoCard
                        locationName={'Mullins Center'}
                        imageName={'https://www.cambridgeseven.com/wp-content/uploads/2019/07/UMass_Mullins_Hero-1.jpg'}
                        dangerLevel={'High Risk Location'}
                    />
                    <LocationInfoCard
                        locationName={'Whitmore Building'}
                        imageName={'https://bloximages.newyork1.vip.townnews.com/westernmassnews.com/content/tncms/assets/v3/editorial/1/1a/11a5b9dd-3a1d-587e-aa92-caadb631d800/5ba0399be4da3.preview.jpg?resize=1120%2C630'}
                        dangerLevel={'High Risk Location'}
                    />
                </Grid>
            </Grid>


        </div>
    );

    return (
        <div>
            <React.Fragment>
                <Button onClick={toggleDrawer(true)}>Search Results</Button>
                <Drawer anchor={'left'} open={drawerOpen} onClose={toggleDrawer(false)}>
                    {list('left')}
                </Drawer>
            </React.Fragment>
        </div>
    );
}

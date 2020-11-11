import React, {useEffect} from 'react';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import {Button, ButtonGroup, Container, Grid, Typography} from '@material-ui/core';
import WarningIcon from '@material-ui/icons/Warning';
import BarChartIcon from '@material-ui/icons/BarChart';
import CommentCard from './CommentCard';
import axios from "axios";
import TextField from "@material-ui/core/TextField";

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
        width: '90%',
        marginLeft: '5%',
        marginRight: '5%',
        marginTop: '0.8em',
        marginBottom: '0.8em',
    },
    centeredNotFull: {
        justifyContent: 'center',
        marginTop: '0.8em',
        marginBottom: '0.8em',
        width: '70%',
        marginLeft: '15%',
        marginRight: '15%',
    }
});

export default function LocationResultDrawer(props) {
    const classes = useStyles();
    let [comments, setComments] = React.useState([]);
    let [newCommentTitle, setNewCommentTitle] = React.useState('');
    let [newCommentText, setNewCommentText] = React.useState('');

    useEffect(() => {
        axios.get('http://localhost:4250/comments/'+props.location_id).then((response) => {
            setComments(response.data['comments']);
        });
    }, [props.location_id]);


    let commentUpdateTitle = event => {
        setNewCommentTitle(event.target.value);
    };

    let commentUpdateText = event => {
        setNewCommentText(event.target.value);
    };

    function checkIn() {
        axios.post('http://localhost:4250/check_in/' + props.location_id).then((response) => {
            props.onLocationUpdate();
        });
    }

    function reportExposure() {
        axios.post('http://localhost:4250/report/' + props.location_id).then((response) => {
            props.onLocationUpdate();
        });
    }

    function addComment() {
        const formData = new FormData();

        if (newCommentText !== '' && newCommentTitle !== '') {
            formData.append('location_id', props.location_id);
            formData.append('title', newCommentTitle);
            formData.append('comment', newCommentText);
            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }
            axios.post('http://localhost:4250/comments', formData, config).then((response) => {
                setComments(response.data['comments']);
                setNewCommentTitle('');
                setNewCommentText('');
            });
        }
    }

    const list = (anchor) => (
        <div
            className={clsx(classes.list, {
                [classes.fullList]: anchor === 'top' || anchor === 'bottom',
            })}
            role="presentation"
            style={{overflowX: 'hidden'}}
        >

            <Container className={classes.barHeader}>
                <Typography variant="h4">
                    Activity Report For:
                </Typography>
                <Typography variant="h6">
                    {props.name}
                </Typography>
            </Container>

            <Divider/>

            <div style={{
                display: 'flex',
                width: '100%',
                marginTop: '0.8em',
                marginBottom: '0.8em',
                marginLeft: '2em'
            }}>
                <WarningIcon fontSize='large' color="error"/>

                <Typography variant="h5" style={{flexGrow: 1}} color="error">
                    &nbsp;
                    <strong>{props.cases} {props.cases !== 1 && <span>Cases</span>} {props.cases === 1 &&
                    <span>Case</span>} Reported</strong>
                </Typography>


            </div>

            <Divider/>

            <div style={{
                display: 'flex',
                width: '100%',
                marginTop: '0.8em',
                marginBottom: '0.8em',
                marginLeft: '2em'
            }}>
                <BarChartIcon fontSize='large' color="primary"/>

                <Typography variant="h6" style={{flexGrow: 1}} color="primary">
                    &nbsp;
                    <strong>{props.check_in} {props.check_in !== 1 && <span>People Have</span>} {props.check_in === 1 &&
                    <span>Person Has</span>} Checked In</strong>

                </Typography>

            </div>

            <Divider/>

            <ButtonGroup aria-label="contained primary button group" className={classes.centeredNotFull}>
                <Button color="primary" variant="contained" onClick={checkIn}>Check In</Button>
                <Button color="secondary" variant="contained" onClick={reportExposure}>Report Exposure</Button>
            </ButtonGroup>

            <Divider/>


            <Grid
                container
                spacing={0}
                direction="column"
                justify="center"
                width='100%'
            >

                <Grid item xl={12}>
                    {comments.length > 0 &&
                        <Typography variant="h6" className={classes.centeredFull} style={{textAlign: 'center'}}>Comments</Typography>
                    }
                    {comments.map((comment) => (
                        <CommentCard
                            title={comment['title']}
                            comment={comment['comment']}
                            timestamp={comment['timestamp']}
                            key={comment['comment_id']}
                        />
                    ))}

                </Grid>
            </Grid>

            {comments.length > 0 &&
                <Divider/>
            }
            <Typography variant="h6" className={classes.centeredFull} style={{textAlign: 'center'}}>New Comment</Typography>

            <TextField
                id="titleField"
                label="Title"
                variant="outlined"
                className={classes.centeredFull}
                onChange={commentUpdateTitle}
            />
            <TextField
                id="commentField"
                label="Comment"
                multiline
                rows={4}
                variant="outlined"
                className={classes.centeredFull}
                onChange={commentUpdateText}
            />
            <Button color="primary" variant="contained" className={classes.centeredFull}
                    onClick={addComment}>Comment</Button>


        </div>
    );

    return (
        <Drawer
            anchor={'left'}
            open={props.drawerIsOpen}
            onClose={props.onClose}
        >
            {list('left')}
        </Drawer>
    );
}

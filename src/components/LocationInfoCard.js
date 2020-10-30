import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    marginTop: '0.8em',
    marginBottom: '0.8em',
  },
  media: {
    height: 140,
  },
});

export default function LocationInfoCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={props.imageName}
          title={props.locationName}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.locationName}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.dangerLevel}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

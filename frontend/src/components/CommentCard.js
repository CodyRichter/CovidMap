import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import ModeCommentIcon from '@material-ui/icons/ModeComment';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    width: '80%',
    marginRight: '10%',
    marginBottom: '0.8em',
    marginLeft: '10%',
  },
});

export default function CommentCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>

        <CardContent>
          <Typography gutterBottom variant="h6" component="h2">
              <ModeCommentIcon />
              &nbsp; &nbsp;
                 {props.title}
          </Typography>
          <Typography gutterBottom variant="h7" component="h6" color="textSecondary" style={{fontSize: 14}} >
                    {props.timestamp}
          </Typography>
          <Typography variant="p" color="textSecondary" style={{wordWrap: 'break-word'}}>
            {props.comment}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

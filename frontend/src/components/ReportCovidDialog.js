import React, {useEffect} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Geocode from "react-geocode";
import axios from "axios";

export default function ReportCovidDialog(props) {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    setDialogOpen(props.isOpen);
  }, [props.isOpen]);

  const handleCloseSuccess = () => {
    setDialogOpen(false);
    props.handleSuccess();
  };

  const handleCloseNegative = () => {
    setDialogOpen(false);
    props.handleNegative();
  };

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={dialogOpen}
        onClose={handleCloseNegative}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">Report Covid Exposure at This Location?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            If you were exposed to COVID-19 at this location, you can annonymously report it. 
            Please confirm that you suspect exposure to COVID-19.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCloseNegative} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCloseSuccess} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

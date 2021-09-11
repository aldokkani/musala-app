import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const GatewayForm = ({
  gateway: { id, name, ipv4 } = {},
  open,
  handleSave,
  handleClose,
}) => {
  const [gatewayInfo, setGatewayInfo] = useState({ id, name, ipv4 });

  return (
    <Dialog
      data-testid="gateway-form"
      open={open}
      onClose={() => handleClose(false)}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Update Gateway Info</DialogTitle>
      <DialogContent>
        {/* <DialogContentText>
          To subscribe to this website, please enter your email address here. We
          will send updates occasionally.
        </DialogContentText> */}
        <TextField
          inputProps={{ 'data-testid': 'gateway-form-name' }}
          id="outlined-basic"
          label="Name"
          variant="outlined"
          onChange={({ target: { value } }) =>
            setGatewayInfo({ ...gatewayInfo, name: value })
          }
          value={gatewayInfo.name}
        />
        <TextField
          inputProps={{ 'data-testid': 'gateway-form-ipv4' }}
          id="outlined-basic"
          label="IPv4"
          variant="outlined"
          onChange={({ target: { value } }) =>
            setGatewayInfo({ ...gatewayInfo, ipv4: value })
          }
          value={gatewayInfo.ipv4}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose(false)} color="primary">
          Cancel
        </Button>
        <Button onClick={() => handleSave(gatewayInfo)} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default GatewayForm;

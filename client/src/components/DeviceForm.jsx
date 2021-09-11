import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';

const DeviceForm = ({
  device: { id, vendor, status } = {},
  open,
  handleSave,
  handleClose,
}) => {
  const [deviceInfo, setDeviceInfo] = useState({ id, vendor, status });

  return (
    <Dialog
      data-testid="device-form"
      open={open}
      onClose={() => handleClose(false)}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Update Device Info</DialogTitle>
      <DialogContent>
        <FormGroup>
          <FormControlLabel
            control={
              <TextField
                inputProps={{ 'data-testid': 'device-form-vendor' }}
                id="outlined-basic"
                label="Vendor"
                variant="outlined"
                onChange={({ target: { value } }) =>
                  setDeviceInfo({ ...deviceInfo, vendor: value })
                }
                value={deviceInfo.vendor}
              />
            }
          />
          <FormControlLabel
            control={
              <Switch
                inputProps={{ 'data-testid': 'device-form-status' }}
                checked={deviceInfo.status === 'Online'}
                onChange={({ target: { checked } }) =>
                  setDeviceInfo({
                    ...deviceInfo,
                    status: checked ? 'Online' : 'Offline',
                  })
                }
              />
            }
            label={deviceInfo.status}
          />
        </FormGroup>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose(false)} color="primary">
          Cancel
        </Button>
        <Button onClick={() => handleSave(deviceInfo)} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeviceForm;

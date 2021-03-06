import React, { useState } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ToggleOnIcon from '@material-ui/icons/ToggleOn';
import ToggleOffIcon from '@material-ui/icons/ToggleOff';
import { green } from '@material-ui/core/colors';
import AlertDialog from './AlertDialog';

const DeviceItem = ({
  dev,
  setOpenAlert,
  setDevId,
  openEditForm,
  setSelectDevice,
}) => (
  <ListItem>
    <ListItemIcon>
      {dev.status === 'Online' && (
        <ToggleOnIcon fontSize="large" style={{ color: green[500] }} />
      )}
      {dev.status === 'Offline' && (
        <ToggleOffIcon fontSize="large" color="disabled" />
      )}
    </ListItemIcon>
    <ListItemText
      primary={'ID: ' + dev.id}
      secondary={`Vendor: ${dev.vendor} | Created: ${new Date(
        dev.createdAt,
      )?.toDateString()}`}
    />
    <ListItemSecondaryAction>
      <IconButton
        edge="end"
        aria-label="edit"
        onClick={() => {
          setSelectDevice(dev);
          openEditForm();
        }}
        data-testid="edit-device"
      >
        <EditIcon />
      </IconButton>
      <IconButton
        edge="end"
        aria-label="delete"
        onClick={() => {
          setOpenAlert(true);
          setDevId(dev.id);
        }}
        data-testid="delete-device"
      >
        <DeleteIcon />
      </IconButton>
    </ListItemSecondaryAction>
  </ListItem>
);

const DevicesList = ({
  gatewayId,
  devices,
  deleteDevice,
  openEditForm,
  setSelectDevice,
}) => {
  const [openAlert, setOpenAlert] = useState(false);
  const [deviceId, setDevId] = useState(null);

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Gateway Devices
          <IconButton
            data-testid="add-gateway-btn"
            color="primary"
            onClick={() => openEditForm(true)}
          >
            <AddCircleIcon fontSize="small" color="primary" />
          </IconButton>
        </ListSubheader>
      }
    >
      {devices.map((dev) => (
        <DeviceItem
          key={dev.id}
          dev={dev}
          setOpenAlert={setOpenAlert}
          setDevId={setDevId}
          openEditForm={openEditForm}
          setSelectDevice={setSelectDevice}
        />
      ))}
      <AlertDialog
        open={openAlert}
        setOpen={setOpenAlert}
        handleDelete={() => {
          deleteDevice({ id: deviceId, gatewayId });
          setOpenAlert(false);
        }}
      />
    </List>
  );
};

export default DevicesList;

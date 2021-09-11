import React, { useState } from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionActions from '@material-ui/core/AccordionActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import ToggleOnIcon from '@material-ui/icons/ToggleOn';
import ToggleOffIcon from '@material-ui/icons/ToggleOff';
import { green } from '@material-ui/core/colors';
import GatewayForm from './GatewayForm';

const DevicesList = ({ devices }) => (
  <List
    component="nav"
    aria-labelledby="nested-list-subheader"
    subheader={
      <ListSubheader component="div" id="nested-list-subheader">
        Gateway Devices
      </ListSubheader>
    }
  >
    {devices.map((dev) => (
      <ListItem key={dev.id}>
        <ListItemIcon>
          {dev.statues === 'Online' && (
            <ToggleOnIcon fontSize="large" style={{ color: green[500] }} />
          )}
          {dev.statues === 'Offline' && (
            <ToggleOffIcon fontSize="large" color="disabled" />
          )}
        </ListItemIcon>
        <ListItemText
          primary={'ID: ' + dev.id}
          secondary={'Vendor: ' + dev.vendor}
        />
        <ListItemSecondaryAction>
          <IconButton edge="end" aria-label="edit">
            <EditIcon />
          </IconButton>
          <IconButton edge="end" aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    ))}
  </List>
);

const GatewayCard = ({ gateway, updateGateway }) => {
  const [openForm, setOpenForm] = useState(false);

  return (
    <Accordion defaultExpanded={false}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon data-testid="expand-icon" />}
        aria-controls="panel1c-content"
        id="panel1c-header"
      >
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Typography color="textSecondary">ID: {gateway.id}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography color="textPrimary">Name: {gateway.name}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography color="textPrimary">IPv4: {gateway.ipv4}</Typography>
          </Grid>
        </Grid>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} md={8}>
            <DevicesList devices={gateway.devices} />
          </Grid>
        </Grid>
      </AccordionDetails>
      <Divider />
      <AccordionActions>
        <Button
          data-testid="edit-gateway"
          size="small"
          onClick={() => setOpenForm(true)}
        >
          Edit
        </Button>
        <Button size="small" color="secondary">
          Delete
        </Button>
      </AccordionActions>
      <GatewayForm
        key={openForm}
        gateway={gateway}
        open={openForm}
        handleClose={setOpenForm}
        handleSave={updateGateway}
      />
    </Accordion>
  );
};

export default GatewayCard;

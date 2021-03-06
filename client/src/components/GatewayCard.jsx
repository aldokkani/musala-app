import React, { useState } from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionActions from '@material-ui/core/AccordionActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import GatewayForm from './GatewayForm';
import DevicesList from './DevicesList';
import DeviceForm from './DeviceForm';

const GatewayCard = ({
  gateway,
  updateGateway,
  deleteGateway,
  createDevice,
  updateDevice,
  deleteDevice,
}) => {
  const [openForm, setOpenForm] = useState(false);
  const [openDeviceForm, setOpenDeviceForm] = useState(false);
  const [selectDevice, setSelectDevice] = useState({});

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
            <DevicesList
              devices={gateway.devices}
              gatewayId={gateway.id}
              deleteDevice={deleteDevice}
              openEditForm={() => setOpenDeviceForm(true)}
              setSelectDevice={setSelectDevice}
            />
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
        <Button
          data-testid="delete-gateway"
          size="small"
          color="secondary"
          onClick={() => deleteGateway(gateway.id)}
        >
          Delete
        </Button>
      </AccordionActions>
      <GatewayForm
        key={'gateway' + openForm}
        gateway={gateway}
        open={openForm}
        handleClose={setOpenForm}
        handleSave={updateGateway}
      />
      <DeviceForm
        key={'device' + openDeviceForm}
        device={{ ...selectDevice, gatewayId: gateway.id }}
        open={openDeviceForm}
        handleClose={setOpenDeviceForm}
        handleUpdate={updateDevice}
        handleCreate={createDevice}
      />
    </Accordion>
  );
};

export default GatewayCard;

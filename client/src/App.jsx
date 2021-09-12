import React, { useEffect, useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import GatewayCard from './components/GatewayCard';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import GatewayForm from './components/GatewayForm';
import AlertDialog from './components/AlertDialog';
import {
  deleteGateway,
  fetchAllGateways,
  updateGateway,
  createGateway,
} from './services/gatewayService';
import {
  createDevice,
  deleteDevice,
  updateDevice,
} from './services/deviceService';

function App() {
  const [openForm, setOpenForm] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [gateways, setGateways] = useState([]);
  const [toBeDeleteGW, setToBeDeleteGW] = useState('');

  const fetchData = async () => {
    const data = await fetchAllGateways();
    setGateways(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleGatewayUpdate = async (data) => {
    await updateGateway(data.id, data);
    const updatedData = await fetchAllGateways();
    setGateways(updatedData);
  };

  const handleGatewayDelete = async () => {
    await deleteGateway(toBeDeleteGW);
    const updatedData = await fetchAllGateways();
    setGateways(updatedData);
  };

  const handleGatewayCreate = async (data) => {
    await createGateway(data);
    const updatedData = await fetchAllGateways();
    setGateways(updatedData);
  };

  const handleDeviceUpdate = async ({ gatewayId, id, ...data }) => {
    await updateDevice(gatewayId, id, data);
    const updatedData = await fetchAllGateways();
    setGateways(updatedData);
  };

  const handleDeviceDelete = async ({ gatewayId, id }) => {
    await deleteDevice(gatewayId, id);
    const updatedData = await fetchAllGateways();
    setGateways(updatedData);
  };

  const handleDeviceCreate = async ({ gatewayId, ...data }) => {
    await createDevice(gatewayId, data);
    const updatedData = await fetchAllGateways();
    setGateways(updatedData);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="md" style={{ paddingTop: '1.5em' }}>
        <Grid container spacing={3}>
          <Grid container item xs={12}>
            <Grid item xs={10}>
              <Typography variant="h3">Gateway Management</Typography>
            </Grid>
            <Grid item xs={2}>
              <IconButton
                data-testid="add-gateway-btn"
                color="primary"
                onClick={() => setOpenForm(true)}
              >
                <AddCircleIcon style={{ fontSize: 50 }} color="primary" />
              </IconButton>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            {gateways.map((g) => (
              <GatewayCard
                key={g.id}
                gateway={g}
                updateGateway={handleGatewayUpdate}
                deleteGateway={(gatewayId) => {
                  setOpenAlert(true);
                  setToBeDeleteGW(gatewayId);
                }}
                createDevice={handleDeviceCreate}
                updateDevice={handleDeviceUpdate}
                deleteDevice={handleDeviceDelete}
              />
            ))}
          </Grid>
        </Grid>
        <GatewayForm
          open={openForm}
          handleClose={setOpenForm}
          handleSave={handleGatewayCreate}
        />
        <AlertDialog
          open={openAlert}
          setOpen={setOpenAlert}
          handleDelete={handleGatewayDelete}
        />
      </Container>
    </React.Fragment>
  );
}

export default App;

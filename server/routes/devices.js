const express = require('express');
const Gateway = require('../models/gateway');

const router = express.Router({ mergeParams: true });

router.get('/:id', async (req, res) => {
  try {
    const gateway = await Gateway.findById(req.params.gatewayId);
    const device = gateway.devices.id(req.params.id);
    if (device === null) throw new Error();

    res.json(device);
  } catch (error) {
    res.sendStatus(404);
  }
});

router.post('/', async (req, res) => {
  try {
    const gateway = await Gateway.findById(req.params.gatewayId);
    const newDeviceCount = await gateway.devices.push(req.body);
    await gateway.save();

    res.json(gateway.devices[newDeviceCount - 1]);
  } catch (error) {
    res.status(422).json(error.message);
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const gateway = await Gateway.findById(req.params.gatewayId);
    const device = gateway.devices.id(req.params.id);
    device.set(req.body);
    await gateway.save();

    res.json(device);
  } catch (error) {
    res.sendStatus(404);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const gateway = await Gateway.findById(req.params.gatewayId);
    const device = gateway.devices.id(req.params.id);
    device.remove();
    await gateway.save();

    res.json(device);
  } catch (error) {
    res.sendStatus(404);
  }
});

module.exports = router;

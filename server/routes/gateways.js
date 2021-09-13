const express = require('express');
const Gateway = require('../models/gateway');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const gateway = await Gateway.create(req.body);
    res.json(gateway);
  } catch (error) {
    res.status(422).json(error.message);
  }
});

router.get('/', async (req, res) => {
  res.json(await Gateway.find({}));
});

router.get('/:id', async (req, res) => {
  const gateway = await Gateway.findById(req.params.id);
  if (gateway === null) {
    return res.sendStatus(404);
  }
  return res.json(gateway);
});

router.patch('/:id', async (req, res) => {
  try {
    const gateway = await Gateway.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.json(gateway);
  } catch (error) {
    res.status(422).json(error.message);
  }
});

router.delete('/:id', async (req, res) => {
  const deletedGateway = await Gateway.findByIdAndRemove(req.params.id);
  if (deletedGateway === null) {
    return res.sendStatus(404);
  }
  return res.json(deletedGateway);
});

module.exports = router;

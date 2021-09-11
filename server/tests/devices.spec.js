const supertest = require('supertest');
const app = require('../app');
const { connectDB, closeDB, clearAndInitCollection } = require('./dbSetup');

const request = supertest(app);

describe('Devices test suite', () => {
  beforeAll(async () => {
    await connectDB();
  });

  beforeEach(async () => {
    await clearAndInitCollection('gateways');
  });

  afterAll(async () => {
    await closeDB();
  });

  it('fetches a device', async () => {
    const {
      body: [gateway],
    } = await request.get('/gateways');
    const [stubDevice] = gateway.devices;

    const { body: device } = await request.get(
      `/gateways/${gateway.id}/devices/${stubDevice.id}`,
    );
    expect(device).toMatchObject(stubDevice);
  });

  it('creates a device', async () => {
    const newDevice = { vendor: 'test vendor', status: 'Offline' };

    const {
      body: [gateway],
    } = await request.get('/gateways');

    const { body: device } = await request
      .post(`/gateways/${gateway.id}/devices/`)
      .send(newDevice);

    expect(device).toMatchObject(newDevice);
  });

  it('updates a device', async () => {
    const deviceVendor = 'test name';

    const {
      body: [gateway],
    } = await request.get('/gateways');
    const [stubDevice] = gateway.devices;
    stubDevice.vendor = deviceVendor;

    const { body: device } = await request
      .patch(`/gateways/${gateway.id}/devices/${stubDevice.id}`)
      .send({
        vendor: deviceVendor,
      });

    expect(device).toMatchObject(stubDevice);
  });

  it('deletes a device', async () => {
    const {
      body: [gateway],
    } = await request.get('/gateways');
    const [stubDevice] = gateway.devices;

    const { body: deletedDevice } = await request.delete(
      `/gateways/${gateway.id}/devices/${stubDevice.id}`,
    );

    const { statusCode } = await request.get(
      `/gateways/${gateway.id}/devices/${stubDevice.id}`,
    );

    expect(statusCode).toEqual(404);
    expect(deletedDevice).toMatchObject(stubDevice);
  });
});

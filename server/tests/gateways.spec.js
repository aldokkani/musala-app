const supertest = require('supertest');
const app = require('../app');
const { connectDB, closeDB, clearAndInitCollection } = require('./dbSetup');

const request = supertest(app);

const GATEWAY = {
  id: expect.any(String),
  name: expect.any(String),
  ipv4: expect.any(String),
  devices: expect.anything(),
};

describe('Gateways test suite', () => {
  beforeAll(async () => {
    await connectDB();
  });

  beforeEach(async () => {
    await clearAndInitCollection('gateways');
  });

  afterAll(async () => {
    await closeDB();
  });

  it('fetches all the gateways', async () => {
    const { body: gateways } = await request.get('/gateways');
    expect(gateways).toMatchObject(Array(10).fill(GATEWAY));
  });

  it('fetches a gateway', async () => {
    const { body: gateways } = await request.get('/gateways');
    const [stubGateway] = gateways;

    const { body: gateway } = await request.get(`/gateways/${stubGateway.id}`);
    expect(gateway).toMatchObject(stubGateway);
  });

  it('updates a gateway', async () => {
    const gatewayName = 'test name';

    const { body: gateways } = await request.get('/gateways');
    const [stubGateway] = gateways;
    stubGateway.name = gatewayName;

    const { body: gateway } = await request
      .patch(`/gateways/${stubGateway.id}`)
      .send({
        name: gatewayName,
      });

    expect(gateway).toMatchObject(stubGateway);
  });

  it('deletes a gateway', async () => {
    const { body: gateways } = await request.get('/gateways');
    const [stubGateway] = gateways;

    const { body: deletedGateway } = await request.delete(
      `/gateways/${stubGateway.id}`,
    );
    const { statusCode } = await request.get(`/gateways/${stubGateway.id}`);
    expect(statusCode).toEqual(404);
    expect(deletedGateway).toMatchObject(stubGateway);
  });
});

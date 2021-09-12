import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  deleteGateway,
  fetchAllGateways,
  updateGateway,
  createGateway,
} from './services/gatewayService';
import App from './App';

jest.mock('./services/gatewayService');

const gatewayMock = [
  {
    _id: '613e7f1c2a2993ef4c779b1f',
    name: 'torey',
    ipv4: '136.73.221.44',
    devices: [
      {
        _id: '613e7f1c2a2993ef4c779b17',
        vendor: 'Cummings Group',
        status: 'Online',
        id: '613e7f1c2a2993ef4c779b17',
      },
      {
        _id: '613e7f1c2a2993ef4c779b18',
        vendor: 'MacGyver Group',
        status: 'Offline',
        id: '613e7f1c2a2993ef4c779b18',
      },
    ],
    id: '613e7f1c2a2993ef4c779b1f',
  },
  {
    _id: '613e7f1c2a2993ef4c779b20',
    name: 'destany',
    ipv4: '116.222.228.191',
    devices: [
      {
        _id: '613e7f1c2a2993ef4c779b19',
        vendor: 'Wilderman - Zboncak',
        status: 'Offline',
        id: '613e7f1c2a2993ef4c779b19',
      },
      {
        _id: '613e7f1c2a2993ef4c779b1a',
        vendor: 'Kassulke - Auer',
        status: 'Online',
        id: '613e7f1c2a2993ef4c779b1a',
      },
    ],
    id: '613e7f1c2a2993ef4c779b20',
  },
  {
    _id: '613e7f1c2a2993ef4c779b21',
    name: 'lemuel',
    ipv4: '238.239.170.60',
    devices: [
      {
        _id: '613e7f1c2a2993ef4c779b1b',
        vendor: 'Bartell - Rippin',
        status: 'Online',
        id: '613e7f1c2a2993ef4c779b1b',
      },
      {
        _id: '613e7f1c2a2993ef4c779b1c',
        vendor: 'Rice Group',
        status: 'Online',
        id: '613e7f1c2a2993ef4c779b1c',
      },
    ],
    id: '613e7f1c2a2993ef4c779b21',
  },
];

describe('App test suite', () => {
  beforeEach(() => {
    createGateway.mockResolvedValue({});
    deleteGateway.mockResolvedValue({});
    updateGateway.mockResolvedValue({});
    fetchAllGateways.mockResolvedValue(gatewayMock);
  });

  it('creates a gateway', async () => {
    render(<App />);
    const addBtn = screen.getByTestId('add-gateway-btn');
    userEvent.click(addBtn);

    await screen.findByTestId('gateway-form');

    const nameInput = screen.getByTestId('gateway-form-name');
    const ipInput = screen.getByTestId('gateway-form-ipv4');

    const newName = 'new gateway';
    const newIP = '123.123.123.123';

    userEvent.clear(nameInput);
    userEvent.type(nameInput, newName);
    expect(nameInput).toHaveValue(newName);

    userEvent.clear(ipInput);
    userEvent.type(ipInput, newIP);
    expect(ipInput).toHaveValue(newIP);

    // Mimic server adding the gateway
    fetchAllGateways.mockResolvedValueOnce([
      ...gatewayMock,
      { id: 'test', name: newName, ipv4: newIP, devices: [] },
    ]);

    const saveBtn = screen.getByRole('button', { name: /save/i });
    userEvent.click(saveBtn);

    const gatewayName = await screen.findByText(`Name: ${newName}`);
    const gatewayIP = await screen.findByText(`IPv4: ${newIP}`);

    expect(gatewayName).toBeVisible();
    expect(gatewayIP).toBeVisible();
  });

  it('deletes a gateway', async () => {
    render(<App />);

    const [expandIcon] = await screen.findAllByTestId('expand-icon');
    userEvent.click(expandIcon);

    const [gatewayId] = screen.getAllByText(/ID:\s\w+/i);
    const deletedGatewayId = gatewayId.textContent.split(' ')[1];

    // Mimic server deleting the gateway
    fetchAllGateways.mockResolvedValueOnce(
      gatewayMock.filter((g) => g.id !== deletedGatewayId),
    );

    const [deleteBtn] = screen.getAllByTestId('delete-gateway');
    userEvent.click(deleteBtn);

    screen.getByTestId('alert-dialog');
    const confirmBtn = screen.getByTestId('delete-btn');
    userEvent.click(confirmBtn);

    const deletedGateway = await screen.findByText(`ID: ${deletedGatewayId}`);

    expect(deletedGateway).not.toBeInTheDocument();
  });
});

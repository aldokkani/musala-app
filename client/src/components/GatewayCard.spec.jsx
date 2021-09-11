import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import GatewayCard from './GatewayCard';

export const stub = {
  id: '613ca139b970065ac4bab3c5',
  name: 'lawrence',
  ipv4: '55.243.191.184',
  devices: [
    {
      id: '613ca139b970065ac4bab3bd',
      vendor: 'Jones - Adams',
      statues: 'Offline',
    },
    {
      id: '613ca139b970065ac4bab3be',
      vendor: 'Stracke LLC',
      statues: 'Online',
    },
  ],
};

describe('GatewayCard test suite', () => {
  const updateGateway = jest.fn();

  beforeEach(() => {
    render(<GatewayCard gateway={stub} updateGateway={updateGateway} />);
  });

  it('renders a gateway info', () => {
    const expandIcon = screen.getByTestId('expand-icon');
    const devicesList = screen.getByText(/Gateway Devices/i);
    const [gatewayId] = screen.getAllByText(/ID:\s\w+/i);
    const gatewayName = screen.getByText(/Name:\s\w+/i);
    const gatewayIP = screen.getByText(/IPv4:\s[\d.]+/i);

    expect(gatewayId).toBeVisible();
    expect(gatewayName).toBeVisible();
    expect(gatewayIP).toBeVisible();

    expect(devicesList).not.toBeVisible();

    userEvent.click(expandIcon);
    expect(devicesList).toBeVisible();
  });

  it('updates a gateway', async () => {
    const expandIcon = screen.getByTestId('expand-icon');
    userEvent.click(expandIcon);

    const editBtn = screen.getByTestId('edit-gateway');

    userEvent.click(editBtn);

    await screen.findByTestId('gateway-form');

    const nameInput = screen.getByTestId('gateway-form-name');
    const ipInput = screen.getByTestId('gateway-form-ipv4');

    const newName = 'new name';
    const newIP = '250.250.250.250';

    userEvent.clear(nameInput);
    userEvent.type(nameInput, newName);
    expect(nameInput).toHaveValue(newName);

    userEvent.clear(ipInput);
    userEvent.type(ipInput, newIP);
    expect(ipInput).toHaveValue(newIP);

    const saveBtn = screen.getByRole('button', { name: /save/i });
    userEvent.click(saveBtn);

    expect(updateGateway).toBeCalledTimes(1);
    expect(updateGateway).toBeCalledWith({
      ipv4: newIP,
      name: newName,
      id: stub.id,
    });
  });
});

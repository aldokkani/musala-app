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
      status: 'Offline',
    },
    {
      id: '613ca139b970065ac4bab3be',
      vendor: 'Stracke LLC',
      status: 'Online',
    },
  ],
};

describe('GatewayCard test suite', () => {
  const updateGateway = jest.fn();
  const updateDevice = jest.fn();
  const deleteDevice = jest.fn();

  beforeEach(() => {
    render(
      <GatewayCard
        gateway={stub}
        updateGateway={updateGateway}
        updateDevice={updateDevice}
        deleteDevice={deleteDevice}
      />,
    );
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

  it('updates a device', async () => {
    const expandIcon = screen.getByTestId('expand-icon');
    userEvent.click(expandIcon);

    const [editBtn] = screen.getAllByTestId('edit-device');

    userEvent.click(editBtn);

    await screen.findByTestId('device-form');

    const vendorInput = screen.getByTestId('device-form-vendor');
    const statusInput = screen.getByTestId('device-form-status');

    const newVendor = 'new vendor';
    userEvent.clear(vendorInput);
    userEvent.type(vendorInput, newVendor);
    expect(vendorInput).toHaveValue(newVendor);

    userEvent.click(statusInput);
    expect(statusInput).toBeChecked();

    const saveBtn = screen.getByRole('button', { name: /save/i });
    userEvent.click(saveBtn);

    expect(updateDevice).toBeCalledTimes(1);
    expect(updateDevice).toBeCalledWith({
      vendor: newVendor,
      status: 'Online',
      id: stub.devices[0].id,
    });
  });

  it('deletes a device', async () => {
    const expandIcon = screen.getByTestId('expand-icon');
    userEvent.click(expandIcon);

    const [deleteBtn] = screen.getAllByTestId('delete-device');
    userEvent.click(deleteBtn);

    await screen.findByTestId('alert-dialog');

    const confirmBtn = screen.getByTestId('delete-btn');
    userEvent.click(confirmBtn);

    expect(deleteDevice).toBeCalledTimes(1);
    expect(deleteDevice).toBeCalledWith({
      gatewayId: stub.id,
      deviceId: stub.devices[0].id,
    });
  });
});

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import GatewayCard from './GatewayCard';

describe('GatewayCard test suite', () => {
  beforeEach(() => {
    render(<GatewayCard />);
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

    const nameField = screen.getByLabelText(/name/i);
    const ipField = screen.getByLabelText(/ipv4/i);

    userEvent.type(nameField, 'new name');
    userEvent.type(ipField, '250.250.250.250');

    const saveBtn = screen.getByRole('button', { name: /save/i });
    userEvent.click(saveBtn);

    const gatewayName = screen.getByText(/Name:\s\w+/i);
    const gatewayIP = screen.getByText(/IPv4:\s[\d.]+/i);

    expect(gatewayName).toHaveText('ID: new name');
    expect(gatewayIP).toHaveText('IPv4: 250.250.250.250');
  });
});

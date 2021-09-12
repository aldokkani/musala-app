import { render, screen, logRoles, prettyDOM } from '@testing-library/react';
// import {logRoles} from '@testing-library/dom'
import App from './App';
import userEvent from '@testing-library/user-event';

describe('App test suite', () => {
  beforeEach(() => {
    render(<App />);
  });

  it('creates a gateway', async () => {
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

    const saveBtn = screen.getByRole('button', { name: /save/i });
    userEvent.click(saveBtn);

    const gatewayName = screen.getByText(`Name: ${newName}`);
    const gatewayIP = screen.getByText(`IPv4: ${newIP}`);

    expect(gatewayName).toBeVisible();
    expect(gatewayIP).toBeVisible();
  });

  it.only('deletes a gateway', async () => {
    const [expandIcon] = screen.getAllByTestId('expand-icon');
    userEvent.click(expandIcon);

    const [gatewayId] = screen.getAllByText(/ID:\s\w+/i);
    const deletedGatewayId = gatewayId.textContent.split(' ')[1];

    const [deleteBtn] = screen.getAllByTestId('delete-gateway');
    userEvent.click(deleteBtn);

    await screen.findByTestId('alert-dialog');

    const confirmBtn = screen.getByTestId('delete-btn');
    userEvent.click(confirmBtn);

    const deletedGateway = screen.queryByText(`ID: ${deletedGatewayId}`);

    expect(deletedGateway).not.toBeVisible();
  });
});

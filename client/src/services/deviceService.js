import { SERVER_URL } from './gatewayService';

export const createDevice = async (gatewayId, data) => {
  const response = await fetch(`${SERVER_URL}/gateways/${gatewayId}/devices`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (response.ok) {
    return await response.json();
  } else {
    throw Error(await response.text());
  }
};

export const updateDevice = async (gatewayId, id, data) => {
  const response = await fetch(
    `${SERVER_URL}/gateways/${gatewayId}/devices/${id}`,
    {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    },
  );
  return await response.json();
};

export const deleteDevice = async (gatewayId, id) => {
  const response = await fetch(
    `${SERVER_URL}/gateways/${gatewayId}/devices/${id}`,
    {
      method: 'DELETE',
    },
  );
  return await response.json();
};

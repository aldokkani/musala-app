export const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export const fetchAllGateways = async () => {
  const response = await fetch(`${SERVER_URL}/gateways`, {
    method: 'GET',
  });
  return await response.json();
};

export const createGateway = async (data) => {
  const response = await fetch(`${SERVER_URL}/gateways`, {
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

export const updateGateway = async (id, data) => {
  const response = await fetch(`${SERVER_URL}/gateways/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (response.ok) {
    return await response.json();
  } else {
    throw Error(await response.text());
  }
};

export const deleteGateway = async (id) => {
  const response = await fetch(`${SERVER_URL}/gateways/${id}`, {
    method: 'DELETE',
  });
  return await response.json();
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

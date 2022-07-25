import axios from 'axios';
import { getHeaders } from '../utils';

const api = axios.create({
  baseURL: `http://localhost:${process.env.REACT_APP_API_PORT || '3001'}`,
});

export const requestLogin = async (endpoint, body) => {
  const { data } = await api.post(endpoint, body);
  return data;
};

export const requestADM = async (body) => {
  const { token } = JSON.parse(localStorage.getItem('user'));
  const { data } = await api.post('/register/admin', body, {
    headers: {
      Authorization: token,
    },
  });
  return data;
};

export const getAllUsers = async (endpoint) => {
  const { token } = JSON.parse(localStorage.getItem('user'));
  const { data } = await api.get(endpoint, {
    headers: {
      Authorization: token,
    },
  });
  return data;
};

export const getProducts = async () => {
  const { data } = await api.get('/products', getHeaders());

  return data;
};

export const getSellers = async () => {
  const { data } = await api.get('/register/sellers', getHeaders());

  return data;
};

export const createSale = async (body) => {
  const { data } = await api.post('/sales', body, getHeaders());
  return data;
};

export const getOrders = async () => {
  const { token } = JSON.parse(localStorage.getItem('user'));
  const { data } = await api.get('/sales/user', {
    headers: { authorization: token },
  });

  return data;
};

export const getOrder = async (id) => {
  const { token } = JSON.parse(localStorage.getItem('user'));
  const { data } = await api.get(`/sales/${id}`, {
    headers: { authorization: token },
  });

  return data;
};

export const updateStatus = async (id, status) => {
  const { token } = JSON.parse(localStorage.getItem('user'));
  const { data } = await api.patch(`/sales/${id}`,
    { status },
    { headers: { authorization: token } });

  return data;
};

export const deleteUser = async (id) => {
  const { token } = JSON.parse(localStorage.getItem('user'));
  await api.delete(`/register/${id}`, {
    headers: {
      authorization: token,
    },
  });
};
export default api;

import axios from 'axios';
import getHeaders from '../utils';

const api = axios.create({
  baseURL: `http://localhost:${process.env.REACT_APP_API_PORT || '3001'}`,
});

export const requestLogin = async (endpoint, body) => {
  const { data } = await api.post(endpoint, body);
  return data;
};

export const getProducts = async () => {
  const { data } = await api.get('/products', getHeaders());

  return data;
};

export const getSellers = async () => {
  const { data } = await api.get('/checkout');
  return data;
};

export const createSale = async (data) => {
  const response = await api.post('/checkout', data, getHeaders());
  return response;
};

export default api;

import axios from 'axios';

const api = axios.create({
  baseURL: `http://localhost:${process.env.REACT_APP_API_PORT || '3001'}`,
});

export const requestLogin = async (endpoint, body) => {
  const { data } = await api.post(endpoint, body);
  return data;
};

export const getProducts = async () => {

  const { token } = JSON.parse(localStorage.getItem('user'));
  const { data } = await api.get('/products', {
    headers: { Authorization: token },
  });

  return data;
};

export const getSellers = async () => {
  const { data } = await api.get('/checkout');
  return data;
};

export const createSale = async ({ data, token }) => {
  const response = await api.post('/checkout', data, {
    headers: {
      Authorization: token,
    },
  });
  return response;
};

export default api;

import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api',
  headers: {
    Accept: 'application/json',
  },
  timeout: 15000,
});

export async function getData(endpoint, params = {}, config = {}) {
  const response = await api.get(endpoint, {
    ...config,
    params: {
      ...params,
      ...(config.params || {}),
    },
  });

  return response.data;
}

export async function postData(endpoint, data = {}, config = {}) {
  const response = await api.post(endpoint, data, config);
  return response.data;
}

export default api;
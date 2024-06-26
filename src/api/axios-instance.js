import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://scanbarcode-back.onrender.com/api',
});

export const setToken = (accessToken) => {
  if (accessToken) {
    return (axiosInstance.defaults.headers.authorization = `Bearer ${accessToken}`);
  }
  axiosInstance.defaults.headers.authorization = '';
};

import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:4000/api',
  timeout: 3000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const jwt = JSON.parse(localStorage.getItem('jwt'));
    // eslint-disable-next-line no-param-reassign
    config.headers = {
      ...config.headers,
      Authorization: jwt ? `Bearer ${jwt.token}` : '',
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;

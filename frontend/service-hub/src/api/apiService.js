import axiosInstance from './axiosConfig';

export const apiLogin = (data) => {
  return axiosInstance
    .post('auth/login', data)
    .then((response) => {
      localStorage.setItem('jwt', JSON.stringify(response.data));
      localStorage.setItem('user', JSON.stringify(response.data.user));
      return response.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
};

export const apiRegister = (data) => {
  return axiosInstance
    .post('auth/register', data)
    .then((response) => {
      localStorage.setItem('jwt', JSON.stringify(response.data));
      localStorage.setItem('user', JSON.stringify(response.data.user));
      return response.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
};

export const apiRequestPasswordReset = (email) => {
  return axiosInstance
    .post('auth/request-password-reset', { email })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export const apiResetPassword = ({ token, password }) => {
  return axiosInstance
    .post('auth/reset-password', { token, password })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export const validateToken = (token) => {
  return axiosInstance
    .post('auth/validate-token', { token })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

// TODO: Implement this method in backend
export const refreshToken = () => {
  return axiosInstance
    .post('auth/refresh-token')
    .then((response) => {
      localStorage.setItem('jwt', JSON.stringify(response.data));
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

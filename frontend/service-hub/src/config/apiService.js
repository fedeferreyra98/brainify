import axiosInstance from './axiosConfig';

export const apiLogin = (data) => {
  return axiosInstance
    .post('/auth/login', data)
    .then((response) => {
      localStorage.setItem('jwt', JSON.stringify(response.data.jwt));
      localStorage.setItem('user', JSON.stringify(response.data.user));
      return response.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
};

export const apiRegister = (data) => {
  return axiosInstance
    .post('/auth/register', data)
    .then((response) => {
      localStorage.setItem('jwt', JSON.stringify(response.data.jwt));
      localStorage.setItem('user', JSON.stringify(response.data.user));
      return response.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
};

export const requestPasswordReset = (email) => {
  return axiosInstance
    .post('/auth/requestPasswordReset', { email })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export const resetPassword = ({ token, password }) => {
  return axiosInstance
    .post('/auth/resetPassword', { token, password })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export const validateToken = (token) => {
  return axiosInstance
    .post('/auth/validateToken', { token })
    .then((response) => response.data.valid)
    .catch((error) => {
      throw error;
    });
};

export const refreshToken = () => {
  return axiosInstance
    .get('/auth/refresh')
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export const getServices = (category) => {
  return axiosInstance
    .get(`/services?category=${category}`)
    .then((response) => response.data.services)
    .catch((error) => {
      throw error;
    });
};

export const getServicesByUser = () => {
  return axiosInstance
    .get(`/services/user`)
    .then((response) => response.data.services)
    .catch((error) => {
      throw error;
    });
};

export const deleteService = (classId) => {
  return axiosInstance
    .delete(`/services/${classId}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export const getPublicUserData = (userId) => {
  return axiosInstance
    .get(`/users/${userId}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export const createService = (data) => {
  return axiosInstance
    .post('/services', data)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export const editService = (classId, data) => {
  return axiosInstance
    .patch(`/services/${classId}`, data)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export const getClassDetails = (classId) => {
  return axiosInstance
    .get(`/services/${classId}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export const createComment = (classId, data) => {
  return axiosInstance
    .post(`/comments/${classId}`, data)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export const updateComment = (commentId, data) => {
  return axiosInstance
    .patch(`/comments/${commentId}`, data)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export const getAllComments = (classId) => {
  return axiosInstance
    .get(`/comments/${classId}/all`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export const getUnblockedComments = (classId) => {
  return axiosInstance
    .get(`/comments/${classId}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export const getServiceContracts = (classId) => {
  return axiosInstance
    .get(`/serviceContracts/${classId}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export const createServiceContract = (classId, data) => {
  return axiosInstance
    .post(`/serviceContracts/${classId}`, data)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export const getServiceContractsByUser = () => {
  return axiosInstance
    .get(`/serviceContracts/user`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export const updateServiceContract = (classId, data) => {
  return axiosInstance
    .patch(`/serviceContracts/${classId}`, data)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export const uploadImage = (file) => {
  const formData = new FormData();
  formData.append('file', file);
  return axiosInstance
    .patch(`/users/profileImage`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export const updateUser = (data) => {
  return axiosInstance
    .patch('/users', data)
    .then((response) => {
      localStorage.setItem('user', JSON.stringify(response.data.leanUser));
      return response.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
};

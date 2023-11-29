import axiosInstance from './axiosConfig';

export const apiLogin = (data) => {
  return axiosInstance
    .post('/auth/login', data)
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
    .post('/auth/register', data)
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
    .post('/auth/request-password-reset', { email })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export const apiResetPassword = ({ token, password }) => {
  return axiosInstance
    .post('/auth/reset-password', { token, password })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export const validateToken = (token) => {
  return axiosInstance
    .post('/auth/validate-token', { token })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

// TODO: Implement this method in backend
export const refreshToken = () => {
  return axiosInstance
    .post('/auth/refresh-token')
    .then((response) => {
      localStorage.setItem('jwt', JSON.stringify(response.data));
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

// Service Endpoints: /api/service

export const apiGetServices = (category) => {
  return axiosInstance
    .get(`/service/${category}`)
    .then((response) => response.data.services)
    .catch((error) => {
      throw error;
    });
};

export const apiGetServicesByUser = () => {
  return axiosInstance
    .get(`/service/user`)
    .then((response) => response.data.services)
    .catch((error) => {
      throw error;
    });
};

export const apiGetServiceById = (serviceId) => {
  return axiosInstance
    .get(`/service/${serviceId}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export const apiDeleteService = (serviceId) => {
  return axiosInstance
    .delete(`/service/${serviceId}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export const apiCreateService = (data) => {
  return axiosInstance
    .post('/service', data)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export const apiUpdateService = (serviceId, data) => {
  return axiosInstance
    .patch(`/service/${serviceId}`, data)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};


// User endpoints /api/user
export const apiGetPublicUserData = (userId) => {
    return axiosInstance
    .get(`/user/${userId}`)
    .then((response) => response.data)
    .catch((error) => {
        throw error;
    });
}

export const apiUploadImage = (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return axiosInstance
    .patch('/user/profileImg' , formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
    },
    })
    .then((response) => response.data)
    .catch((error) => {
        throw error;
    });
};


export const apiUpdateUser = (data) => {
    return axiosInstance
    .patch('/user', data)
    .then((response) => {
        localStorage.setItem('user', JSON.stringify(response.data.user));
        return response.data;
    })
    .catch((error) => {
        throw error.response.data;
    });
}

//Hiring endpoints /api/hiring

export const apiGetHiringsByServiceId = (serviceId) => {
    return axiosInstance
    .get(`/hiring/${serviceId}`)
    .then((response) => response.data)
    .catch((error) => {
        throw error;
    });
};

export const apiGetHiringsByUser = () => {
    return axiosInstance
    .get(`/hiring/user`)
    .then((response) => response.data)
    .catch((error) => {
        throw error;
    });
};

export const apiCreateHiring = (serviceId, hiringData) => {
    return axiosInstance
    .post(`/hiring/${serviceId}`, hiringData)
    .then((response) => response.data)
    .catch((error) => {
        throw error;
    });
};

export const apiUpdateHiring = (hiringId, hiringData) => {
    return axiosInstance
    .patch(`/hiring/${hiringId}`, hiringData)
    .then((response) => response.data)
    .catch((error) => {
        throw error;
    });
};
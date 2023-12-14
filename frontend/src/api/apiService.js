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

export const apiChangePassword = (originalPass, newPass) => {
  return axiosInstance
    .post('/auth/change-password', {
      originalPass,
      newPass,
    })
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
// export const refreshToken = () => {
//   return axiosInstance
//     .post('/auth/refresh-token')
//     .then((response) => {
//       localStorage.setItem('jwt', JSON.stringify(response.data));
//       return response.data;
//     })
//     .catch((error) => {
//       throw error;
//     });
// };

// Service Endpoints: /api/service

// eslint-disable-next-line no-unused-vars
export const apiGetServices = (category) => {
  return axiosInstance
    .get(`/service`)
    .then((response) => response.data.services)
    .catch((error) => {
      throw error;
    });
};

export const apiGetTop3Services = () => {
  return axiosInstance
    .get(`/service/top3`)
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
};

export const apiUpdateUserProfileImage = (file) => {
  const formData = new FormData();
  formData.append('file', file);
  return axiosInstance
    .patch('/user/profileImg', formData, {
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
    .patch(`/user`, data)
    .then((response) => {
      localStorage.setItem('user', JSON.stringify(response.data.user));
      return response.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
};

// Hiring endpoints /api/hiring

export const apiGetHiringsByServiceId = (serviceId) => {
  return axiosInstance
    .get(`/hiring/${serviceId}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export const apiGetHiringsByUser = (userId) => {
  return axiosInstance
    .get(`/hiring/user/${userId}`)
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

// Comment endpoints /api/comment

export const apiCreateComment = (serviceId, commentData) => {
  return axiosInstance
    .post(`/comment/${serviceId}`, commentData)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export const apiGetCommentsByServiceId = (serviceId) => {
  return axiosInstance
    .get(`/comment/${serviceId}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export const apiGetAllCommentsByServiceId = (serviceId) => {
  return axiosInstance
    .get(`/comment/${serviceId}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export const apiGetTop3CommentsByServiceId = (serviceId) => {
  return axiosInstance
    .get(`/comment/${serviceId}/top3`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export const apiGetAllCommentsByUser = (userId) => {
  return axiosInstance
    .get(`/comment/my/${userId}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export const apiUpdateComment = (commentId, status) => {
  return axiosInstance
    .patch(`/comment/${commentId}`, status)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export const apiDeleteComment = (commentId) => {
  return axiosInstance
    .delete(`/comment/rm/${commentId}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

// Utilities endpoints

export const apiUploadImage = (file) => {
  const formData = new FormData();
  formData.append('file', file);
  return axiosInstance
    .patch('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

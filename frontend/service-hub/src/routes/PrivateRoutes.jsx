/* eslint-disable react/function-component-definition */
import React from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../components/auth/AuthContext';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = React.useContext(AuthContext);
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;

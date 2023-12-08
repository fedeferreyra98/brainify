/* eslint-disable react/function-component-definition */
import React from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../components/auth/AuthContext';
import { ROUTE_LOGIN } from './routePaths';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = React.useContext(AuthContext);
  return isAuthenticated ? children : <Navigate to={ROUTE_LOGIN} />;
};

export default PrivateRoute;

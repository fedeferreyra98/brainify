/* eslint-disable import/prefer-default-export */
// Components and pages
import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginPage from '../pages/Login';
import ServiceExplorer from '../pages/ServiceExplorer/index';
import SignupPage from '../pages/Signup';
import MyServices from '../pages/MyServices';
import ProviderProfile from '../pages/ProviderProfile';
import Comments from '../pages/Comments';
import Hirings from '../pages/Hirings';
import LandingPage from '../pages/Home/index';
import ForgotPassword from '../pages/ForgotPassword/index';
import ChangePassword from '../pages/ChangePassword/index';
import RestorePassword from '../pages/ResetPassword/index';
import notFoundImage from '../assets/Logos/notFound.jpg';
import {
  ROUTE_HOME,
  ROUTE_FORGOT_PASSWORD,
  ROUTE_CHANGE_PASSWORD,
  ROUTE_RESTORE_PASSWORD,
  ROUTE_LOGIN,
  ROUTE_EXPLORE_SERVICES,
  ROUTE_SIGNUP,
  ROUTE_MY_SERVICES,
  ROUTE_PROVIDER_PROFILE,
  ROUTE_COMMENTS,
  ROUTE_HIRINGS,
  ROUTE_NOT_FOUND,
} from './routePaths';

function ProtectedRoute({ children }) {
  const isAuthenticated = true; // Aquí puedes verificar si el usuario está autenticado (el que vale es el de dentro de app)
  const navigate = useNavigate();
  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }
  return children;
}
function NotFoundPage() {
  const notFoundStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  };

  const responsiveImageStyles = {
    maxWidth: '50%', // Asegura que la imagen no exceda el ancho del contenedor
    height: 'auto', // Mantiene la proporción de la imagen
  };

  return (
    <div style={notFoundStyles}>
      <img
        src={notFoundImage}
        alt="Página no encontrada"
        style={responsiveImageStyles}
      />
    </div>
  );
}

// Route elements
export const routesConfig = [
  { path: ROUTE_HOME, element: <LandingPage />, requireAuth: false },

  {
    path: ROUTE_FORGOT_PASSWORD,
    element: <ForgotPassword />,
    requireAuth: false,
  },

  {
    path: ROUTE_CHANGE_PASSWORD,
    element: <ChangePassword />,
    requireAuth: false,
  },

  {
    path: ROUTE_RESTORE_PASSWORD,
    element: <RestorePassword />,
    requireAuth: false,
  },

  { path: ROUTE_LOGIN, element: <LoginPage />, requireAuth: false },

  {
    path: ROUTE_EXPLORE_SERVICES,
    element: <ServiceExplorer />,
    requireAuth: false,
  },

  { path: ROUTE_SIGNUP, element: <SignupPage />, requireAuth: false },

  {
    path: ROUTE_MY_SERVICES,
    element: (
      <ProtectedRoute>
        <MyServices />
      </ProtectedRoute>
    ),
    requireAuth: true,
  },

  {
    path: ROUTE_PROVIDER_PROFILE,
    element: (
      <ProtectedRoute>
        <ProviderProfile />
      </ProtectedRoute>
    ),
    requireAuth: true,
  },

  {
    path: ROUTE_COMMENTS,
    element: (
      <ProtectedRoute>
        <Comments />
      </ProtectedRoute>
    ),
  },
  {
    path: ROUTE_HIRINGS,
    element: (
      <ProtectedRoute>
        <Hirings />
      </ProtectedRoute>
    ),
    requireAuth: true,
  },

  { path: ROUTE_NOT_FOUND, element: <NotFoundPage />, requireAuth: false },
];

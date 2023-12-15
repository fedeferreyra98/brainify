/* eslint-disable no-use-before-define */
/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { validateToken, apiLogin, apiRegister } from '../../api/apiService';
import { ROUTE_LOGIN } from '../../routes/routePaths';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [session, setSession] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Nuevo estado para el indicador de carga

  useEffect(() => {
    const checkTokenValidity = async () => {
      const storedUser = localStorage.getItem('user');
      const storedToken = localStorage.getItem('jwt');
      if (storedUser && storedToken) {
        try {
          setIsLoading(true); // Inicia el indicador de carga
          const obj = JSON.parse(storedToken);
          const isValid = obj.token && (await validateToken(obj.token));
          if (isValid) {
            setSession(JSON.parse(storedUser));
            setIsAuthenticated(isValid);
          } else {
            console.log('Entre al else');
            handleLogout();
          }
        } catch (error) {
          console.error('Error al validar el token:', error);
          handleLogout();
        } finally {
          setIsLoading(false); // Finaliza el indicador de carga
        }
      } else {
        setIsLoading(false); // Finaliza el indicador de carga si no hay token
      }
    };
    checkTokenValidity();
  }, []);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh', // Altura del viewport para centrar verticalmente
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  const handleLogin = async (email, password) => {
    try {
      const response = await apiLogin({ email, password });
      setSession(response.user);
      setIsAuthenticated(true);
      return response;
    } catch (error) {
      console.log('Error al iniciar sesion:', error);
      throw error;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');
    setSession(null);
    setIsAuthenticated(false);
    navigate(ROUTE_LOGIN);
  };

  const register = async (userData) => {
    try {
      const response = await apiRegister(userData);
      setSession(response.user);
      setIsAuthenticated(true);
      return response;
    } catch (error) {
      console.error('Error al registrarse:', error);
      throw error;
    }
  };

  const contextValue = {
    isAuthenticated,
    setIsAuthenticated,
    handleLogout,
    handleLogin,
    session,
    setSession,
    register,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

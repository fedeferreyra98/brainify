/* eslint-disable no-use-before-define */
/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateToken, apiLogin, apiRegister } from '../../api/apiService';
import { ROUTE_LOGIN } from '../../routes/routePaths';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [session, setSession] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkTokenValidity = async () => {
      const storedUser = await localStorage.getItem('user');
      const storedToken = await localStorage.getItem('jwt');
      if (storedUser && storedToken) {
        try {
          const obj = JSON.parse(storedToken);
          const isValid = await validateToken(obj.token);
          if (isValid) {
            setSession(JSON.parse(storedUser));
            setIsAuthenticated(true);
          } else {
            console.log('Entre al else');
            handleLogout();
          }
        } catch (error) {
          console.error('Error al validar el token:', error);
          handleLogout();
        }
      }
    };
    checkTokenValidity();
  }, []);

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

/* eslint-disable no-use-before-define */
/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, useState, useEffect } from 'react';
import { validateToken, apiLogin } from '../../api/apiService';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [session, setSession] = useState(null);

  useEffect(() => {
    const checkTokenValidity = async () => {
      const storedUser = localStorage.getItem('user');
      const storedToken = localStorage.getItem('jwt');
      if (storedUser && storedToken) {
        try {
          const isValid = await validateToken(JSON.parse(storedToken).token);
          if (isValid) {
            setSession(JSON.parse(storedUser));
            setIsAuthenticated(true);
          } else {
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
  };

  const contextValue = {
    isAuthenticated,
    setIsAuthenticated,
    handleLogout,
    handleLogin,
    session,
    setSession,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

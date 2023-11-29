// AuthContext.js
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user] = useState(null);

  const refreshAccessToken = async () => {};

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <AuthContext.Provider value={{ user, refreshAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
}

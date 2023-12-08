/* eslint-disable react/no-array-index-key */
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {
  CssBaseline,
  Container,
  ThemeProvider,
  StyledEngineProvider,
  createTheme,
} from '@mui/material';
import ResponsiveAppBar from './components/ui/NavBar';
import './assets/stylesheets/styles.css';
import { routesConfig } from './routes/routes';

import PrivateRoute from './routes/PrivateRoutes';
import { AuthProvider } from './components/auth/AuthContext';

const theme = createTheme();

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Router>
          <AuthProvider>
            <div>
              <CssBaseline />
              <ResponsiveAppBar position="fixed" />

              <Container style={{ paddingTop: '64px' }}>
                <Routes>
                  {routesConfig.map((route, index) => {
                    return (
                      <Route
                        key={index}
                        path={route.path}
                        element={
                          route.requireAuth ? (
                            <PrivateRoute>{route.element}</PrivateRoute>
                          ) : (
                            route.element
                          )
                        }
                      />
                    );
                  })}
                </Routes>
              </Container>
            </div>
          </AuthProvider>
        </Router>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;

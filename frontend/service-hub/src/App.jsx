/* eslint-disable react/no-array-index-key */
import React, { useEffect } from 'react';
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
import { ROUTE_LOGIN, routesConfig } from './config/routes';
import LoginPage from './pages/Login/index';
import { validateToken } from './api/apiService';
import PrivateRoute from './routes/PrivateRoutes';

const theme = createTheme();

function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      validateToken(JSON.parse(token).token)
        .then((response) => {
          if (response.valid) {
            setIsAuthenticated(true);
          }
        })
        .catch((err) => console.log(err));
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Router>
          <div>
            <CssBaseline />
            <ResponsiveAppBar
              isAuthenticated={isAuthenticated}
              onLogout={handleLogout}
              position="fixed"
            />

            <Container style={{ paddingTop: '64px' }}>
              <Routes>
                {routesConfig.map((route, index) => {
                  if (route.path === ROUTE_LOGIN) {
                    return (
                      <Route
                        key={index}
                        path={route.path}
                        element={<LoginPage onLogin={handleLogin} />}
                      />
                    );
                  }
                  return (
                    <Route
                      key={index}
                      path={route.path}
                      element={
                        route.requireAuth ? (
                          <PrivateRoute isAuthenticated={isAuthenticated}>
                            {route.element}{' '}
                          </PrivateRoute>
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
        </Router>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;

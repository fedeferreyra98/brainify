import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from 'react-router-dom';
import {
  CssBaseline,
  Container,
  ThemeProvider,
  StyledEngineProvider,
  createTheme,
} from '@mui/material';
import LoginPage from './pages/Login';
import ServiceExplorer from './components/ServiceExplorer';
import SignupPage from './pages/Signup';
import MyServices from './components/MyServices';
import ProviderProfile from './components/ProviderProfile';
import Comments from './pages/Comments';
import Hirings from './pages/Hirings';
import ResponsiveAppBar from './components/ui/NavBar';
import LandingPage from './pages/Home/index';
import './assets/stylesheets/styles.css';
import ForgotPassword from './pages/ForgotPassword/index';
import ChangePassword from './pages/ChangePassword/index';

const theme = createTheme();
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
  return <div>Página no encontrada</div>;
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false); // Aquí puedes verificar si el usuario está autenticado

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
                <Route path="/" element={<LandingPage />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/change-password" element={<ChangePassword />} />

                <Route
                  path="/login"
                  element={<LoginPage onLogin={handleLogin} />}
                />
                <Route
                  path="/explorar-servicios"
                  element={<ServiceExplorer />}
                />
                <Route path="/registro" element={<SignupPage />} />
                <Route
                  path="/mis-servicios"
                  element={
                    <ProtectedRoute>
                      <MyServices />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/perfil-proveedor"
                  element={
                    <ProtectedRoute>
                      <ProviderProfile />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/comentarios"
                  element={
                    <ProtectedRoute>
                      <Comments />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/contrataciones"
                  element={
                    <ProtectedRoute>
                      <Hirings />
                    </ProtectedRoute>
                  }
                />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Container>
          </div>
        </Router>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;

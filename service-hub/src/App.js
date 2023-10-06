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
import LoginPage from './components/LoginPage';
import ServiceExplorer from './components/ServiceExplorer';
import SignupPage from './components/SignupPage';
import MyServices from './components/MyServices';
import ProviderProfile from './components/ProviderProfile';
import Comments from './pages/Comments';
import Hirings from './pages/Hirings';
import ResponsiveAppBar from './context/NavBar';
import LandingPage from './pages/Home/index';
import './assets/stylesheets/styles.css';

const theme = createTheme();
function ProtectedRoute({ children }) {
  const isAuthenticated = false; // Aquí puedes verificar si el usuario está autenticado
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
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Router>
          <div>
            <CssBaseline />
            <ResponsiveAppBar />

            <Container style={{ paddingTop: '64px' }}>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
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

import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import logo from '../../assets/Logos/company-logo.ico';
import { AuthContext } from '../auth/AuthContext';
import { apiGetPublicUserData } from '../../api/apiService';
import {
  ROUTE_LOGIN,
  ROUTE_SIGNUP,
  ROUTE_COMMENTS,
  ROUTE_EXPLORE_SERVICES,
  ROUTE_MY_SERVICES,
  ROUTE_HIRINGS,
  ROUTE_HOME,
  ROUTE_PROVIDER_PROFILE,
} from '../../routes/routePaths';

const pages = [
  'Explorar Servicios',
  'Mis Servicios',
  'Comentarios',
  'Contrataciones',
];
const pageRoutes = {
  'Explorar Servicios': ROUTE_EXPLORE_SERVICES,
  'Mis Servicios': ROUTE_MY_SERVICES,
  Comentarios: ROUTE_COMMENTS,
  Contrataciones: ROUTE_HIRINGS,
  Login: ROUTE_LOGIN,
  Registro: ROUTE_SIGNUP,
  ProviderProfile: ROUTE_PROVIDER_PROFILE,
};
const homePage = ROUTE_HOME;

const settings = ['Perfil', 'Cambiar contraseña', 'Salir'];

function ResponsiveAppBar() {
  const { isAuthenticated, handleLogout } = useContext(AuthContext);
  const [providerInfo, setProviderInfo] = useState(null);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogoutClick = () => {
    handleCloseUserMenu();
    handleLogout();
  };

  const storedUser = localStorage.getItem('user');
  useEffect(() => {
    // Función para cargar los datos privados del usuario
    const loadPrivateUserData = async () => {
      const obj = JSON.parse(storedUser);
      try {
        const response = await apiGetPublicUserData(obj.id);
        setProviderInfo(response.publicProfile); // Actualiza el estado con la información privada del usuario
      } catch (error) {
        console.error('Error al cargar la información del usuario:', error);
      }
    };

    if (storedUser) {
      loadPrivateUserData();
    }
  }, [storedUser, isAuthenticated]); // Dependencia: storedUser

  if (!providerInfo && isAuthenticated) {
    return <div>Loading NavBar...</div>;
  }

  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/** TODO: Change this icon */}
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to={`${homePage}`}
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              '&:hover, &:active, &:focus': {
                textDecoration: 'none !important',
              },
            }}
          >
            <img
              src={logo}
              alt="Company Logo"
              style={{
                height: '30px',
                marginRight: '10px',
                verticalAlign: 'middle',
              }}
            />
            BRAINIFY
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => {
                if (
                  !isAuthenticated &&
                  (page === 'Mis Servicios' ||
                    page === 'Comentarios' ||
                    page === 'Contrataciones')
                ) {
                  return null; // No renderizar estos botones si el usuario no está autenticado
                }
                return (
                  <MenuItem
                    key={page}
                    onClick={handleCloseNavMenu}
                    component={Link}
                    to={`${pageRoutes[page]}`}
                  >
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                );
              })}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component={Link}
            to={`${homePage}`}
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              '&:hover, &:active, &:focus': {
                textDecoration: 'none',
              },
            }}
          >
            <img
              src={logo}
              alt="Company Logo"
              style={{
                height: '30px',
                marginRight: '10px',
                verticalAlign: 'middle',
              }}
            />
            BRAINIFY
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => {
              if (
                !isAuthenticated &&
                (page === 'Mis Servicios' ||
                  page === 'Comentarios' ||
                  page === 'Contrataciones')
              ) {
                return null; // No renderizar estos botones si el usuario no está autenticado
              }
              return (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  component={Link}
                  to={`${pageRoutes[page]}`}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page}
                </Button>
              );
            })}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            {!isAuthenticated ? (
              <Button component={Link} to="/login" sx={{ color: 'white' }}>
                Proveedores
              </Button>
            ) : (
              <>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt={`${providerInfo.firstName} ${providerInfo.lastName}`}
                      src="/static/images/avatar/2.jpg"
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => {
                    let toPath;
                    if (setting === 'Salir') {
                      toPath = '/login';
                    } else if (setting === 'Perfil') {
                      toPath = '/perfil-proveedor';
                    } else if (setting === 'Cambiar contraseña') {
                      toPath = '/change-password'; // Ajusta esta ruta a donde desees que lleve esta opción.
                    }

                    return (
                      <MenuItem
                        key={setting}
                        onClick={
                          setting === 'Salir'
                            ? handleLogoutClick
                            : handleCloseUserMenu
                        }
                        component={Link}
                        to={toPath}
                      >
                        <Typography textAlign="center">{setting}</Typography>
                      </MenuItem>
                    );
                  })}
                </Menu>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;

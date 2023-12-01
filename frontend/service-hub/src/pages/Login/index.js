import React, { useContext, useState } from 'react';
import { Button, Container, Typography, Grid, TextField } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { Link, useNavigate } from 'react-router-dom';
import SimplePasswordField from '../../components/form/SimplePasswordField';
import NotificationRed from '../../components/ui/NotificationRed';
import { AuthContext } from '../../components/auth/AuthContext';
import { ROUTE_MY_SERVICES } from '../../config/routePaths';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#DDEBF8',
  },
  button: {
    margin: theme.spacing(1),
  },
  textField: {
    margin: theme.spacing(1),
    width: '100%',
  },
}));

function LoginPage() {
  const { handleLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const classes = useStyles();
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const [notificationRedOpen, setNotificationRedOpen] = useState(false);
  const [notificationRedMessage, setNotificationRedMessage] = useState('');

  // Actualiza el estado de las credenciales
  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const onLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await handleLogin(
        credentials.email,
        credentials.password
      );
      if (response) {
        navigate(ROUTE_MY_SERVICES);
      }
    } catch (error) {
      setNotificationRedMessage(
        error.errors[0].message || 'Error al iniciar sesión'
      );
      setNotificationRedOpen(true);
    }
  };

  return (
    <Container className={classes.root}>
      <Typography variant="h4" gutterBottom>
        Iniciar Sesión
      </Typography>
      <form onSubmit={onLogin}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12}>
            <TextField
              className={classes.textField}
              label="Correo electrónico"
              variant="outlined"
              name="email"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <SimplePasswordField
              className={classes.textField}
              label="Contraseña"
              variant="outlined"
              name="password"
              onChange={handleChange}
            />
          </Grid>
        </Grid>
        <Button
          variant="submit"
          color="primary"
          className={classes.button}
          onClick={onLogin}
        >
          Iniciar Sesión
        </Button>
      </form>
      <Button
        className={classes.button}
        color="primary"
        component={Link}
        to="/forgot-password"
      >
        ¿Olvidaste tu contraseña?
      </Button>
      <Typography variant="body1" className={classes.button}>
        ¿Todavía no tienes una cuenta? <Link to="/registro">Regístrate</Link>
      </Typography>
      <NotificationRed
        open={notificationRedOpen}
        message={notificationRedMessage}
        onClose={() => setNotificationRedOpen(false)}
      />
    </Container>
  );
}

export default LoginPage;

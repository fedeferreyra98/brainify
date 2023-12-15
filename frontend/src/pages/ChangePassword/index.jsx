import React, { useState } from 'react';
import { Button, Typography, Container, Box, Link, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';
import { apiChangePassword } from '../../api/apiService';
import SimplePasswordField from '../../components/form/SimplePasswordField';
import ControlledPasswordField from '../../components/form/ControlledPasswordField';
import NotificationRed from '../../components/ui/NotificationRed';
import NotificationGreen from '../../components/ui/NotificationGreen';
import {
  ROUTE_PROVIDER_PROFILE,
  ROUTE_LOGIN,
  ROUTE_FORGOT_PASSWORD,
} from '../../routes/routePaths';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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
  title: {
    margin: theme.spacing(1),
  },
}));

function ChangePasswordPage() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [originalPassword, setOriginalPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [notificationRedOpen, setNotificationRedOpen] = useState(false);
  const [notificationRedMessage, setNotificationRedMessage] = useState('');
  const [notificationGreenOpen, setNotificationGreenOpen] = useState(false);
  const [notificationGreenMessage, setNotificationGreenMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setNotificationRedMessage('Las contraseñas ingresadas no coinciden.');
      setNotificationRedOpen(true);
      return;
    }

    try {
      console.log(originalPassword);
      console.log(password);
      await apiChangePassword(originalPassword, password);
      navigate(ROUTE_PROVIDER_PROFILE);
    } catch (error) {
      setNotificationRedMessage('Error al cambiar la contraseña', 'error');
    }
    // Aquí puedes agregar la lógica para restablecer la contraseña en la base de datos.
    setNotificationGreenMessage('Contraseña modificada con exito!');
    setNotificationGreenOpen(true);
  };

  return (
    <Container className={classes.root}>
      <Box sx={{ p: 3 }}>
        <Typography className={classes.title} variant="h4" gutterBottom>
          Modificar Contraseña
        </Typography>
      </Box>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={12}>
            <SimplePasswordField
              className={classes.textField}
              label="Contraseña Original"
              value={originalPassword}
              onChange={(event) => setOriginalPassword(event.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <ControlledPasswordField
              className={classes.textField}
              label="Nueva Contraseña"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <SimplePasswordField
              className={classes.textField}
              label="Confirmar Contraseña"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
            />
          </Grid>
          <Grid item xs={4}>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="secondary"
                type="submit"
                fullWidth
                sx={{ mt: 3, mb: 1 }}
              >
                Confirmar
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                color="primary"
                variant="contained"
                type="submit"
                fullWidth
                onClick={() => navigate(ROUTE_LOGIN)}
              >
                Volver
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                color="primary"
                fullWidth
                component={Link}
                to={ROUTE_FORGOT_PASSWORD}
              >
                ¿Olvidaste tu contraseña?
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
      <NotificationRed
        open={notificationRedOpen}
        message={notificationRedMessage}
        onClose={() => setNotificationRedOpen(false)}
      />
      <NotificationGreen
        open={notificationGreenOpen}
        message={notificationGreenMessage}
        onClose={() => setNotificationGreenOpen(false)}
      />
    </Container>
  );
}

export default ChangePasswordPage;

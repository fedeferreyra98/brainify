import React, { useState } from 'react';
import { Button, Typography, Container, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';
import { apiChangePassword } from '../../api/apiService';
import SimplePasswordField from '../../components/form/SimplePasswordField';
import ControlledPasswordField from '../../components/form/ControlledPasswordField';
import NotificationRed from '../../components/ui/NotificationRed';
import NotificationGreen from '../../components/ui/NotificationGreen';
import { ROUTE_PROVIDER_PROFILE } from '../../routes/routePaths';

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
        <SimplePasswordField
          className={classes.textField}
          label="Contraseña Original"
          value={originalPassword}
          onChange={(event) => setOriginalPassword(event.target.value)}
          sx={{ mb: 2 }}
        />
        <ControlledPasswordField
          className={classes.textField}
          label="Nueva Contraseña"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          sx={{ mb: 2 }}
        />
        <SimplePasswordField
          className={classes.textField}
          label="Confirmar Contraseña"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          sx={{ mb: 2 }}
        />
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          type="submit"
        >
          Confirmar
        </Button>
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

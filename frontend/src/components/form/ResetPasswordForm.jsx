import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useFormik } from 'formik';
import { makeStyles } from '@mui/styles';
import * as Yup from 'yup';
import queryString from 'query-string';
import {
  Box,
  Typography,
  TextField,
  Button,
  Container,
  Grid,
} from '@mui/material';
import { apiResetPassword } from '../../api/apiService';
import NotificationGreen from '../ui/NotificationGreen';
import NotificationRed from '../ui/NotificationRed';
import { ROUTE_LOGIN } from '../../routes/routePaths';

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

function ResetPasswordForm() {
  const [notificationGreenOpen, setNotificationGreenOpen] = useState(false);
  const [notificationGreenMessage, setNotificationGreenMessage] = useState('');
  const [notificationRedOpen, setNotificationRedOpen] = useState(false);
  const [notificationRedMessage, setNotificationRedMessage] = useState('');
  const navigate = useNavigate();
  const { search } = useLocation();
  const { token } = queryString.parse(search);
  const classes = useStyles();

  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(8, 'La contraseña debe tener al menos 8 caracteres')
        .required('La contraseña es obligatoria'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Las contraseñas deben coincidir')
        .required('Confirmar contraseña es obligatorio'),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      try {
        const response = await apiResetPassword({
          token,
          password: values.password,
        });
        console.log(response);
        setNotificationGreenMessage('Contraseña reestablecida con exito!');
        setNotificationGreenOpen(true);
        setTimeout(() => {
          navigate(ROUTE_LOGIN);
        }, 3000);
      } catch (error) {
        setNotificationRedMessage('Error al cambiar la contraseña');
        setNotificationRedOpen(true);
      } finally {
        setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    if (!token) {
      setNotificationRedMessage('Token invalido');
      setNotificationRedOpen(true);
      navigate(ROUTE_LOGIN);
    }
  }, [token]);

  return (
    <Container className={classes.root}>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Restablecer contraseña
        </Typography>
      </Box>
      <Grid container spacing={2} justifyContent="center">
        <Box component="form" onSubmit={formik.handleSubmit}>
          <Grid item xs={12} sm={12}>
            <TextField
              label="Nueva contraseña"
              id="password"
              name="password"
              type="password"
              value={formik.values.password}
              onChange={(e) => {
                formik.handleChange(e);
                formik.setStatus(null);
              }}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              margin="dense"
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              label="Confirmar contraseña"
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formik.values.confirmPassword}
              onChange={(e) => {
                formik.handleChange(e);
                formik.setStatus(null);
              }}
              onBlur={formik.handleBlur}
              error={
                formik.touched.confirmPassword &&
                Boolean(formik.errors.confirmPassword)
              }
              helperText={
                formik.touched.confirmPassword && formik.errors.confirmPassword
              }
              margin="dense"
            />
          </Grid>
          <Button
            type="submit"
            disabled={formik.isSubmitting}
            sx={{ mt: 1, textTransform: 'uppercase' }}
            color="primary"
            variant="contained"
            fullWidth
          >
            {formik.isSubmitting ? 'Enviando...' : 'Enviar'}
          </Button>
        </Box>
      </Grid>
      <NotificationGreen
        open={notificationGreenOpen}
        message={notificationGreenMessage}
        onClose={() => setNotificationGreenOpen(false)}
      />
      <NotificationRed
        open={notificationRedOpen}
        message={notificationRedMessage}
        onClose={() => setNotificationRedOpen(false)}
      />
    </Container>
  );
}

export default ResetPasswordForm;

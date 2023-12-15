import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import queryString from 'query-string';
import { Box, Typography, TextField, Button } from '@mui/material';
import { apiResetPassword } from '../../api/apiService';
import NotificationGreen from '../../components/ui/NotificationGreen';
import NotificationRed from '../../components/ui/NotificationRed';
import { ROUTE_LOGIN } from '../../routes/routePaths';

function ResetPasswordForm() {
  const [notificationGreenOpen, setNotificationGreenOpen] = useState(false);
  const [notificationGreenMessage, setNotificationGreenMessage] = useState('');
  const [notificationRedOpen, setNotificationRedOpen] = useState(false);
  const [notificationRedMessage, setNotificationRedMessage] = useState('');
  const navigate = useNavigate();
  const { search } = useLocation();
  const { token } = queryString.parse(search);

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
    <Box fullWidth>
      <Typography
        variant="h1"
        sx={{
          textAlign: 'center',
          fontSize: '1.5rem',
          fontWeight: 'bold',
          color: '#000000',
        }}
      >
        Restablecer contraseña
      </Typography>
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        sx={{
          mt: 10,
          width: '100%',
          maxWidth: '2xl',
          display: 'flex',
          flexDirection: 'column',
          gap: 7,
          mx: 'auto',
        }}
      >
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
          fullWidth
          margin="dense"
        />
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
          fullWidth
          margin="dense"
        />
        <Box
          sx={{ display: 'flex', justifyContent: 'end', mx: 3, mb: 5, gap: 4 }}
        >
          <Button
            type="submit"
            disabled={formik.isSubmitting}
            sx={{ px: 5, py: 1.5, textTransform: 'uppercase' }}
            color="primary"
            variant="contained"
          >
            {formik.isSubmitting ? 'Enviando...' : 'Enviar'}
          </Button>
        </Box>
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
      </Box>
    </Box>
  );
}

export default ResetPasswordForm;

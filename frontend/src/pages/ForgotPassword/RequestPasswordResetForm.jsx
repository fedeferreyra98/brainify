import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  CircularProgress,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { apiRequestPasswordReset } from '../../api/apiService';
import NotificationGreen from '../../components/ui/NotificationGreen';
import { ROUTE_LOGIN } from '../../routes/routePaths';

function RequestPasswordReset() {
  const [notificationGreenOpen, setNotificationGreenOpen] = useState(false);
  const [notificationGreenMessage, setNotificationGreenMessage] = useState('');
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Correo electrónico inválido')
        .required('El correo electrónico es obligatorio'),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      try {
        const response = await apiRequestPasswordReset(values.email);
        setNotificationGreenMessage(response.message);
        setNotificationGreenOpen(true);
      } catch (error) {
        setNotificationGreenMessage(
          'Ocurrió un error. Por favor intenta más tarde.'
        );
        setNotificationGreenOpen(true);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" gutterBottom>
          Modificar Contraseña
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            margin="normal"
            fullWidth
            id="email"
            label="Correo Electrónico"
            name="email"
            autoComplete="email"
            autoFocus
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <Typography variant="h7" gutterBottom>
            Por favor ingresa tu correo electronico para modificar la contraseña
          </Typography>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            sx={{ mt: 3, mb: 1 }}
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? <CircularProgress size={24} /> : 'Enviar'}
          </Button>
          <Button
            color="primary"
            variant="contained"
            type="submit"
            fullWidth
            onClick={() => navigate(ROUTE_LOGIN)}
          >
            Volver
          </Button>
        </form>
      </Box>
      <NotificationGreen
        open={notificationGreenOpen}
        message={notificationGreenMessage}
        onClose={() => setNotificationGreenOpen(false)}
      />
    </Container>
  );
}

export default RequestPasswordReset;

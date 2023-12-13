import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Box, Typography } from '@mui/material';
import { apiRequestPasswordReset } from '../../api/apiService';
import NotificationGreen from '../../components/ui/NotificationGreen';

function RequestPasswordReset() {
  const [notificationGreenOpen, setNotificationGreenOpen] = useState(false);
  const [notificationGreenMessage, setNotificationGreenMessage] = useState('');

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
    <Box className="w-full max-w-full flex-start flex-col">
      <Typography variant="h1" sx={{ textAlign: 'left' }}>
        <span className="blue_gradient">Restablecer contraseña</span>
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
        noValidate
      >
        <TextField
          label="Correo Electrónico"
          id="email"
          name="email"
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          fullWidth
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
      </Box>
      <NotificationGreen
        open={notificationGreenOpen}
        message={notificationGreenMessage}
        onClose={() => setNotificationGreenOpen(false)}
      />
    </Box>
  );
}

export default RequestPasswordReset;

import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Container,
  DialogActions,
  DialogContent,
  TextField,
  Button,
  MenuItem,
} from '@mui/material';
import { apiCreateHiring } from '../../api/apiService';

function HiringForm({
  selectedServiceId,
  closeHiringForm,
  setNotificationRedOpen,
  setNotificationRedMessage,
  setNotificationGreenOpen,
  setNotificationGreenMessage,
}) {
  const contactTimes = ['Mañana', 'Tarde', 'Noche'];

  const validationSchema = Yup.object({
    phoneNumber: Yup.string()
      .required('El número de teléfono es requerido')
      .matches(/^[0-9]{10}$/, 'El valor ingresado debe ser solo numerico')
      .max(10, 'El número de teléfono debe ser de 10 dígitos'),
    contactEmail: Yup.string().required('El correo electrónico es requerido'),
    message: Yup.string()
      .required('El mensaje es requerido')
      .max(255, 'El mensaje no puede tener más de 255 caracteres'),
    preferredContactTime: Yup.string().required(
      'El horario de contacto es requerido'
    ),
  });

  const formik = useFormik({
    initialValues: {
      phoneNumber: '',
      contactEmail: '',
      message: '',
      preferredContactTime: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await apiCreateHiring(selectedServiceId, {
          phoneNumber: values.phoneNumber,
          contactEmail: values.contactEmail,
          message: values.message,
          preferredContactTime: values.preferredContactTime,
        });
        setNotificationGreenMessage('La contratación se creó con éxito');
        setNotificationGreenOpen(true);
        closeHiringForm();
      } catch (error) {
        setNotificationRedMessage('Hubo un error al crear la contratación');
        setNotificationRedOpen(true);
      }
    },
  });

  const handleCancel = () => {
    closeHiringForm();
    // Restablecer los valores del formulario a los iniciales
    formik.resetForm({ values: formik.initialValues });
  };

  return (
    <Container>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent
          sx={{
            '& .MuiTextField-root': { mb: 2 }, // Aplica un margen inferior a todos los TextField
          }}
        >
          <TextField
            fullWidth
            id="phoneNumber"
            name="phoneNumber"
            label="Telefono"
            value={formik.values.phoneNumber}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            error={
              formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)
            }
            helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
          />
          <TextField
            fullWidth
            type="email"
            id="contactEmail"
            name="contactEmail"
            label="Correo electrónico"
            value={formik.values.contactEmail}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            error={
              formik.touched.contactEmail && Boolean(formik.errors.contactEmail)
            }
            helperText={
              formik.touched.contactEmail && formik.errors.contactEmail
            }
          />
          <TextField
            fullWidth
            id="message"
            name="message"
            label="Mensaje"
            multiline
            rows={4}
            value={formik.values.message}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            error={formik.touched.message && Boolean(formik.errors.message)}
            helperText={formik.touched.message && formik.errors.message}
          />
          <TextField
            fullWidth
            id="preferredContactTime"
            name="preferredContactTime"
            label="Horario de contacto"
            select
            value={formik.values.preferredContactTime}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            error={
              formik.touched.preferredContactTime &&
              Boolean(formik.errors.preferredContactTime)
            }
            helperText={
              formik.touched.preferredContactTime &&
              formik.errors.preferredContactTime
            }
          >
            {contactTimes.map((contactTime) => (
              <MenuItem key={contactTime} value={contactTime}>
                {contactTime}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            Cancelar
          </Button>
          <Button type="submit" color="primary">
            Contratar
          </Button>
        </DialogActions>
      </form>
    </Container>
  );
}

export default HiringForm;

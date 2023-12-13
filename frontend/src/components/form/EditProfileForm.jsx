import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from '@mui/material';

function EditProfileForm({ isOpen, onClose, handleSubmit, initialFormData }) {
  const validationSchema = Yup.object({
    firstName: Yup.string().required('El nombre es requerido'),
    lastName: Yup.string().required('El apellido es requerido'),
    email: Yup.string().required('El correo electrónico es requerido'),
    phoneNumber: Yup.string().required('El número de teléfono es requerido'),
    degree: Yup.string()
      .required('El título es requerido')
      .max(50, 'El título no puede tener más de 50 caracteres'),
    experience: Yup.string()
      .required('La experiencia es requerida')
      .max(255, 'La experiencia no puede tener más de 255 caracteres'),
  });

  const formik = useFormik({
    initialValues: initialFormData,
    validationSchema,
    onSubmit: handleSubmit,
  });
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Editar Perfil</DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <TextField
            margin="dense"
            fullWidth
            id="firstName"
            name="firstName"
            label="Nombre"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
          />
          <TextField
            margin="dense"
            fullWidth
            id="lastName"
            name="lastName"
            label="Apellido"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
          />
          <TextField
            margin="dense"
            fullWidth
            id="email"
            name="email"
            label="Correo electrónico"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            margin="dense"
            fullWidth
            id="phoneNumber"
            name="phoneNumber"
            label="Número de teléfono"
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)
            }
            helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
          />
          <TextField
            margin="dense"
            fullWidth
            id="degree"
            name="degree"
            label="Título"
            value={formik.values.degree}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.degree && Boolean(formik.errors.degree)}
            helperText={formik.touched.degree && formik.errors.degree}
          />
          <TextField
            margin="dense"
            fullWidth
            id="experience"
            name="experience"
            label="Experiencia"
            value={formik.values.experience}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.experience && Boolean(formik.errors.experience)
            }
            helperText={formik.touched.experience && formik.errors.experience}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancelar
          </Button>
          <Button color="primary" variant="contained" type="submit">
            Guardar
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default EditProfileForm;

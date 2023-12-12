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
      <DialogContent>
        <TextField
          margin="dense"
          label="Nombre"
          type="text"
          fullWidth
          variant="outlined"
          value={formik.values.firstName}
          name="firstName"
          onChange={formik.handleChange}
        />
        <TextField
          margin="dense"
          label="Apellido"
          type="text"
          fullWidth
          variant="outlined"
          value={formik.values.lastName}
          name="lastName"
          onChange={formik.handleChange}
        />
        <TextField
          margin="dense"
          label="Correo Electrónico"
          type="text"
          fullWidth
          variant="outlined"
          value={formik.values.email}
          name="mail"
          onChange={formik.handleChange}
        />
        <TextField
          margin="dense"
          label="Nro Télefono"
          type="text"
          fullWidth
          variant="outlined"
          value={formik.values.phoneNumber}
          name="phoneNumber"
          onChange={formik.handleChange}
        />
        <TextField
          margin="dense"
          label="Título"
          type="text"
          fullWidth
          variant="outlined"
          value={formik.values.degree}
          name="degree"
          onChange={formik.handleChange}
        />
        <TextField
          margin="dense"
          label="Experiencia"
          type="text"
          fullWidth
          variant="outlined"
          multiline
          rows={4}
          value={formik.values.experience}
          name="experience"
          onChange={formik.handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={formik.handleSubmit} color="primary">
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditProfileForm;

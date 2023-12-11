import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from '@mui/material';

function EditProfileForm({ isOpen, onClose, onSave, formData, onInputChange }) {
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
          value={formData.firstName}
          name="firstName"
          onChange={onInputChange}
        />
        <TextField
          margin="dense"
          label="Apellido"
          type="text"
          fullWidth
          variant="outlined"
          value={formData.lastName}
          name="lastName"
          onChange={onInputChange}
        />
        <TextField
          margin="dense"
          label="Correo Electrónico"
          type="text"
          fullWidth
          variant="outlined"
          value={formData.email}
          name="mail"
          onChange={onInputChange}
        />
        <TextField
          margin="dense"
          label="Nro Télefono"
          type="text"
          fullWidth
          variant="outlined"
          value={formData.phoneNumber}
          name="phoneNumber"
          onChange={onInputChange}
        />
        <TextField
          margin="dense"
          label="Título"
          type="text"
          fullWidth
          variant="outlined"
          value={formData.degree}
          name="degree"
          onChange={onInputChange}
        />
        <TextField
          margin="dense"
          label="Experiencia"
          type="text"
          fullWidth
          variant="outlined"
          multiline
          rows={4}
          value={formData.experience}
          name="experience"
          onChange={onInputChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={onSave} color="primary">
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditProfileForm;

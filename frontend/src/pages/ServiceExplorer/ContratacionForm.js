import React, { useState } from 'react';
import {
  Button,
  DialogActions,
  Container,
  DialogContent,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import useStyles from '../../styles/styles';
import { apiCreateHiring } from '../../api/apiService';

function ContratacionForm({
  selectedService,
  closeHiringForm,
  setNotificationRedOpen,
  setNotificationRedMessage,
  setNotificationGreenOpen,
  setNotificationGreenMessage,
}) {
  const classes = useStyles();

  // Estados para los campos del formulario de contratación
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [horario, setHorario] = useState('');
  const [mensaje, setMensaje] = useState('');

  // Create service function
  const createHiring = async () => {
    try {
      await apiCreateHiring(selectedService, {
        phoneNumber: telefono,
        contactEmail: email,
        message: mensaje,
        preferredContactTime: horario,
      });
      setNotificationGreenMessage('Solicitud de contacto enviada');
      setNotificationGreenOpen(true);
    } catch (error) {
      console.log(error);
      setNotificationRedMessage('Error al agregar el servicio');
      setNotificationRedOpen(true);
    }
  };

  // Función para resetear el formulario de contratación
  const resetFormContratacion = () => {
    setTelefono('');
    setEmail('');
    setHorario('');
    setMensaje('');
  };

  // Función para verificar si todos los campos del formulario están completos
  const isFormComplete = () => {
    return telefono && email && horario && mensaje;
  };

  // Función para validar un número de teléfono
  const isValidPhoneNumber = (phoneNumber) => {
    const pattern = /^[0-9]{10}$/; // Asume un número de 10 dígitos
    return pattern.test(phoneNumber);
  };

  // Función para validar un correo electrónico
  const isValidEmail = () => {
    const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return pattern.test(email);
  };

  // Función para validar campos y enviar formulario
  const CheckAndSend = () => {
    if (!isValidPhoneNumber(telefono)) {
      setNotificationRedMessage(
        'Por favor, ingrese un número de teléfono válido'
      );
      setNotificationRedOpen(true);
      return;
    }

    if (!isValidEmail(email)) {
      setNotificationRedMessage(
        'Por favor, ingrese un correo electrónico válido'
      );
      setNotificationRedOpen(true);
      return;
    }

    if (!horario) {
      setNotificationRedMessage('Se debe establecer un horario de contacto');
      setNotificationRedOpen(true);
      return;
    }

    // Si todas las validaciones pasan, se envia el formulario y se muestra notificación de éxito
    createHiring();
    closeHiringForm();
    resetFormContratacion();
  };

  return (
    <Container>
      <DialogContent>
        <TextField
          fullWidth
          margin="normal"
          label="Teléfono"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <FormControl className={classes.formControl} fullWidth>
          <InputLabel>Horario de contacto</InputLabel>
          <Select value={horario} onChange={(e) => setHorario(e.target.value)}>
            <MenuItem value="Mañana">Mañana</MenuItem>
            <MenuItem value="Tarde">Tarde</MenuItem>
          </Select>
        </FormControl>
        <TextField
          fullWidth
          margin="normal"
          label="Mensaje"
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          multiline
          rows={4}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            closeHiringForm();
            resetFormContratacion();
          }}
          color="primary"
        >
          Cancelar
        </Button>
        <Button
          onClick={CheckAndSend}
          color="primary"
          disabled={!isFormComplete()} // Deshabilita el botón si el formulario no está completo
        >
          Enviar
        </Button>
      </DialogActions>
    </Container>
  );
}

export default ContratacionForm;

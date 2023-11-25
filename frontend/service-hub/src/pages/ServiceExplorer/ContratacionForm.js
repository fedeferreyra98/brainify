import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import useStyles from '../../styles/styles';

function ContratacionForm({
  dialogOpen,
  setDialogOpen,
  telefono,
  setTelefono,
  email,
  setEmail,
  horario,
  setHorario,
  mensaje,
  setMensaje,
  CheckTime,
  isFormComplete,
  resetFormContratacion,
}) {
  const classes = useStyles();

  return (
    <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
      <DialogTitle>Contratar Servicio</DialogTitle>
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
          <Select
            value={horario.inicio}
            onChange={(e) => setHorario({ ...horario, inicio: e.target.value })}
          >
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
            setDialogOpen(false);
            resetFormContratacion();
          }}
          color="primary"
        >
          Cancelar
        </Button>
        <Button
          onClick={CheckTime}
          color="primary"
          disabled={!isFormComplete()} // Deshabilita el botón si el formulario no está completo
        >
          Enviar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ContratacionForm;

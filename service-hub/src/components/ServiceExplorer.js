import React, { useState } from 'react';
import {
  Button,
  Container,
  Typography,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Pagination,
} from '@mui/material';
import DynamicSelect from './DynamicSelect';
import mockServices from './mockServices';
import ServiceCard from './ServiceCard';
import ServiceDetails from './ServiceDetails';
import useStyles from '../styles/styles';
import NotificationRed from './NotificationRed';
import NotificationGreen from './NotificationGreen';

function ServiceExplorer() {
  const classes = useStyles();

  // Estados lista de servicios y filtrada
  const [servicios] = useState(mockServices);
  const [serviciosFiltrados, setServiciosFiltrados] = useState(servicios);

  // Estados para los filtros
  const [categoriaFiltro, setCategoriaFiltro] = useState('');
  const [tipoFiltro, setTipoFiltro] = useState('');
  const [frecuenciaFiltro, setFrecuenciaFiltro] = useState('');

  // Estado para controlar el diálogo de contratación
  const [dialogOpen, setDialogOpen] = useState(false);

  // Estados para los campos del formulario de contratación
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [horario, setHorario] = useState({ inicio: '', fin: '' });
  const [mensaje, setMensaje] = useState('');

  const [selectedService, setSelectedService] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const servicesPerPage = 6;
  const totalPages = Math.ceil(serviciosFiltrados.length / servicesPerPage);

  const currentServices = serviciosFiltrados.slice(
    (currentPage - 1) * servicesPerPage,
    currentPage * servicesPerPage
  );

  const handleHire = () => {
    setDialogOpen(true);
  };

  // Estados para controlar las notificaciones
  const [notificationRedOpen, setNotificationRedOpen] = useState(false);
  const [notificationRedMessage, setNotificationRedMessage] = useState('');
  const [notificationGreenOpen, setNotificationGreenOpen] = useState(false);

  // Función para resetear el formulario de contratación
  const resetFormContratacion = () => {
    setTelefono('');
    setEmail('');
    setHorario({ inicio: '', fin: '' });
    setMensaje('');
  };

  // Función para verificar si todos los campos del formulario están completos
  const isFormComplete = () => {
    return telefono && email && horario.inicio && horario.fin && mensaje;
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

  // Generar las opciones de horario en intervalos de 30 minutos
  const generateTimeOptions = () => {
    const options = [];
    for (let i = 0; i < 24; i += 1) {
      for (let j = 0; j < 60; j += 30) {
        const hour = i.toString().padStart(2, '0');
        const minute = j.toString().padStart(2, '0');
        options.push(`${hour}:${minute}hs`);
      }
    }
    return options;
  };

  // Función para validar que la hora de finalización sea mayor que la hora de inicio y otras validaciones
  const CheckTime = () => {
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

    if (horario.fin <= horario.inicio) {
      setNotificationRedMessage(
        'La hora de finalización debe ser mayor que la hora de inicio'
      );
      setNotificationRedOpen(true);
      return;
    }

    // Si todas las validaciones pasan, mostrar notificación de éxito
    setNotificationGreenOpen(true);
    setDialogOpen(false);
    resetFormContratacion();
  };

  // Funcion de filtrado
  const filtrarServicios = () => {
    const filtrados = servicios.filter((servicio) => {
      return (
        (!categoriaFiltro || servicio.categoria === categoriaFiltro) &&
        (!tipoFiltro || servicio.tipo === tipoFiltro) &&
        (!frecuenciaFiltro || servicio.frecuencia === frecuenciaFiltro)
      );
    });
    setServiciosFiltrados(filtrados);
  };

  // Funcion para limpiar filtros
  const limpiarFiltros = () => {
    setCategoriaFiltro('');
    setTipoFiltro('');
    setFrecuenciaFiltro('');
    setServiciosFiltrados(servicios);
  };

  // Renderizar el formulario de contratación
  const renderDialogContratacion = () => (
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
        <Typography variant="h7" gutterBottom>
          Franja horaria de contacto
        </Typography>
        <FormControl className={classes.formControl} fullWidth>
          <InputLabel>Hora de inicio</InputLabel>
          <Select
            value={horario.inicio}
            onChange={(e) => setHorario({ ...horario, inicio: e.target.value })}
          >
            <MenuItem value="Seleccionar">Seleccionar</MenuItem>
            {generateTimeOptions().map((time) => (
              <MenuItem key={time} value={time}>
                {time}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl className={classes.formControl} fullWidth>
          <InputLabel>Hora de finalización</InputLabel>
          <Select
            value={horario.fin}
            onChange={(e) => setHorario({ ...horario, fin: e.target.value })}
          >
            <MenuItem value="Seleccionar">Seleccionar</MenuItem>
            {generateTimeOptions().map((time) => (
              <MenuItem key={time} value={time}>
                {time}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          fullWidth
          margin="normal"
          label="Mensaje al proveedor"
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

  return (
    <div>
      <Container className={classes.root}>
        <Typography variant="h4" gutterBottom>
          Explorar Servicios
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <DynamicSelect
              label="Categoría"
              value={categoriaFiltro}
              onChange={(e) => setCategoriaFiltro(e.target.value)}
              className={classes.formControl}
              options={[
                { value: 'tutorias', label: 'Tutorías escolares' },
                { value: 'idioma', label: 'Clases de idioma' },
              ]}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <DynamicSelect
              label="Tipo de clase"
              value={tipoFiltro}
              onChange={(e) => setTipoFiltro(e.target.value)}
              className={classes.formControl}
              options={[
                { value: 'individual', label: 'Individual' },
                { value: 'grupal', label: 'Grupal' },
              ]}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <DynamicSelect
              label="Frecuencia"
              value={frecuenciaFiltro}
              onChange={(e) => setFrecuenciaFiltro(e.target.value)}
              className={classes.formControl}
              options={[
                { value: 'única', label: 'Única' },
                { value: 'semanal', label: 'Semanal' },
                { value: 'mensual', label: 'Mensual' },
              ]}
            />
          </Grid>
        </Grid>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={filtrarServicios}
        >
          Filtrar
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          className={classes.button}
          onClick={limpiarFiltros}
        >
          Limpiar Filtros
        </Button>
        <Grid container spacing={3}>
          {currentServices.map((servicio) => (
            <ServiceCard
              key={servicio.id}
              service={servicio}
              onClick={setSelectedService}
              onHire={handleHire}
            />
          ))}
        </Grid>

        <div className={classes.pagination}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(event, value) => setCurrentPage(value)}
          />
        </div>

        <ServiceDetails
          service={selectedService}
          onClose={() => setSelectedService(null)}
          onHire={handleHire}
        />
      </Container>
      {renderDialogContratacion()}
      <NotificationRed
        open={notificationRedOpen}
        message={notificationRedMessage}
        onClose={() => setNotificationRedOpen(false)}
      />
      <NotificationGreen
        open={notificationGreenOpen}
        message="Solicitud de contacto enviada"
        onClose={() => setNotificationGreenOpen(false)}
      />
    </div>
  );
}

export default ServiceExplorer;

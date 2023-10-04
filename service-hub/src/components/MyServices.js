import React, { useState } from 'react';
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  button: {
    margin: theme.spacing(1),
  },
  list: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  title: {
    flexGrow: 1,
  },
  mainContent: {
    padding: theme.spacing(5),
    textAlign: 'center',
  },
  footer: {
    marginTop: theme.spacing(5),
    padding: theme.spacing(3),
    backgroundColor: '#f5f5f5',
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
}));

function MyServices() {
  const classes = useStyles();

  // Estado para los servicios
  const [services, setServices] = useState([]);
  const [currentService, setCurrentService] = useState(null); // Servicio actual para edición
  const [dialogOpen, setDialogOpen] = useState(false); // Controlar el diálogo de edición/creación

  // Estados para los campos del formulario
  const [serviceName, setServiceName] = useState('');
  const [serviceCategory, setServiceCategory] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [duration, setDuration] = useState('');
  const [frequency, setFrequency] = useState('');
  const [cost, setCost] = useState('');

  // Estado para el mensaje de error
  const [errorMessage, setErrorMessage] = useState('');

  // Funciones para gestionar los servicios
  const addService = (service) => {
    setServices([...services, service]);
    setDialogOpen(false);
  };

  const updateService = (updatedService) => {
    setServices(
      services.map((service) =>
        service.id === currentService.id ? updatedService : service
      )
    );
    setDialogOpen(false);
    setCurrentService(null);
  };

  const deleteService = (id) => {
    setServices(services.filter((service) => service.id !== id));
  };

  // Función para resetear el formulario
  const resetForm = () => {
    setServiceName('');
    setServiceType('');
    setServiceCategory('');
    setDuration('');
    setFrequency('');
    setCost('');
    setErrorMessage(''); // También reseteamos el mensaje de error
  };

  const handleSave = () => {
    if (
      !serviceName ||
      !serviceType ||
      !serviceCategory ||
      !duration ||
      !frequency ||
      !cost
    ) {
      setErrorMessage('Por favor, completa todos los campos del formulario.');
      return;
    }

    const newService = {
      id: Date.now(), // Un simple generador de ID basado en la fecha actual. Puede ser reemplazado por cualquier otro método.
      name: serviceName,
      type: serviceType,
      duration,
      frequency,
      cost,
    };

    // Si todos los campos están completos, procedemos a guardar el servicio
    if (currentService) {
      updateService(newService);
    } else {
      addService(newService);
    }
    resetForm();
    setDialogOpen(false);
  };

  // Renderizar el formulario de edición/creación
  const renderDialog = () => (
    <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
      <DialogTitle>
        {currentService ? 'Modificar Servicio' : 'Agregar Servicio'}
      </DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          margin="normal"
          label="Nombre"
          value={serviceName}
          onChange={(e) => setServiceName(e.target.value)}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Duración (En Semanas)"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Costo"
          value={cost}
          onChange={(e) => setCost(e.target.value)}
        />
        <FormControl className={classes.formControl} fullWidth>
          <InputLabel>Categoría</InputLabel>
          <Select
            value={serviceCategory}
            onChange={(e) => setServiceCategory(e.target.value)}
          >
            <MenuItem value="tutorias">Tutorías escolares</MenuItem>
            <MenuItem value="idioma">Clases de idioma</MenuItem>
          </Select>
        </FormControl>
        <FormControl className={classes.formControl} fullWidth>
          <InputLabel>Tipo de clase</InputLabel>
          <Select
            value={serviceType}
            onChange={(e) => setServiceType(e.target.value)}
          >
            <MenuItem value="individual">Individual</MenuItem>
            <MenuItem value="grupal">Grupal</MenuItem>
          </Select>
        </FormControl>
        <FormControl className={classes.formControl} fullWidth>
          <InputLabel>Frecuencia</InputLabel>
          <Select
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
          >
            <MenuItem value="única">Única</MenuItem>
            <MenuItem value="semanal">Semanal</MenuItem>
            <MenuItem value="mensual">Mensual</MenuItem>
          </Select>
        </FormControl>
        {errorMessage && <Typography color="error">{errorMessage}</Typography>}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            setDialogOpen(false);
            resetForm();
          }}
          color="primary"
        >
          Cancelar
        </Button>
        <Button onClick={handleSave} color="primary">
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <div>
      <Container className={classes.root}>
        <Typography variant="h4" gutterBottom>
          Mis Servicios
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => setDialogOpen(true)}
        >
          Agregar Servicio
        </Button>
        <List className={classes.list}>
          {services.map((service) => (
            <ListItem key={service.id}>
              <ListItemText
                primary={service.name}
                secondary={`Duración: ${service.duration} — Costo: ${service.cost}`}
              />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="edit"
                  onClick={() => {
                    setCurrentService(service);
                    setDialogOpen(true);
                  }}
                  size="large"
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => deleteService(service.id)}
                  size="large"
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
        {renderDialog()}
      </Container>
    </div>
  );
}

export default MyServices;

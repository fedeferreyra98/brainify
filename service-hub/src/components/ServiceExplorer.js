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
  Card,
  CardContent,
  CardActions,
  Rating,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  List,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CategoryIcon from '@mui/icons-material/Category';
import ScheduleIcon from '@mui/icons-material/Schedule';
import TimerIcon from '@mui/icons-material/Timer';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ClassIcon from '@mui/icons-material/Class';
import makeStyles from '@mui/styles/makeStyles';
import DynamicSelect from './DynamicSelect';
import mockServices from './mockServices';
import mockComments from './mockComments';

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
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  menuButton: {
    marginRight: theme.spacing(2),
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
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(3),
  },
  commentCard: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

function ServiceCard({ service, onClick, onHire }) {
  // Calculate average rating for the service
  const serviceComments = mockComments.filter(
    (comment) => comment.serviceName === service.nombre
  );
  const averageRating =
    serviceComments.reduce((acc, comment) => acc + comment.rating, 0) /
    serviceComments.length;

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card>
        <CardContent>
          <Typography variant="h6">{service.nombre}</Typography>
          <Typography color="textSecondary">{service.proveedor}</Typography>
          <Rating value={averageRating} readOnly precision={0.5} />
        </CardContent>
        <CardActions>
          <Button size="small" color="primary" onClick={() => onClick(service)}>
            Ver más
          </Button>
          <Button size="small" color="secondary" onClick={onHire}>
            Contratar
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}

function ServiceDetails({ service, onClose, onHire }) {
  const classes = useStyles();

  // Filter comments for the selected service
  const serviceComments = mockComments.filter(
    (comment) => comment.serviceName === service?.nombre
  );

  return (
    <Dialog open={!!service} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>{service?.nombre}</DialogTitle>
      <DialogContent>
        <List>
          <ListItem>
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Proveedor" secondary={service?.proveedor} />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem>
            <ListItemIcon>
              <CategoryIcon />
            </ListItemIcon>
            <ListItemText primary="Categoría" secondary={service?.categoria} />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem>
            <ListItemIcon>
              <ClassIcon />
            </ListItemIcon>
            <ListItemText primary="Tipo" secondary={service?.tipo} />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem>
            <ListItemIcon>
              <ScheduleIcon />
            </ListItemIcon>
            <ListItemText
              primary="Frecuencia"
              secondary={service?.frecuencia}
            />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem>
            <ListItemIcon>
              <TimerIcon />
            </ListItemIcon>
            <ListItemText primary="Duración" secondary={service?.duracion} />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem>
            <ListItemIcon>
              <AttachMoneyIcon />
            </ListItemIcon>
            <ListItemText primary="Costo" secondary={service?.costo} />
          </ListItem>
        </List>

        <Divider className={classes.commentCard} />

        {/* Display user comments and their ratings */}
        {serviceComments.map((comment) => (
          <Card key={comment.id} className={classes.commentCard}>
            <CardContent>
              <Typography variant="h6">{comment.user}</Typography>
              <Rating value={comment.rating} readOnly />
              <Typography variant="body1">{comment.comment}</Typography>
              <Typography variant="body2">
                {comment.secondaryComment}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cerrar
        </Button>
        <Button onClick={onHire} color="secondary">
          Contratar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

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

  // Generar las opciones de horario en intervalos de 30 minutos
  const generateTimeOptions = () => {
    const options = [];
    for (let i = 0; i < 24; i += 1) {
      for (let j = 1; j < 60; j += 30) {
        const hour = i.toString().padStart(2, '0');
        const minute = j.toString().padStart(2, '0');
        options.push(`${hour}:${minute}hs`);
      }
    }
    return options;
  };

  // Función para validar que la hora de finalización sea mayor que la hora de inicio
  const CheckTime = () => {
    if (horario.fin <= horario.inicio) {
      alert('La hora de finalización debe ser mayor que la hora de inicio.');
      resetFormContratacion(); // Restablecer el formulario
      setDialogOpen(false); // Cerrar el diálogo
      setDialogOpen(true); // Abrir el diálogo
    } else {
      setDialogOpen(false);
      resetFormContratacion();
    }
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
    </div>
  );
}

export default ServiceExplorer;

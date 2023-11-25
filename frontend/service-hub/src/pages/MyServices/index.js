import React, { useState } from 'react';
import {
  Container,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Pagination,
  Avatar,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AddIcon from '@mui/icons-material/Add';
import mockServices from '../../data/mockServices';
import NotificationGreen from '../../components/ui/NotificationGreen';
import ServiceCard from './ServiceCard';
import ServiceComments from './ServiceComments';
import mockComments from '../../data/mockComments';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3),
    backgroundColor: '#DDEBF8',
  },
  mainContent: {
    padding: theme.spacing(5),
    textAlign: 'left',
    backgroundColor: '#DDEBF8',
  },
  button: {
    margin: theme.spacing(1),
  },
  card: {
    margin: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    width: '100%',
  },
  paginationContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(2),
  },
  footer: {
    marginTop: theme.spacing(5),
    padding: theme.spacing(3),
    backgroundColor: '#f5f5f5',
  },
}));

function MyServices() {
  const classes = useStyles();
  const [services, setServices] = useState(mockServices);
  const [currentService, setCurrentService] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    categoria: '',
    tipo: '',
    duracion: '',
    frecuencia: '',
    costo: '',
  });
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Estados para la paginación
  const [currentPage, setCurrentPage] = useState(1);
  const servicesPerPage = 9;
  const totalPages = Math.ceil(services.length / servicesPerPage);

  const currentServices = services.slice(
    (currentPage - 1) * servicesPerPage,
    currentPage * servicesPerPage
  );

  const [commentsDialogOpen, setCommentsDialogOpen] = useState(false);
  const [currentServiceComments, setCurrentServiceComments] = useState([]);
  const [currentServiceName, setCurrentServiceName] = useState('');

  // Function to handle viewing comments
  const handleViewComments = (serviceName) => {
    const serviceComments = mockComments.filter(
      (comment) => comment.serviceName === serviceName
    );
    setCurrentServiceComments(serviceComments);
    setCurrentServiceName(serviceName);
    setCommentsDialogOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Function to delete a comment
  const handleDeleteComment = (commentId) => {
    setCurrentServiceComments((currentComments) =>
      currentComments.filter((comment) => comment.id !== commentId)
    );
  };

  const handleSave = () => {
    if (Object.values(formData).some((value) => !value)) {
      setErrorMessage('Por favor, completa todos los campos del formulario.');
      return;
    }

    const newService = {
      id: currentService ? currentService.id : Date.now(),
      ...formData,
    };
    if (currentService) {
      setServices((prevServices) =>
        prevServices.map((service) =>
          service.id === currentService.id ? newService : service
        )
      );
      setNotificationMessage('Información actualizada correctamente');
    } else {
      setServices((prevServices) => [...prevServices, newService]);
      setNotificationMessage('Servicio agregado correctamente');
    }

    setCurrentService(null);
    setNotificationOpen(true);
    setFormData({
      nombre: '',
      categoria: '',
      tipo: '',
      duracion: '',
      frecuencia: '',
      costo: '',
    });
    setDialogOpen(false);
  };

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

  return (
    <div>
      <Container className={classes.mainContent}>
        <Container className={classes.root}>
          <Typography variant="h4" gutterBottom>
            Mis Servicios
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => {
              setCurrentService(null);
              setFormData({
                nombre: '',
                categoria: '',
                tipo: '',
                duracion: '',
                frecuencia: '',
                costo: '',
              });
              setDialogOpen(true);
            }}
          >
            Nuevo Servicio
          </Button>
          <Grid container spacing={3}>
            {currentServices.map((service) => (
              <Grid item xs={12} sm={6} md={4} key={service.id}>
                <ServiceCard
                  service={service}
                  onEdit={() => {
                    setCurrentService(service);
                    setFormData({
                      nombre: service.nombre,
                      categoria: service.categoria,
                      tipo: service.tipo,
                      duracion: service.duracion,
                      frecuencia: service.frecuencia,
                      costo: service.costo,
                    });
                    setDialogOpen(true);
                  }}
                  onDelete={() => {
                    setServices((prevServices) =>
                      prevServices.filter((s) => s.id !== service.id)
                    );
                    setNotificationMessage('Servicio eliminado correctamente');
                    setNotificationOpen(true);
                  }}
                  onViewComments={handleViewComments}
                  classes={classes}
                />
              </Grid>
            ))}
          </Grid>
          <div className={classes.paginationContainer}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={(event, value) => setCurrentPage(value)}
            />
          </div>

          <footer className={classes.footer}>
            <Typography variant="h6" align="center" gutterBottom>
              Brainify
            </Typography>
            <Typography
              variant="subtitle1"
              align="center"
              color="textSecondary"
            >
              Contacto: info@brainify.com
            </Typography>
          </footer>

          <Dialog
            open={dialogOpen}
            onClose={() => {
              setCurrentService(null);
              setDialogOpen(false);
            }}
          >
            <DialogTitle>
              {currentService ? 'Modificar Servicio' : 'Agregar Servicio'}
            </DialogTitle>
            <DialogContent>
              <Grid item xs={12} sm={4} md={3}>
                <Grid
                  container
                  spacing={2}
                  direction="column"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Grid item xs={12}>
                    <Avatar
                      alt="Class"
                      src="https://masqueclases.es/wp-content/uploads/2021/08/Global-Online-Education.jpg"
                      sx={{ width: 200, height: 200 }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Button
                      component="label"
                      variant="contained"
                      startIcon={<CloudUploadIcon />}
                    >
                      Subir Foto
                      <VisuallyHiddenInput type="file" />
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <TextField
                fullWidth
                margin="normal"
                label="Nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
              />
              <FormControl className={classes.formControl}>
                <InputLabel>Categoría</InputLabel>
                <Select
                  name="categoria"
                  value={formData.categoria}
                  onChange={handleInputChange}
                >
                  <MenuItem value="tutorias">Tutorías escolares</MenuItem>
                  <MenuItem value="idioma">Clases de idioma</MenuItem>
                </Select>
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel>Tipo de clase</InputLabel>
                <Select
                  name="tipo"
                  value={formData.tipo}
                  onChange={handleInputChange}
                >
                  <MenuItem value="individual">Individual</MenuItem>
                  <MenuItem value="grupal">Grupal</MenuItem>
                </Select>
              </FormControl>
              <TextField
                fullWidth
                margin="normal"
                label="Duración (Minutos)"
                name="duracion"
                value={formData.duracion}
                onChange={handleInputChange}
              />
              <FormControl className={classes.formControl}>
                <InputLabel>Frecuencia</InputLabel>
                <Select
                  name="frecuencia"
                  value={formData.frecuencia}
                  onChange={handleInputChange}
                >
                  <MenuItem value="única">Única</MenuItem>
                  <MenuItem value="semanal">Semanal</MenuItem>
                  <MenuItem value="mensual">Mensual</MenuItem>
                </Select>
              </FormControl>
              <TextField
                fullWidth
                margin="normal"
                label="Costo"
                name="costo"
                value={formData.costo}
                onChange={handleInputChange}
              />
              {errorMessage && (
                <Typography color="error">{errorMessage}</Typography>
              )}
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => {
                  setDialogOpen(false);
                  setCurrentService(null);
                  setErrorMessage('');
                }}
                color="primary"
              >
                Cancelar
              </Button>
              <Button
                onClick={handleSave}
                color="primary"
                disabled={formData.duracion < 1 || formData.costo < 0}
              >
                Guardar
              </Button>
            </DialogActions>
          </Dialog>
          <NotificationGreen
            open={notificationOpen}
            message={notificationMessage}
            onClose={() => {
              setCurrentService(null);
              setNotificationOpen(false);
            }}
          />
        </Container>
      </Container>
      <ServiceComments
        open={commentsDialogOpen}
        serviceName={currentServiceName}
        comments={currentServiceComments}
        onDelete={handleDeleteComment}
        onClose={() => setCommentsDialogOpen(false)}
      />
    </div>
  );
}
export default MyServices;

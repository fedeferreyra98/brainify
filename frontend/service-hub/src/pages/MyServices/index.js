import React, { useEffect, useState } from 'react';
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
  Slider,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AddIcon from '@mui/icons-material/Add';
import NotificationGreen from '../../components/ui/NotificationGreen';
import ServiceCard from './ServiceCard';
import ServiceComments from './ServiceComments';
import mockComments from '../../data/mockComments';
import {
  apiCreateService,
  apiGetServicesByUser,
  apiDeleteService,
} from '../../api/apiService';
import { categories } from '../../data/mockCategory';

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
  const [services, setServices] = useState([]);
  const [currentService, setCurrentService] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    type: '',
    duration: 0.0,
    frequency: '',
    cost: 0,
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

  // Fetch services from API
  useEffect(() => {
    const fetchMyServices = async () => {
      try {
        const myServicesData = await apiGetServicesByUser();
        setServices(myServicesData);
      } catch (error) {
        console.log('Error while fetching my services:', error);
      }
    };
    fetchMyServices();
  }, []);

  // Create service function
  const createService = async (values) => {
    try {
      const newService = await apiCreateService(values);
      console.log(newService);
      setServices((prevServices) => [...prevServices, newService]);
      setNotificationMessage('Servicio agregado correctamente');
      setDialogOpen(false);
      setNotificationOpen(true);
    } catch (error) {
      console.log(error);
      setErrorMessage('Error al agregar el servicio');
    }
  };

  // Delete a service
  const deleteService = async (serviceId) => {
    try {
      await apiDeleteService(serviceId);
      setServices((prevServices) =>
        prevServices.filter((service) => service.id !== serviceId)
      );
      setNotificationMessage('Servicio eliminado correctamente');
      setNotificationMessage(serviceId);
      setNotificationOpen(true);
    } catch (error) {
      console.log(error);
      setErrorMessage('Error al eliminar el servicio');
    }
  };

  // Function to handle viewing comments
  const handleViewComments = (serviceName) => {
    const serviceComments = mockComments.filter(
      (comment) => comment.serviceName === serviceName
    );
    setCurrentServiceComments(serviceComments);
    setCurrentServiceName(serviceName);
    setCommentsDialogOpen(true);
  };

  // Function to handle changes on form inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSliderChange = (event, newValue) => {
    setFormData({ ...formData, duration: newValue });
  };

  // Function to delete a comment
  const handleDeleteComment = (commentId) => {
    setCurrentServiceComments((currentComments) =>
      currentComments.filter((comment) => comment.id !== commentId)
    );
  };

  // Guardar servicio
  const handleSave = () => {
    if (Object.values(formData).some((value) => !value)) {
      setErrorMessage('Por favor, completa todos los campos del formulario.');
      return;
    }
    createService(formData);
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
                name: '',
                description: '',
                category: '',
                type: '',
                duration: 0.0,
                frequency: '',
                cost: 0,
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
                      name: service.name,
                      description: service.description,
                      category: service.category,
                      type: service.type,
                      duration: service.duration,
                      frequency: service.frequency,
                      cost: service.cost,
                    });
                    setDialogOpen(true);
                  }}
                  // eslint-disable-next-line no-underscore-dangle
                  onDelete={() => deleteService(service._id)}
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
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Descripción"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
              />
              <FormControl className={classes.formControl}>
                <InputLabel>Categoría</InputLabel>
                <Select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                >
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel>Tipo de clase</InputLabel>
                <Select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                >
                  <MenuItem value="Individual">Individual</MenuItem>
                  <MenuItem value="Group">Grupal</MenuItem>
                </Select>
              </FormControl>
              <Typography id="discrete-slider" gutterBottom>
                Duración (horas)
              </Typography>
              <Slider
                name="duration"
                fullWidth
                value={formData.duration}
                onChange={handleSliderChange}
                aria-labelledby="discrete-slider"
                valueLabelDisplay="auto"
                step={0.5}
                marks
                min={0}
                max={4} // Puedes ajustar el máximo según tus necesidades
              />
              <FormControl className={classes.formControl}>
                <InputLabel>Frecuencia</InputLabel>
                <Select
                  name="frequency"
                  value={formData.frequency}
                  onChange={handleInputChange}
                >
                  <MenuItem value="One-time">Única</MenuItem>
                  <MenuItem value="Weekly">Semanal</MenuItem>
                  <MenuItem value="Monthly">Mensual</MenuItem>
                </Select>
              </FormControl>
              <TextField
                fullWidth
                margin="normal"
                label="Precio"
                name="cost"
                value={formData.cost}
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
                disabled={formData.duration < 1 || formData.cost < 0}
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

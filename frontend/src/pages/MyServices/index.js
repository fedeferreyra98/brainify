import React, { useEffect, useState } from 'react';
import { Container, Typography, Button, Grid, Pagination } from '@mui/material';
import { makeStyles } from '@mui/styles';
import AddIcon from '@mui/icons-material/Add';
import NotificationGreen from '../../components/ui/NotificationGreen';
import ServiceCard from './ServiceCard';
import {
  apiCreateService,
  apiGetServicesByUser,
  apiDeleteService,
} from '../../api/apiService';
import ServiceDialog from './ServiceDialog';

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

  // Estados para la paginación
  const [currentPage, setCurrentPage] = useState(1);
  const servicesPerPage = 9;
  const totalPages = Math.ceil(services.length / servicesPerPage);

  const currentServices = services.slice(
    (currentPage - 1) * servicesPerPage,
    currentPage * servicesPerPage
  );

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
  }, [notificationOpen]);

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
      setNotificationMessage('Error al agregar el servicio');
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
      setNotificationOpen(true);
    } catch (error) {
      console.log(error);
      setNotificationMessage('Error al eliminar el servicio');
    }
  };

  // Guardar servicio
  const handleSave = () => {
    if (Object.values(formData).some((value) => !value)) {
      setNotificationMessage(
        'Por favor, completa todos los campos del formulario.'
      );
      return;
    }
    createService(formData);
  };

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
              // eslint-disable-next-line no-underscore-dangle
              <Grid item xs={12} sm={6} md={4} key={service._id}>
                <ServiceCard
                  service={service}
                  onEdit={() => {
                    setCurrentService(service);
                    setDialogOpen(true);
                  }}
                  // eslint-disable-next-line no-underscore-dangle
                  onDelete={() => deleteService(service._id)}
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

          {dialogOpen && (
            <ServiceDialog
              open={dialogOpen}
              onSave={handleSave}
              service={currentService}
              classes={classes}
              setNotificationMessage={setNotificationMessage}
              setNotificationOpen={setNotificationOpen}
              onClose={() => {
                setCurrentService(null);
                setDialogOpen(false);
              }}
            />
          )}

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
    </div>
  );
}
export default MyServices;

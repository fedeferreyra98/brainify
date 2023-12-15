import React, { useEffect, useState } from 'react';
import { Button, Container, Typography, Grid, Pagination } from '@mui/material';
import DynamicSelect from '../../components/form/DynamicSelect';
// eslint-disable-next-line import/no-named-as-default
import ServiceCard from './ServiceCard';
import ServiceDetails from './ServiceDetails';
import useStyles from '../../styles/styles';
import { apiGetServices } from '../../api/apiService';
import NotificationGreen from '../../components/ui/NotificationGreen';
import NotificationRed from '../../components/ui/NotificationRed';

function ServiceExplorer() {
  const classes = useStyles();

  // Estados lista de servicios y filtrada
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);

  // Estados para los filtros
  const [categoriaFiltro, setCategoriaFiltro] = useState('');
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [tipoFiltro, setTipoFiltro] = useState('');
  const [frecuenciaFiltro, setFrecuenciaFiltro] = useState('');

  const [notificationRedOpen, setNotificationRedOpen] = useState(false);
  const [notificationRedMessage, setNotificationRedMessage] = useState('');
  const [notificationGreenOpen, setNotificationGreenOpen] = useState(false);
  const [notificationGreenMessage, setNotificationGreenMessage] = useState('');

  const [selectedService, setSelectedService] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const [newComment, setNewComment] = useState(false);

  const servicesPerPage = 6;
  const totalPages = Math.ceil(filteredServices.length / servicesPerPage);

  const currentServices = filteredServices.slice(
    (currentPage - 1) * servicesPerPage,
    currentPage * servicesPerPage
  );

  // Obtener servicios de la API
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await apiGetServices();
        const publishedServices = response.filter(
          (service) => service.isPublished
        );
        setServices(publishedServices);
        setFilteredServices(publishedServices); // En principio, todos los servicios están filtrados
      } catch (error) {
        console.log('Error getting services:', error);
      }
    };
    fetchServices();
  }, [newComment]);

  // Obtener categorías de los servicios
  useEffect(() => {
    const uniqueCategories = Array.from(
      new Set(services.map((service) => service.category))
    );
    const formattedOptions = uniqueCategories.map((category) => ({
      value: category,
      label: category.charAt(0).toUpperCase() + category.slice(1),
    }));
    setCategoryOptions(formattedOptions);
  }, [services]);

  // Funcion de filtrado
  const filtrarServicios = () => {
    const filtrados = services.filter((servicio) => {
      return (
        (!categoriaFiltro || servicio.category === categoriaFiltro) &&
        (!tipoFiltro || servicio.type === tipoFiltro) &&
        (!frecuenciaFiltro || servicio.frequency === frecuenciaFiltro)
      );
    });
    setFilteredServices(filtrados);
  };

  // Funcion para limpiar filtros
  const limpiarFiltros = () => {
    setCategoriaFiltro('');
    setTipoFiltro('');
    setFrecuenciaFiltro('');
    setFilteredServices(services);
  };

  return (
    <div>
      <Container className={classes.mainContent}>
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
                options={categoryOptions}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <DynamicSelect
                label="Tipo de clase"
                value={tipoFiltro}
                onChange={(e) => setTipoFiltro(e.target.value)}
                className={classes.formControl}
                options={[
                  { value: 'Individual', label: 'Individual' },
                  { value: 'Grupal', label: 'Grupal' },
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
                  { value: 'One-time', label: 'Única' },
                  { value: 'Weekly', label: 'Semanal' },
                  { value: 'Monthly', label: 'Mensual' },
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
                // eslint-disable-next-line no-underscore-dangle
                key={servicio._id}
                service={servicio}
                onClick={setSelectedService}
                validation={newComment}
                send={setNewComment}
                setNotificationRedOpen={setNotificationRedOpen}
                setNotificationRedMessage={setNotificationRedMessage}
                setNotificationGreenOpen={setNotificationGreenOpen}
                setNotificationGreenMessage={setNotificationGreenMessage}
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
          />
        </Container>
        <footer className={classes.footer}>
          <Typography variant="h6" align="center" gutterBottom>
            Brainify
          </Typography>
          <Typography variant="subtitle1" align="center" color="textSecondary">
            Contacto: info@brainify.com
          </Typography>
        </footer>
      </Container>
      <NotificationRed
        open={notificationRedOpen}
        message={notificationRedMessage}
        onClose={() => setNotificationRedOpen(false)}
      />
      <NotificationGreen
        open={notificationGreenOpen}
        message={notificationGreenMessage}
        onClose={() => setNotificationGreenOpen(false)}
      />
    </div>
  );
}

export default ServiceExplorer;

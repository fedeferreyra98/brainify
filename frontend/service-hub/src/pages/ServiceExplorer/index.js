import React, { useEffect, useState } from 'react';
import { Button, Container, Typography, Grid, Pagination } from '@mui/material';
import DynamicSelect from '../../components/form/DynamicSelect';
import ServiceCard from './ServiceCard';
import ServiceDetails from './ServiceDetails';
import useStyles from '../../styles/styles';
import NotificationRed from '../../components/ui/NotificationRed';
import NotificationGreen from '../../components/ui/NotificationGreen';
import ContratacionForm from './ContratacionForm';
import { apiGetServices, apiCreateHiring } from '../../api/apiService';

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

  // Estado para controlar el diálogo de contratación
  const [dialogOpen, setDialogOpen] = useState(false);

  // Estados para los campos del formulario de contratación
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [horario, setHorario] = useState('');
  const [mensaje, setMensaje] = useState('');

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

  const handleHire = () => {
    setDialogOpen(true);
  };

  // Estados para controlar las notificaciones
  const [notificationRedOpen, setNotificationRedOpen] = useState(false);
  const [notificationRedMessage, setNotificationRedMessage] = useState('');
  const [notificationGreenOpen, setNotificationGreenOpen] = useState(false);
  const [notificationGreenMessage, setNotificationGreenMessage] = useState('');

  // Create service function
  const createHiring = async () => {
    try {
      console.log(selectedService);
      const hiring = await apiCreateHiring('656a3e2a219b307f6768fffd', {
        phoneNumber: telefono,
        contactEmail: email,
        message: mensaje,
        preferredContactTime: horario,
      });
      console.log(hiring);
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
    return telefono && email && horario;
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
    setDialogOpen(false);
    resetFormContratacion();
  };

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
                  { value: 'Group Session', label: 'Grupal' },
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
                onHire={handleHire}
                validation={newComment}
                send={setNewComment}
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
        <footer className={classes.footer}>
          <Typography variant="h6" align="center" gutterBottom>
            Brainify
          </Typography>
          <Typography variant="subtitle1" align="center" color="textSecondary">
            Contacto: info@brainify.com
          </Typography>
        </footer>
      </Container>
      <ContratacionForm
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        telefono={telefono}
        setTelefono={setTelefono}
        email={email}
        setEmail={setEmail}
        horario={horario}
        setHorario={setHorario}
        mensaje={mensaje}
        setMensaje={setMensaje}
        CheckAndSend={CheckAndSend}
        isFormComplete={isFormComplete}
        resetFormContratacion={resetFormContratacion}
      />
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

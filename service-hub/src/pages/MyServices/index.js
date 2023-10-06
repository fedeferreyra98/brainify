import React, { useState } from 'react';
import { Container, Typography, Button, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import useStyles from './styles';
import ServiceCard from './ServiceCard';
import ServiceDialog from './ServiceDialog';
import ServicePagination from './ServicePagination';
import mockServices from '../../data/mockServices';
import NotificationGreen from '../../components/ui/NotificationGreen';

function MyServices() {
  const classes = useStyles();

  const [services, setServices] = useState(mockServices);
  const [currentService, setCurrentService] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const servicesPerPage = 9;
  const totalPages = Math.ceil(services.length / servicesPerPage);
  const currentServices = services.slice(
    (currentPage - 1) * servicesPerPage,
    currentPage * servicesPerPage
  );

  const handleEdit = (service) => {
    setCurrentService(service);
    setDialogOpen(true);
  };

  const handleDelete = (serviceId) => {
    setServices((prevServices) =>
      prevServices.filter((s) => s.id !== serviceId)
    );
    setNotificationMessage('Servicio eliminado correctamente');
    setNotificationOpen(true);
  };

  const handleSave = (formData) => {
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
  };

  return (
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
          setDialogOpen(true);
        }}
      >
        Agregar Servicio
      </Button>

      <Grid container spacing={3}>
        {currentServices.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            onEdit={handleEdit}
            onDelete={handleDelete}
            classes={classes}
          />
        ))}
      </Grid>

      <ServicePagination
        count={totalPages}
        page={currentPage}
        onChange={(event, value) => setCurrentPage(value)}
        classes={classes}
      />

      <ServiceDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        service={currentService}
        onSave={handleSave}
        classes={classes}
      />

      <NotificationGreen
        open={notificationOpen}
        message={notificationMessage}
        onClose={() => setNotificationOpen(false)}
      />
    </Container>
  );
}

export default MyServices;

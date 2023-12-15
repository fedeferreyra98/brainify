/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Grid,
  Button,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { apiUpdateService } from '../../api/apiService';
import ServiceForm from '../../components/form/ServiceForm';

function ServiceCardEditable({
  service,
  onDelete,
  classes,
  setNotificationMessage,
  setNotificationOpen,
}) {
  const [formData, setFormData] = useState({
    name: service.name,
    category: service.category,
    description: service.description,
    type: service.type,
    duration: service.duration,
    frequency: service.frequency,
    cost: service.cost,
    isPublished: service.isPublished,
    imageUrl:
      service.imageUrl ||
      'https://res.cloudinary.com/dcmqhvqqw/image/upload/v1702615757/vqtp0oyfqdyw4nw3z5c1.jpg', // Imagen por defecto, quitar una vez que todos los servicios tengan una imagen
  });
  const [dialogOpen, setDialogOpen] = useState(false);

  // Edit a service
  const handleEditService = async (values, actions) => {
    try {
      // eslint-disable-next-line no-underscore-dangle
      await apiUpdateService(service._id, values);
      setNotificationMessage('Servicio editado correctamente');
      setNotificationOpen(true);
      setDialogOpen(false);
    } catch (error) {
      console.log(error);
      setNotificationMessage('Error al editar el servicio');
      setNotificationOpen(true);
    } finally {
      actions.setSubmitting(false);
    }
  };

  /// / Publish service function
  const updateService = async (values) => {
    try {
      // eslint-disable-next-line no-underscore-dangle
      await apiUpdateService(service._id, values);
      setNotificationOpen(true);
    } catch (error) {
      console.log(error);
    }
  };

  const changeIsPublished = () => {
    const updatedFormData = { ...formData, isPublished: !formData.isPublished };
    setFormData(updatedFormData);
    if (!formData.isPublished) {
      setNotificationMessage('Servicio Publicado');
    } else {
      setNotificationMessage('Servicio Ocultado');
    }
    updateService(updatedFormData);
  };

  return (
    <Card className={classes.card} style={{ width: '100%' }}>
      <CardContent
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          height: '100%',
          alignItems: 'flex-end',
        }}
      >
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography variant="h6">{service.name}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2">
              Duración: {service.duration} horas
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2">Costo: $ {service.cost}</Typography>
          </Grid>
          <Grid item xs={12}>
            <img
              src={service.imageUrl}
              style={{
                width: '100%',
                height: '20vh',
                objectFit: 'cover',
              }}
              alt="Product"
            />
          </Grid>
          <Grid item xs={12}>
            <CardActions>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={12} md={6}>
                  <Button
                    variant="contained"
                    startIcon={<EditIcon />}
                    onClick={() => setDialogOpen(true)}
                  >
                    Editar
                  </Button>
                </Grid>

                <Grid item xs={12} sm={12} md={6}>
                  <Button
                    variant="outlined"
                    startIcon={<DeleteIcon />}
                    onClick={() => onDelete(service._id)}
                  >
                    Borrar
                  </Button>
                </Grid>

                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.isPublished}
                        onChange={changeIsPublished}
                        name="publushCheckbox"
                      />
                    }
                    label="Publicar"
                  />
                </Grid>
              </Grid>
            </CardActions>
          </Grid>
        </Grid>
      </CardContent>
      <ServiceForm
        isOpen={dialogOpen}
        onClose={() => {
          setDialogOpen(false);
        }}
        handleSubmit={(values, actions) => {
          handleEditService(values, actions);
        }}
        initialFormData={formData}
      />
    </Card>
  );
}

export default ServiceCardEditable;

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

function ServiceCardEditable({
  service,
  onEdit,
  onDelete,
  classes,
  setNotificationMessage,
  setNotificationOpen,
}) {
  // Update service function
  const updateService = async (values) => {
    try {
      // eslint-disable-next-line no-underscore-dangle
      await apiUpdateService(service._id, values);
      setNotificationOpen(true);
    } catch (error) {
      console.log(error);
    }
  };

  const [formData, setFormData] = useState({
    name: service.name,
    category: service.category,
    description: service.description,
    type: service.type,
    duration: service.duration,
    frequency: service.frequency,
    cost: service.cost,
    isPublished: service.isPublished,
  });

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
          justifyContent: 'center', // Centra verticalmente
          height: '100%', // Asegúrate de que CardContent tenga altura completa
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
              src="https://masqueclases.es/wp-content/uploads/2021/08/Global-Online-Education.jpg"
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
                    onClick={() => onEdit(service)}
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
    </Card>
  );
}

export default ServiceCardEditable;

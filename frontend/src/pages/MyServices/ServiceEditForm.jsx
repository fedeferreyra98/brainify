import React, { useState, useEffect } from 'react';
import {
  Dialog,
  Grid,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Button,
  Avatar,
  Slider,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { categories } from '../../data/mockCategory';
import { apiUpdateService, apiCreateService } from '../../api/apiService';

function ServiceEditForm({
  open,
  onClose,
  service,
  classes,
  setNotificationMessage,
  setNotificationOpen,
  setNotificationRedMessage,
  setNotificationRedOpen,
}) {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    type: '',
    duration: '',
    frequency: '',
    cost: '',
  });

  useEffect(() => {
    if (service) {
      setFormData({
        name: service.name,
        category: service.category,
        description: service.description,
        type: service.type,
        duration: service.duration,
        frequency: service.frequency,
        cost: service.cost,
      });
    } else {
      setFormData({
        name: '',
        category: '',
        description: '',
        type: '',
        duration: '',
        frequency: '',
        cost: '',
      });
    }
  }, [service]);

  // Function to handle changes on form inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSliderChange = (event, newValue) => {
    setFormData({ ...formData, duration: newValue });
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

  // Update service function
  const updateService = async (values) => {
    try {
      // eslint-disable-next-line no-underscore-dangle
      await apiUpdateService(service._id, values);
      setNotificationMessage('Servicio Actualizado');
      onClose();
      setNotificationOpen(true);
    } catch (error) {
      setNotificationRedMessage('Error al Actualizar el Servicio');
      setNotificationRedOpen(true);
    }
  };

  // Create service function
  const createService = async (values) => {
    try {
      await apiCreateService(values);
      // setServices((prevServices) => [...prevServices, newService]);
      setNotificationMessage('Servicio agregado correctamente');
      onClose();
      setNotificationOpen(true);
    } catch (error) {
      console.log(error);
      setNotificationRedMessage('Error al agregar el servicio');
      setNotificationRedOpen(true);
    }
  };

  // Guardar servicio
  const handleSave = () => {
    if (Object.values(formData).some((value) => !value)) {
      setNotificationRedMessage('Faltan campos en el formulario');
      setNotificationRedOpen(true);
      return;
    }
    createService(formData);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {service ? 'Modificar Servicio' : 'Agregar Servicio'}
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
          style={{ textAlign: 'left' }}
          hintText="Message Field"
          floatingLabelText="MultiLine and FloatingLabel"
          multiline
          rows={3}
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
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancelar
        </Button>
        <Button
          onClick={() => {
            if (service) {
              updateService(formData);
            } else {
              handleSave();
            }
          }}
          color="primary"
        >
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ServiceEditForm;

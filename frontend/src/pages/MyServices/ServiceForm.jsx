import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  Button,
  Slider,
  MenuItem,
} from '@mui/material';
import SlideTooltip from '../../components/ui/SlideTooltip';
import { categories } from '../../data/mockCategory';

function ServiceForm({ isOpen, onClose, handleSubmit, initialFormData }) {
  const validationSchema = Yup.object({
    name: Yup.string()
      .required('El nombre es requerido')
      .max(50, 'El nombre no puede tener más de 50 caracteres'),
    category: Yup.string().required('La categoría es requerida'),
    description: Yup.string()
      .required('La descripción es requerida')
      .max(255, 'La descripción no puede tener más de 255 caracteres'),
    type: Yup.string().required('El tipo es requerido'),
    duration: Yup.number().required('La duración es requerida'),
    frequency: Yup.string().required('La frecuencia es requerida'),
    cost: Yup.number()
      .required('El costo es requerido')
      .min(0.99, 'El costo debe ser mayor a 0.99 centavos'),
  });

  const formik = useFormik({
    initialValues: initialFormData || {
      name: '',
      category: '',
      description: '',
      type: '',
      duration: 0.5,
      frequency: '',
      cost: 0.99,
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>
        {formik.values ? 'Editar Servicio' : 'Agregar Servicio'}{' '}
      </DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <TextField
            margin="dense"
            fullWidth
            id="name"
            name="name"
            label="Nombre"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <TextField
            margin="dense"
            fullWidth
            id="description"
            name="description"
            label="Descripción"
            multiline
            rows={4}
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
            helperText={formik.touched.description && formik.errors.description}
          />
          <TextField
            margin="dense"
            fullWidth
            id="category"
            name="category"
            label="Categoría"
            select
            value={formik.values.category}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.category && Boolean(formik.errors.category)}
            helperText={formik.touched.category && formik.errors.category}
          >
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {capitalizeFirstLetter(category)}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            margin="dense"
            fullWidth
            id="type"
            name="type"
            label="Tipo"
            select
            value={formik.values.type}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.type && Boolean(formik.errors.type)}
            helperText={formik.touched.type && formik.errors.type}
          >
            <MenuItem key="Individual" value="Individual">
              Individual
            </MenuItem>
            <MenuItem key="Grupal" value="Grupal">
              Grupal
            </MenuItem>
          </TextField>
          <TextField
            margin="dense"
            fullWidth
            id="frequency"
            name="frequency"
            label="Frecuencia"
            select
            value={formik.values.frequency}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.frequency && Boolean(formik.errors.frequency)}
            helperText={formik.touched.frequency && formik.errors.frequency}
          >
            <MenuItem key="Unica" value="Unica">
              Unica
            </MenuItem>
            <MenuItem key="Semanal" value="Semanal">
              Semanal
            </MenuItem>
            <MenuItem key="Mensual" value="Mensual">
              Mensual
            </MenuItem>
          </TextField>
          <Typography id="discrete-slider" gutterBottom>
            Duración (horas)
          </Typography>
          <Slider
            ValueLabelComponent={SlideTooltip}
            margin="dense"
            fullWidth
            id="duration"
            name="duration"
            label="Duración"
            type="number"
            value={formik.values.duration}
            onChange={formik.handleChange}
            step={0.5}
            marks
            min={0.5}
            max={4}
            valueLabelDisplay="auto"
          />
          <TextField
            margin="dense"
            fullWidth
            id="cost"
            name="cost"
            label="Costo"
            type="number"
            value={formik.values.cost}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.cost && Boolean(formik.errors.cost)}
            helperText={formik.touched.cost && formik.errors.cost}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancelar</Button>
          <Button color="primary" variant="contained" type="submit">
            {initialFormData ? 'Guardar' : 'Agregar'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default ServiceForm;

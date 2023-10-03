import React, { useState } from 'react';
import {Button, Container, Typography, Grid, List, ListItem, ListItemText, ListItemSecondaryAction, Select, MenuItem, FormControl, InputLabel, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  button: {
    margin: theme.spacing(1)
  },
  list: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  mainContent: {
    padding: theme.spacing(5),
    textAlign: 'center',
  },
  footer: {
    marginTop: theme.spacing(5),
    padding: theme.spacing(3),
    backgroundColor: '#f5f5f5',
  },
  link: {
    textDecoration: 'none',
    color: 'inherit'
  }
}));

function ServiceExplorer() {
  const classes = useStyles();

  //Estados lista de servicios y filtrada
  const [servicios] = useState([
    { id: 1, nombre: 'Clase de Matemáticas', proveedor: 'Juan Pérez', categoria: 'tutorias', tipo: 'individual', frecuencia: 'única', duracion: '1 hora', costo: '$2000' },
    { id: 2, nombre: 'Clase de Fisica', proveedor: 'Juana Maria', categoria: 'tutorias', tipo: 'grupal', frecuencia: 'semanal', duracion: '1 hora', costo: '$3000' },
    { id: 3, nombre: 'Clase de Quimica', proveedor: 'Daniel Castillo', categoria: 'tutorias', tipo: 'individual', frecuencia: 'semanal', duracion: '1 hora', costo: '$3500' },
    { id: 4, nombre: 'Clase de Aleman', proveedor: 'Fernando Lopez', categoria: 'idioma', tipo: 'grupal', frecuencia: 'mensual', duracion: '1 hora', costo: '$4000' },
    // ... puedes agregar más servicios ficticios aquí
  ]);
  const [serviciosFiltrados, setServiciosFiltrados] = useState(servicios);
  

  //Estados para los filtros
  const [categoriaFiltro, setCategoriaFiltro] = useState('');
  const [tipoFiltro, setTipoFiltro] = useState('');
  const [frecuenciaFiltro, setFrecuenciaFiltro] = useState('');

  // Estado para controlar el diálogo de contratación
  const [dialogOpen, setDialogOpen] = useState(false);

  // Estados para los campos del formulario de contratación
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [horario, setHorario] = useState({ inicio: '', fin: '' });
  const [mensaje, setMensaje] = useState('');

  // Función para resetear el formulario de contratación
  const resetFormContratacion = () => {
    setTelefono('');
    setEmail('');
    setHorario({ inicio: '', fin: '' });
    setMensaje('');
  };

  // Función para verificar si todos los campos del formulario están completos
  const isFormComplete = () => {
    return telefono && email && horario.inicio && horario.fin && mensaje;
  };

  // Generar las opciones de horario en intervalos de 30 minutos
  const generateTimeOptions = () => {
    const options = [];
    for (let i = 0; i < 24; i++) {
      for (let j = 1; j < 60; j += 30) {
        const hour = i.toString().padStart(2, '0');
        const minute = j.toString().padStart(2, '0');
        options.push(`${hour}:${minute}hs`);
      }
    }
    return options;
  };

    // Función para validar que la hora de finalización sea mayor que la hora de inicio
    const CheckTime = () => {
      if (horario.fin <= horario.inicio) {
        alert("La hora de finalización debe ser mayor que la hora de inicio.");
        resetFormContratacion(); // Restablecer el formulario
        setDialogOpen(false);    // Cerrar el diálogo
        setDialogOpen(true);    // Abrir el diálogo
      } else {
        setDialogOpen(false); 
        resetFormContratacion();
      }
    };

    //Funcion de filtrado
    const filtrarServicios = () => {
      const filtrados = servicios.filter(servicio => {
        return (!categoriaFiltro || servicio.categoria === categoriaFiltro) &&
               (!tipoFiltro || servicio.tipo === tipoFiltro) &&
               (!frecuenciaFiltro || servicio.frecuencia === frecuenciaFiltro);
      });
      setServiciosFiltrados(filtrados);
    };

    //Funcion para limpiar filtros
    const limpiarFiltros = () => {
      setCategoriaFiltro('');
      setTipoFiltro('');
      setFrecuenciaFiltro('');
      setServiciosFiltrados(servicios);
    };

  // Renderizar el formulario de contratación
  const renderDialogContratacion = () => (
    <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
      <DialogTitle>Contratar Servicio</DialogTitle>
      <DialogContent>
        <TextField fullWidth margin="normal" label="Teléfono" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
        <TextField fullWidth margin="normal" label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Typography variant="h7" gutterBottom>Franja horaria de contacto</Typography>
        <FormControl className={classes.formControl} fullWidth>
          <InputLabel>Hora de inicio</InputLabel>
          <Select value={horario.inicio} onChange={(e) => setHorario({ ...horario, inicio: e.target.value })}>
            <MenuItem value="Seleccionar">Seleccionar</MenuItem>
            {generateTimeOptions().map((time) => (
              <MenuItem key={time} value={time}>{time}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl className={classes.formControl} fullWidth>
          <InputLabel>Hora de finalización</InputLabel>
          <Select value={horario.fin} onChange={(e) => setHorario({ ...horario, fin: e.target.value })}>
            <MenuItem value="Seleccionar">Seleccionar</MenuItem>
            {generateTimeOptions().map((time) => (
              <MenuItem key={time} value={time}>{time}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField fullWidth margin="normal" label="Mensaje al proveedor" value={mensaje} onChange={(e) => setMensaje(e.target.value)} multiline rows={4} />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => { setDialogOpen(false); resetFormContratacion(); }} color="primary">Cancelar</Button>
        <Button 
          onClick={CheckTime} 
          color="primary" 
          disabled={!isFormComplete()} // Deshabilita el botón si el formulario no está completo
        >
          Enviar
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <div>
      <Container className={classes.root}>
        <Typography variant='h4' gutterBottom>
          Explorar Servicios
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FormControl className={classes.formControl} fullWidth>
              <InputLabel>Categoría</InputLabel>
              <Select value={categoriaFiltro} onChange={(e) => setCategoriaFiltro(e.target.value)}>
                <MenuItem value={'tutorias'}>Tutorías escolares</MenuItem>
                <MenuItem value={'idioma'}>Clases de idioma</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl className={classes.formControl} fullWidth>
              <InputLabel>Tipo de clase</InputLabel>
              <Select value={tipoFiltro} onChange={(e) => setTipoFiltro(e.target.value)}>
                <MenuItem value={'individual'}>Individual</MenuItem>
                <MenuItem value={'grupal'}>Grupal</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl className={classes.formControl} fullWidth>
              <InputLabel>Frecuencia</InputLabel>
              <Select value={frecuenciaFiltro} onChange={(e) => setFrecuenciaFiltro(e.target.value)}>
                <MenuItem value={'única'}>Única</MenuItem>
                <MenuItem value={'semanal'}>Semanal</MenuItem>
                <MenuItem value={'mensual'}>Mensual</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Button variant='contained' color='primary' className={classes.button} onClick={filtrarServicios}>
          Filtrar
        </Button>
        <Button variant='outlined' color='secondary' className={classes.button} onClick={limpiarFiltros}>
          Limpiar Filtros
        </Button>
        <List className={classes.list}>
          {serviciosFiltrados.map(servicio => (
            <ListItem key={servicio.id} alignItems='flex-start'>
              <ListItemText
                primary={servicio.nombre}
                secondary={
                  <React.Fragment>
                    <Typography component='span' variant='body2' color='textPrimary'>
                      Proveedor: {servicio.proveedor}
                    </Typography>
                    {` — Duración: ${servicio.duracion} — Costo: ${servicio.costo}`}
                  </React.Fragment>
                }
              />
              <ListItemSecondaryAction>
                <Button variant="contained" color="primary" onClick={() => setDialogOpen(true)}>Contratar</Button>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Container>
      {renderDialogContratacion()}
    </div>
  );
}

export default ServiceExplorer;
import React, { useState } from 'react';
import { AppBar, Toolbar, Button, Container, Typography, Grid, List, ListItem, ListItemText, ListItemSecondaryAction, Select, MenuItem, FormControl, InputLabel, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

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

function ExplorarServicios() {
  const classes = useStyles();

  //Estados lista de servicios y filtrada
  const [servicios, setServicios] = useState([
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
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}></Typography>
          <Link to="/login" className={classes.link}><Button color="inherit">Iniciar Sesión</Button></Link>
          <Link to="/registro" className={classes.link}><Button color="inherit">Registrarse</Button></Link>
        </Toolbar>
      </AppBar>
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>ServiceHub</Typography>
          <Link to="/" className={classes.link}><Button color="inherit">Inicio</Button></Link>
          <Link to="/explorar-servicios" className={classes.link}><Button color="inherit">Explorar Servicios</Button></Link>
          <Link to="/mis-servicios" className={classes.link}><Button color="inherit">Mis Servicios</Button></Link>
          <Link to="/comentarios" className={classes.link}><Button color="inherit">Comentarios</Button></Link>
          <Link to="/contrataciones" className={classes.link}><Button color="inherit">Contrataciones</Button></Link>
        </Toolbar>
      </AppBar>
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

export default ExplorarServicios;


/*
HTML PURO
import React, { useState } from 'react';

const ExplorarServicios = () => {
  const [filtro, setFiltro] = useState({
    categoria: '',
    tipoClase: '',
    frecuencia: ''
  });

  const serviciosEjemplo = [
    { nombre: 'Clases de Matemáticas', categoria: 'Tutorías escolares', tipoClase: 'individual', frecuencia: 'semanal' },
    { nombre: 'Clases de Inglés', categoria: 'Clases de idioma', tipoClase: 'grupal', frecuencia: 'mensual' },
    // Puedes agregar más ejemplos aquí
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    // Lógica de búsqueda aquí
    console.log('Buscando servicios con filtro:', filtro);
  };

  return (
    <div className='explorar-container'>
      <h2>Explorar Servicios</h2>
      <form onSubmit={handleSearch}>
        <div className='input-group'>
          <label>Categoría:</label>
          <select value={filtro.categoria} onChange={(e) => setFiltro({ ...filtro, categoria: e.target.value })}>
            <option value=''>Todas</option>
            <option value='Tutorías escolares'>Tutorías escolares</option>
            <option value='Clases de idioma'>Clases de idioma</option>
            // Puedes agregar más categorías aquí
          </select>
        </div>
        <div className='input-group'>
          <label>Tipo de Clase:</label>
          <select value={filtro.tipoClase} onChange={(e) => setFiltro({ ...filtro, tipoClase: e.target.value })}>
            <option value=''>Todos</option>
            <option value='individual'>Individual</option>
            <option value='grupal'>Grupal</option>
          </select>
        </div>
        <div className='input-group'>
          <label>Frecuencia:</label>
          <select value={filtro.frecuencia} onChange={(e) => setFiltro({ ...filtro, frecuencia: e.target.value })}>
            <option value=''>Todas</option>
            <option value='única'>Única</option>
            <option value='semanal'>Semanal</option>
            <option value='mensual'>Mensual</option>
          </select>
        </div>
        <button type='submit'>Buscar</button>
      </form>
      <div className='servicios-list'>
        {serviciosEjemplo.map((servicio, index) => (
          <div key={index} className='servicio-item'>
            <h3>{servicio.nombre}</h3>
            <p>Categoría: {servicio.categoria}</p>
            <p>Tipo de Clase: {servicio.tipoClase}</p>
            <p>Frecuencia: {servicio.frecuencia}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExplorarServicios;
*/
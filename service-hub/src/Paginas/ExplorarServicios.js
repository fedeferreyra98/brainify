import React from 'react';
import {AppBar, Toolbar, Button, Container, Typography, Grid, List, ListItem, ListItemText, Select, MenuItem, FormControl, InputLabel } from '@material-ui/core';
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
              <Select>
                <MenuItem value={'tutorias'}>Tutorías escolares</MenuItem>
                <MenuItem value={'idioma'}>Clases de idioma</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl className={classes.formControl} fullWidth>
              <InputLabel>Tipo de clase</InputLabel>
              <Select>
                <MenuItem value={'individual'}>Individual</MenuItem>
                <MenuItem value={'grupal'}>Grupal</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Button variant='contained' color='primary' className={classes.button}>
          Buscar
        </Button>
        <List className={classes.list}>
          <ListItem alignItems='flex-start'>
            <ListItemText
              primary='Clase de Matemáticas'
              secondary={
                <React.Fragment>
                  <Typography component='span' variant='body2' color='textPrimary'>
                    Proveedor: Juan Pérez
                  </Typography>
                  {' — Duración: 1 hora — Costo: $20'}
                </React.Fragment>
              }
            />
          </ListItem>
        </List>
      </Container>
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
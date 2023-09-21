import React from 'react';
import {AppBar, Toolbar, Button, Container, Typography, List, ListItem, ListItemText } from '@material-ui/core';
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

function Contrataciones() {
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
          Contrataciones
        </Typography>
        <List className={classes.list}>
          {/* Ejemplo de contratación */}
          <ListItem alignItems='flex-start'>
            <ListItemText
              primary='Clase de Matemáticas'
              secondary={
                <React.Fragment>
                  <Typography component='span' variant='body2' color='textPrimary'>
                    Proveedor: Juan Pérez
                  </Typography>
                  {' — Estado: Aceptada'}
                </React.Fragment>
              }
            />
          </ListItem>
          {/* Puedes agregar más contrataciones de la misma manera */}
        </List>
      </Container>
    </div>
  );
}

export default Contrataciones;
/*
import React, { useState } from 'react';

const Contrataciones = () => {
  const [contrataciones, setContrataciones] = useState([
    { id: 1, usuario: 'Ana López', servicio: 'Clases de Matemáticas', estado: 'Solicitada' },
    { id: 2, usuario: 'Carlos Rodríguez', servicio: 'Clases de Inglés', estado: 'Aceptada' }
    // Puedes agregar más contrataciones de ejemplo aquí
  ]);

  const handleCambiarEstado = (id, nuevoEstado) => {
    const nuevasContrataciones = contrataciones.map(contratacion => {
      if (contratacion.id === id) {
        return { ...contratacion, estado: nuevoEstado };
      }
      return contratacion;
    });
    setContrataciones(nuevasContrataciones);
  };

  return (
    <div className='contrataciones-container'>
      <h2>Contrataciones</h2>
      {contrataciones.map(contratacion => (
        <div key={contratacion.id} className='contratacion-item'>
          <h3>{contratacion.usuario}</h3>
          <p>Servicio: {contratacion.servicio}</p>
          <p>Estado: {contratacion.estado}</p>
          <button onClick={() => handleCambiarEstado(contratacion.id, 'Aceptada')}>Aceptar</button>
          <button onClick={() => handleCambiarEstado(contratacion.id, 'Finalizada')}>Finalizar</button>
          <button onClick={() => handleCambiarEstado(contratacion.id, 'Cancelada')}>Cancelar</button>
        </div>
      ))}
    </div>
  );
};

export default Contrataciones;
*/
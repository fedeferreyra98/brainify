import React from 'react';
import { AppBar, Toolbar, Button, Container, Typography, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
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

function MisServicios() {
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
        <Typography variant='h4' gutterBottom>Mis Servicios</Typography>
        <List className={classes.list}>
          <ListItem alignItems='flex-start'>
            <ListItemText
              primary='Clase de Matemáticas'
              secondary={
                <React.Fragment>
                  <Typography component='span' variant='body2' color='textPrimary'>
                    Duración: 1 hora — Costo: $20
                  </Typography>
                </React.Fragment>
              }
            />
            <ListItemSecondaryAction>
              <IconButton edge='end' aria-label='edit'><EditIcon /></IconButton>
              <IconButton edge='end' aria-label='delete'><DeleteIcon /></IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </Container>
    </div>
  );
}

export default MisServicios;


/*
import React, { useState } from 'react';

const MisServicios = () => {
  const [servicios, setServicios] = useState([
    { id: 1, nombre: 'Clases de Matemáticas', duracion: '1 hora', frecuencia: 'Semanal', costo: '$50' },
    { id: 2, nombre: 'Clases de Inglés', duracion: '2 horas', frecuencia: 'Mensual', costo: '$100' }
    // Puedes agregar más servicios de ejemplo aquí
  ]);

  const handleEliminar = (id) => {
    const nuevosServicios = servicios.filter(servicio => servicio.id !== id);
    setServicios(nuevosServicios);
  };

  return (
    <div className='mis-servicios-container'>
      <h2>Mis Servicios</h2>
      {servicios.map(servicio => (
        <div key={servicio.id} className='servicio-item'>
          <h3>{servicio.nombre}</h3>
          <p>Duración: {servicio.duracion}</p>
          <p>Frecuencia: {servicio.frecuencia}</p>
          <p>Costo: {servicio.costo}</p>
          <button onClick={() => handleEliminar(servicio.id)}>Eliminar</button>
        </div>
      ))}
    </div>
  );
};

export default MisServicios;
*/
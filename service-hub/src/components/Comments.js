import React from 'react';
import { AppBar, Toolbar, Button, Container, Typography, List, ListItem, ListItemText } from '@material-ui/core';
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

function Comentarios() {
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
          Comentarios
        </Typography>
        <List className={classes.list}>
          {/* Ejemplo de comentario */}
          <ListItem alignItems='flex-start'>
            <ListItemText
              primary='Usuario 1'
              secondary={
                <React.Fragment>
                  <Typography component='span' variant='body2' color='textPrimary'>
                    Excelente servicio!
                  </Typography>
                  {' — Estoy muy satisfecho con la clase que tomé.'}
                </React.Fragment>
              }
            />
          </ListItem>
          {/* Puedes agregar más comentarios de la misma manera */}
        </List>
      </Container>
    </div>
  );
}

export default Comentarios;
/*
import React, { useState } from 'react';

const Comentarios = () => {
  const [comentarios, setComentarios] = useState([
    { id: 1, usuario: 'Ana López', comentario: 'Excelente servicio, muy recomendado.' },
    { id: 2, usuario: 'Carlos Rodríguez', comentario: 'Me ayudó mucho con mis dudas. Gracias!' }
    // Puedes agregar más comentarios de ejemplo aquí
  ]);

  const handleBloquear = (id) => {
    const nuevosComentarios = comentarios.filter(comentario => comentario.id !== id);
    setComentarios(nuevosComentarios);
  };

  return (
    <div className='comentarios-container'>
      <h2>Comentarios</h2>
      {comentarios.map(comentario => (
        <div key={comentario.id} className='comentario-item'>
          <h3>{comentario.usuario}</h3>
          <p>{comentario.comentario}</p>
          <button onClick={() => handleBloquear(comentario.id)}>Bloquear Comentario</button>
        </div>
      ))}
    </div>
  );
};

export default Comentarios;
*/
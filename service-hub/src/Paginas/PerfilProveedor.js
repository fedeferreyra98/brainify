import React from 'react';
import { Button, Container, Typography, Grid, Link, Avatar, Card, CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  button: {
    margin: theme.spacing(1)
  },
  largeAvatar: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  card: {
    marginTop: theme.spacing(2)
  }
}));

function PerfilProveedor() {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <Typography variant='h4' gutterBottom>
        Perfil del Proveedor
      </Typography>
      <Grid container spacing={2} alignItems='center'>
        <Grid item xs={12} sm={4} md={3}>
          <Avatar alt='Proveedor' src='/path-to-image.jpg' className={classes.largeAvatar} />
        </Grid>
        <Grid item xs={12} sm={8} md={9}>
          <Typography variant='h5'>Juan Pérez</Typography>
          <Typography variant='subtitle1'>Profesor de Matemáticas</Typography>
        </Grid>
      </Grid>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant='h6'>Sobre mí:</Typography>
          <Typography variant='body2'>
            Soy profesor de matemáticas con más de 10 años de experiencia. He trabajado en diversas instituciones y ofrezco clases particulares a estudiantes de todos los niveles.
          </Typography>
        </CardContent>
      </Card>
      <Grid container spacing={2}>
        <Grid item>
          <Button variant='contained' color='primary' className={classes.button} component={Link} href='/'>
            Volver al inicio
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default PerfilProveedor;
/*
import React, { useState } from 'react';

const PerfilProveedor = () => {
  const [perfil, setPerfil] = useState({
    nombre: 'Juan Pérez',
    email: 'juan.perez@example.com',
    telefono: '123-456-7890',
    titulo: 'Licenciado en Matemáticas',
    experiencia: '5 años enseñando en escuelas y universidades'
  });

  const handleUpdate = (e) => {
    e.preventDefault();
    // Lógica de actualización aquí
    console.log('Perfil actualizado:', perfil);
  };

  return (
    <div className='perfil-proveedor-container'>
      <h2>Perfil Proveedor</h2>
      <form onSubmit={handleUpdate}>
        <div className='input-group'>
          <label>Nombre:</label>
          <input type='text' value={perfil.nombre} onChange={(e) => setPerfil({ ...perfil, nombre: e.target.value })} required />
        </div>
        <div className='input-group'>
          <label>Email:</label>
          <input type='email' value={perfil.email} onChange={(e) => setPerfil({ ...perfil, email: e.target.value })} required />
        </div>
        <div className='input-group'>
          <label>Teléfono:</label>
          <input type='tel' value={perfil.telefono} onChange={(e) => setPerfil({ ...perfil, telefono: e.target.value })} required />
        </div>
        <div className='input-group'>
          <label>Título:</label>
          <input type='text' value={perfil.titulo} onChange={(e) => setPerfil({ ...perfil, titulo: e.target.value })} required />
        </div>
        <div className='input-group'>
          <label>Experiencia:</label>
          <textarea value={perfil.experiencia} onChange={(e) => setPerfil({ ...perfil, experiencia: e.target.value })} required></textarea>
        </div>
        <button type='submit'>Actualizar Perfil</button>
      </form>
    </div>
  );
};

export default PerfilProveedor;
*/
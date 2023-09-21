import React from 'react';
import { Button, Container, Typography, Grid, TextField } from '@material-ui/core';
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
  textField: {
    margin: theme.spacing(1),
    width: '100%',
  }
}));

function Registro() {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <Typography variant='h4' gutterBottom>
        Registro
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField className={classes.textField} label='Nombre' variant='outlined' />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField className={classes.textField} label='Apellido' variant='outlined' />
        </Grid>
        <Grid item xs={12}>
          <TextField className={classes.textField} label='Correo electrónico' variant='outlined' />
        </Grid>
        <Grid item xs={12}>
          <TextField className={classes.textField} label='Contraseña' type='password' variant='outlined' />
        </Grid>
      </Grid>
      <Button variant='contained' color='primary' className={classes.button} component={Link} to="/login">
        Registrarse
      </Button>
    </Container>
  );
}

export default Registro;
/*
import React, { useState } from 'react';

const Registro = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica de registro aquí
    console.log('Datos de registro:', formData);
  };

  return (
    <div className='registro-container'>
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <div className='input-group'>
          <label>Nombre:</label>
          <input type='text' value={formData.nombre} onChange={(e) => setFormData({ ...formData, nombre: e.target.value })} required />
        </div>
        <div className='input-group'>
          <label>Apellido:</label>
          <input type='text' value={formData.apellido} onChange={(e) => setFormData({ ...formData, apellido: e.target.value })} required />
        </div>
        <div className='input-group'>
          <label>Email:</label>
          <input type='email' value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
        </div>
        <div className='input-group'>
          <label>Teléfono:</label>
          <input type='tel' value={formData.telefono} onChange={(e) => setFormData({ ...formData, telefono: e.target.value })} required />
        </div>
        <button type='submit'>Registrarse</button>
      </form>
    </div>
  );
};

export default Registro;
*/
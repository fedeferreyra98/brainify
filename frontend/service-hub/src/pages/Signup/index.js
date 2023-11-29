import React, { useState } from 'react';
import { Button, Container, Typography, Grid, TextField } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3),
    backgroundColor: '#DDEBF8',
  },
  button: {
    margin: theme.spacing(1),
  },
  textField: {
    margin: theme.spacing(1),
    width: '100%',
  },
}));

function SignUpPage() {
  const classes = useStyles();
  const history = useHistory(); // Para redirigir después de un registro exitoso
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
  });

  // Actualiza el estado del formulario
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Maneja la presentación del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:4000/api/auth/register',
        formData
      );
      console.log(response.data);
      // Redirigir al usuario a su perfil o a donde quieras después del registro
      history.push('/perfil-proveedor');
    } catch (error) {
      console.error('Hubo un error al registrarse', error.response || error);
    }
  };

  return (
    <Container className={classes.root}>
      <Typography variant="h4" gutterBottom>
        Registro
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            className={classes.textField}
            label="Nombre"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            className={classes.textField}
            label="Apellido"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            className={classes.textField}
            label="Correo electrónico"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            className={classes.textField}
            label="Número de Teléfono"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            className={classes.textField}
            label="Contraseña"
            type="password"
            variant="outlined"
          />
        </Grid>
      </Grid>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        component={Link}
        to="/perfil-proveedor"
      >
        Registrarse
      </Button>
    </Container>
  );
}

export default SignUpPage;

import React from 'react';
import { Button, Container, Typography, Grid, TextField } from '@material-ui/core';
import { Link } from 'react-router-dom'; // Importa el Link de react-router-dom
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  },
  button: {
    margin: theme.spacing(1)
  },
  textField: {
    margin: theme.spacing(1),
    width: '100%',
  }
}));

function LoginPage() {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <Typography variant='h4' gutterBottom>
        Iniciar Sesión
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField className={classes.textField} label='Correo electrónico' variant='outlined' />
        </Grid>
        <Grid item xs={12}>
          <TextField className={classes.textField} label='Contraseña' type='password' variant='outlined' />
        </Grid>
      </Grid>
      <Button variant='contained' color='primary' className={classes.button} component={Link} to="/">
        Iniciar Sesión
      </Button>
      <Button className={classes.button} color="primary" component={Link} to="/forgot-password">
        ¿Olvidaste tu contraseña?
      </Button>
      <Typography variant="body1" className={classes.button}>
        ¿Todavía no tienes una cuenta? <Link to="/registro">Regístrate</Link>
      </Typography>
    </Container>
  );
}

export default LoginPage;
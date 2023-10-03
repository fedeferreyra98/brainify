import React from 'react';
import { Button, Container, Typography, Grid, Link, Avatar, Card, CardContent } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

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

function ProviderProfile() {
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

export default ProviderProfile;
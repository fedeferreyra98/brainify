import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { Link } from 'react-router-dom';
import serviceHubLogo from '../assets/Logos/service-hub-icon.png';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
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

function LandingPage() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
          </Typography>
          <Link to="/login" className={classes.link}><Button color="inherit">Iniciar Sesión</Button></Link>
          <Link to="/registro" className={classes.link}><Button color="inherit">Registrarse</Button></Link>
        </Toolbar>
      </AppBar>
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            ServiceHub
          </Typography>
          <Link to="/" className={classes.link}><Button color="inherit">Inicio</Button></Link>
          <Link to="/explorar-servicios" className={classes.link}><Button color="inherit">Explorar Servicios</Button></Link>
          <Link to="/mis-servicios" className={classes.link}><Button color="inherit">Mis Servicios</Button></Link>
          <Link to="/comentarios" className={classes.link}><Button color="inherit">Comentarios</Button></Link>
          <Link to="/contrataciones" className={classes.link}><Button color="inherit">Contrataciones</Button></Link>
          {/* Puedes agregar un link para "Contacto" si tienes una página dedicada para ello */}
        </Toolbar>
      </AppBar>
      <Container className={classes.mainContent}>
        <Typography variant="h4" gutterBottom>
          Bienvenido a ServiceHub
        </Typography>
        <Typography variant="h6" paragraph>
          Encuentra y ofrece servicios de calidad en nuestra plataforma. Desde tutorías hasta clases de música, ¡tenemos algo para todos!
        </Typography>
        <img src={serviceHubLogo} alt="ServiceHub" width="60%" />
      </Container>
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          ServiceHub
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary">
          Contacto: info@servicehub.com
        </Typography>
      </footer>
    </div>
  );
}

export default LandingPage;

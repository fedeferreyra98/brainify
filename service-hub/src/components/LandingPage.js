import React from 'react';
import { Typography, Container } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
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
    color: 'inherit',
  },
}));

function LandingPage() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container className={classes.mainContent}>
        <Typography variant="h4" gutterBottom>
          Bienvenido a ServiceHub
        </Typography>
        <Typography variant="h6" paragraph>
          Encuentra y ofrece servicios de calidad en nuestra plataforma. Desde
          tutorías hasta clases de música, ¡tenemos algo para todos!
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

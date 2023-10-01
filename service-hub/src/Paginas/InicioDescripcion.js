import React from 'react';
import { AppBar, Toolbar, Typography, Button, makeStyles, Container} from '@material-ui/core';
import { Link } from 'react-router-dom';
import serviceHubLogo from './Logos/Group_246-removebg-preview.png';

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

function InicioDescripcion() {
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

export default InicioDescripcion;


/*
import React from 'react';
import { Button, Container, Typography, Grid, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  button: {
    margin: theme.spacing(1)
  }
}));

function InicioDescripcion() {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <Typography variant='h4' gutterBottom>
        Bienvenido a nuestro Marketplace
      </Typography>
      <Typography variant='body1' paragraph>
        Aquí puedes explorar y contratar diversos servicios ofrecidos por profesionales. Ya sea que busques clases particulares, tutorías o cualquier otro servicio, ¡estás en el lugar correcto!
      </Typography>
      <Grid container spacing={2}>
        <Grid item>
          <Button variant='contained' color='primary' className={classes.button} component={Link} href='/explorar-servicios'>
            Explorar Servicios
          </Button>
        </Grid>
        <Grid item>
          <Button variant='contained' color='secondary' className={classes.button} component={Link} href='/registro'>
            Registrarse
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default InicioDescripcion;
*/
/*
import React from 'react';
import { Link } from 'react-router-dom';

const InicioDescripcion = () => {
  return (
    <div className='inicio-descripcion-container'>
      <h1>Bienvenido a nuestro Marketplace</h1>
      <p>Esta es una plataforma donde los profesores pueden ofrecer clases particulares y los alumnos pueden buscar y contratar estos servicios.</p>
      <div className='enlaces-container'>
        <Link to='/explorar-servicios'>Explorar Servicios</Link>
        <Link to='/registro'>Registro</Link>
        <Link to='/ingreso'>Ingreso</Link>
        <Link to='/mis-servicios'>Mis Servicios</Link>
        <Link to='/perfil-proveedor'>Perfil Proveedor</Link>
        <Link to='/comentarios'>Comentarios</Link>
        <Link to='/contrataciones'>Contrataciones</Link>
      </div>
    </div>
  );
};

export default InicioDescripcion;
*/
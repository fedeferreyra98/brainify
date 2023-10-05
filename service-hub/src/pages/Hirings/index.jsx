import React, { useState } from 'react';
import { Grid, Container, Typography, Tabs, Tab } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import HiringList from './HiringList';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  button: {
    margin: theme.spacing(1),
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
    color: 'inherit',
  },
  tabsContainer: {
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  tabItem: {
    [theme.breakpoints.up('md')]: {
      maxWidth: '25%',
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
}));

function Hirings() {
  const classes = useStyles();

  // Estado inicial para las contrataciones
  const [contrataciones, setContrataciones] = useState([
    {
      id: 1,
      servicio: 'Clase de Matemáticas',
      usuario: 'Juan Pérez',
      numeroTelefonico: '1544054552',
      horarioContacto: '10:30-18:00',
      estado: 'solicitada',
    },
    {
      id: 2,
      servicio: 'Clase de Aleman',
      usuario: 'Benjamin Fernandez',
      numeroTelefonico: '1148766551',
      horarioContacto: '08:00-20:00',
      estado: 'aceptada',
    },
    // ... puedes agregar más contrataciones iniciales si lo deseas
  ]);

  // Función para cambiar el estado de una contratación
  const handleEstadoChange = (id, nuevoEstado) => {
    const updatedContrataciones = contrataciones.map((contratacion) => {
      if (contratacion.id === id) {
        return { ...contratacion, estado: nuevoEstado };
      }
      return contratacion;
    });
    setContrataciones(updatedContrataciones);
  };
  const [currentTab, setCurrentTab] = useState('General');

  const handleChangeTab = (event, newValue) => {
    setCurrentTab(newValue);
  };

  return (
    <div>
      <Container className={classes.root}>
        <Typography variant="h4" gutterBottom>
          Contrataciones
        </Typography>

        <Grid
          container
          justifyContent="center"
          className={classes.tabsContainer}
        >
          <Tabs
            value={currentTab}
            onChange={handleChangeTab}
            centered
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab label="General" value="General" className={classes.tabItem} />
            <Tab
              label="Solicitada"
              value="solicitada"
              className={classes.tabItem}
            />
            <Tab
              label="Aceptada"
              value="aceptada"
              className={classes.tabItem}
            />
            <Tab
              label="Finalizada"
              value="finalizada"
              className={classes.tabItem}
            />
          </Tabs>
        </Grid>

        <HiringList
          contrataciones={
            currentTab === 'General'
              ? contrataciones
              : contrataciones.filter((c) => c.estado === currentTab)
          }
          handleEstadoChange={handleEstadoChange}
          classes={classes}
        />
      </Container>
    </div>
  );
}

export default Hirings;

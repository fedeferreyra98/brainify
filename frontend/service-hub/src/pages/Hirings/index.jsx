import React, { useState } from 'react';
import {
  Container,
  Typography,
  Tabs,
  Tab,
  Pagination,
  Box,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import HiringList from './HiringList';
import mockHirings from '../../data/mockHirings';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3),
    backgroundColor: '#DDEBF8',
  },
  mainContent: {
    padding: theme.spacing(5),
    textAlign: 'left',
    backgroundColor: '#DDEBF8',
  },
  list: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  tabHover: {
    '&:hover': {
      color: '#ffffff',
    },
  },
  footer: {
    marginTop: theme.spacing(5),
    padding: theme.spacing(3),
    backgroundColor: '#f5f5f5',
  },
}));

function Hirings() {
  const classes = useStyles();

  const [contrataciones, setContrataciones] = useState(mockHirings);
  const [currentTab, setCurrentTab] = useState('General');

  const handleChangeTab = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleEstadoChange = (id, nuevoEstado) => {
    const updatedContrataciones = contrataciones.map((contratacion) => {
      if (contratacion.id === id) {
        return { ...contratacion, estado: nuevoEstado };
      }
      return contratacion;
    });
    setContrataciones(updatedContrataciones);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  // Filtrar contrataciones basado en la pestaña actual

  const filteredContrataciones =
    currentTab === 'General'
      ? contrataciones
      : contrataciones.filter((c) => c.estado === currentTab);

  // Calcular el número total de páginas basado en las contrataciones filtradas
  const totalPages = Math.ceil(filteredContrataciones.length / itemsPerPage);

  return (
    <div>
      <Container className={classes.mainContent}>
        <Typography variant="h4" gutterBottom>
          Contrataciones
        </Typography>

        <Tabs
          value={currentTab}
          onChange={handleChangeTab}
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
          aria-label="scrollable force tabs example"
        >
          <Tab
            label="Todas"
            value="General"
            className={classes.tabHover}
            wrapped
          />
          <Tab
            label="Solicitadas"
            value="solicitada"
            className={classes.tabHover}
            wrapped
          />
          <Tab
            label="Aceptadas"
            value="aceptada"
            className={classes.tabHover}
            wrapped
          />
          <Tab
            label="Canceladas"
            value="cancelada"
            className={classes.tabHover}
            wrapped
          />
          <Tab
            label="Finalizadas"
            value="finalizada"
            className={classes.tabHover}
            wrapped
          />
        </Tabs>

        <HiringList
          contrataciones={filteredContrataciones.slice(
            (currentPage - 1) * itemsPerPage,
            currentPage * itemsPerPage
          )}
          handleEstadoChange={handleEstadoChange}
          classes={classes}
        />

        {totalPages > 1 && (
          <Box display="flex" justifyContent="center" marginTop="20px">
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={(event, value) => setCurrentPage(value)}
            />
          </Box>
        )}
        <footer className={classes.footer}>
          <Typography variant="h6" align="center" gutterBottom>
            Brainify
          </Typography>
          <Typography variant="subtitle1" align="center" color="textSecondary">
            Contacto: info@brainify.com
          </Typography>
        </footer>
      </Container>
    </div>
  );
}

export default Hirings;

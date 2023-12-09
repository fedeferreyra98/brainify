import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Tabs,
  Tab,
  Pagination,
  Box,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { apiGetHiringsByUser, apiUpdateHiring } from '../../api/apiService';
import HiringList from './HiringList';

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

  const [contrataciones, setContrataciones] = useState([]);
  const [currentTab, setCurrentTab] = useState('all');
  const [updateHirings, setUpdateHirings] = useState(false);

  const storedUser = localStorage.getItem('user');
  const obj = JSON.parse(storedUser);

  const handleChangeTab = (event, newValue) => {
    setCurrentTab(newValue);
  };

  // Obtener contrataciones de la API
  useEffect(() => {
    const getHirings = async () => {
      try {
        const response = await apiGetHiringsByUser(obj.id);
        setContrataciones(response.hiring);
      } catch (error) {
        console.error('Error getting comments info:', error);
      }
    };
    getHirings();
  }, [updateHirings]);

  const handleEstadoChange = async (id, nuevoEstado) => {
    try {
      const estadoObj = { contractStatus: nuevoEstado };
      const response = await apiUpdateHiring(id, estadoObj);
      if (response) {
        console.log(response);
        // Actualizar el estado local con la nueva información
        setContrataciones((prevContrataciones) =>
          prevContrataciones.map((contratacion) =>
            contratacion.id === id
              ? { ...contratacion, ...estadoObj }
              : contratacion
          )
        );
      }
    } catch (error) {
      console.error('Error updating hiring info:', error);
    }
    setUpdateHirings((prev) => !prev);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Filtrar contrataciones basado en la pestaña actual
  const filteredContrataciones =
    currentTab === 'all'
      ? contrataciones
      : contrataciones.filter((c) => c.contractStatus === currentTab);

  // Calcular el número total de páginas basado en las contrataciones filtradas
  const totalPages = Math.ceil(filteredContrataciones.length / itemsPerPage);

  const slicedContrataciones = Array.isArray(filteredContrataciones)
    ? filteredContrataciones.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      )
    : [];

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
          <Tab label="Todas" value="all" className={classes.tabHover} wrapped />
          <Tab
            label="Solicitadas"
            value="Solicitada"
            className={classes.tabHover}
            wrapped
          />
          <Tab
            label="Aceptadas"
            value="Aceptada"
            className={classes.tabHover}
            wrapped
          />
          <Tab
            label="Canceladas"
            value="Cancelada"
            className={classes.tabHover}
            wrapped
          />
          <Tab
            label="Finalizadas"
            value="Finalizada"
            className={classes.tabHover}
            wrapped
          />
        </Tabs>

        <HiringList
          contrataciones={slicedContrataciones}
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

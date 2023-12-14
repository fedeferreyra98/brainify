import React, { useEffect, useState } from 'react';
import {
  Typography,
  Container,
  Button,
  Grid,
  ListItemIcon,
  Box,
} from '@mui/material';
import { Class, Comment, Group, Book } from '@mui/icons-material';
import makeStyles from '@mui/styles/makeStyles';
import { useNavigate } from 'react-router-dom';
import ServiceCard from './ServiceCard';
import ServiceDetails from '../ServiceExplorer/ServiceDetails';
import TopComments from './TopComments';
import {
  apiGetTop3Services,
  apiGetTop3CommentsByServiceId,
} from '../../api/apiService';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#DDEBF8',
  },
  mainContent: {
    padding: theme.spacing(5),
    textAlign: 'center',
    backgroundColor: '#DDEBF8',
  },
  footer: {
    marginTop: theme.spacing(5),
    padding: theme.spacing(3),
    backgroundColor: '#f5f5f5',
  },
  media: {
    height: 140,
  },
  card: {
    maxWidth: 345,
    transition: 'transform 0.2s', // Animación suave al hacer hover
    '&:hover': {
      transform: 'scale(1.05)', // Aumenta ligeramente el tamaño al hacer hover
      cursor: 'pointer', // Cambia el cursor a "pointer" al hacer hover
    },
  },
  section: {
    margin: theme.spacing(5, 0),
    padding: theme.spacing(3, 0),
    borderBottom: '1px solid #e0e0e0', // Agrega un borde inferior a cada sección
  },
  sectionTitle: {
    marginBottom: theme.spacing(3),
  },
}));

function LandingPage() {
  const classes = useStyles();
  const [selectedService, setSelectedService] = useState(null);

  // Obtener los top 3 comentarios basados en el rating
  const [topComments, setTopComments] = useState([]);

  const navigate = useNavigate();

  const [topServices, setTopServices] = useState([]);

  // Obtener servicios de la API
  useEffect(() => {
    const fetchServicesAndTheirTopComments = async () => {
      try {
        // Obtener servicios
        const servicesResponse = await apiGetTop3Services();
        const publishedServices = servicesResponse.filter(
          (service) => service.isPublished
        );
        setTopServices(publishedServices);
        // Preparar un array para almacenar todos los top comentarios
        let allTopComments = [];

        // Obtener comentarios para cada servicio
        // eslint-disable-next-line no-restricted-syntax
        for (const service of publishedServices) {
          try {
            // eslint-disable-next-line no-await-in-loop
            const commentsResponse = await apiGetTop3CommentsByServiceId(
              // eslint-disable-next-line no-underscore-dangle
              service._id
            );
            allTopComments = [...allTopComments, ...commentsResponse.comments];
          } catch (error) {
            console.log(
              // eslint-disable-next-line no-underscore-dangle
              `Error getting comments for service ${service._id}`
            );
          }
        }

        // Ordenar todos los comentarios obtenidos y tomar los top 3
        const sortedtopComments = allTopComments
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 3);
        setTopComments(sortedtopComments);
      } catch (error) {
        console.log('Error getting services:', error);
      }
    };

    fetchServicesAndTheirTopComments();
  }, []);

  return (
    <div className={classes.root}>
      <Container className={classes.mainContent}>
        <div className={classes.section}>
          <Typography
            variant="h3"
            gutterBottom
            className={classes.sectionTitle}
          >
            ¡Descubre, Aprende, Crece!
          </Typography>
          <Typography variant="h5" paragraph>
            Bienvenido a Brainify, tu puerta de entrada a un mundo de
            oportunidades y aprendizaje
          </Typography>

          <Grid container spacing={5}>
            <Grid item xs={12} md={6}>
              <Box display="flex" alignItems="left">
                <ListItemIcon>
                  <Class />
                </ListItemIcon>
                <Typography>
                  Explora y reserva clases en una amplia gama de temas
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box display="flex" alignItems="right">
                <ListItemIcon>
                  <Comment />
                </ListItemIcon>
                <Typography>
                  Lee y comparte opiniones sobre diferentes servicios
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box display="flex" alignItems="left">
                <ListItemIcon>
                  <Group />
                </ListItemIcon>
                <Typography>
                  Conéctate con expertos y profesionales en áreas de tu interés
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box display="flex" alignItems="right">
                <ListItemIcon>
                  <Book />
                </ListItemIcon>
                <Typography>
                  Accede a recursos y materiales para mejorar tus habilidades
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </div>
        <div className={classes.section}>
          <Typography
            variant="h5"
            gutterBottom
            className={classes.sectionTitle}
          >
            Echa un vistazo a algunos de nuestros servicios más populares
          </Typography>
          <Grid container spacing={3}>
            {topServices.map((servicio) => (
              <ServiceCard
                // eslint-disable-next-line no-underscore-dangle
                key={servicio._id}
                service={servicio}
                onClick={setSelectedService}
              />
            ))}
          </Grid>
        </div>
        <div className={classes.section}>
          <Typography
            variant="h5"
            gutterBottom
            className={classes.sectionTitle}
          >
            Experiencias de usuarios
          </Typography>
          <TopComments comments={topComments} classes={classes} />
        </div>
        <Typography variant="h6" paragraph>
          ¿Listo para explorar?
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => navigate('/explorar-servicios')}
        >
          ¡Empieza Ahora!
        </Button>
      </Container>
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Brainify
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary">
          Contacto: info@brainify.com
        </Typography>
      </footer>

      {/* Mostrar detalles del servicio seleccionado */}
      {selectedService && ( // Mostrar solo si hay un servicio seleccionado
        <ServiceDetails
          service={selectedService}
          onClose={() => setSelectedService(null)}
        />
      )}
    </div>
  );
}

export default LandingPage;

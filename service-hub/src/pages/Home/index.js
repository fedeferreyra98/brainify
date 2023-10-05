import React, { useState } from 'react';
import {
  Typography,
  Container,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Rating,
  ListItemIcon,
  Box,
} from '@mui/material';
import { Class, Comment, Group, Book } from '@mui/icons-material';
import makeStyles from '@mui/styles/makeStyles';
import mockServices from '../../data/mockServices';
import mockComments from '../../data/mockComments';
import ServiceDetails from '../../components/ServiceDetails';

const useStyles = makeStyles((theme) => ({
  root: {
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

  // Función para calcular el rating promedio de un servicio
  const getAverageRating = (serviceName) => {
    const commentsForService = mockComments.filter(
      (comment) => comment.serviceName === serviceName
    );
    if (commentsForService.length === 0) return 0; // Si no hay comentarios, retornar 0

    const totalRating = commentsForService.reduce(
      (acc, comment) => acc + comment.rating,
      0
    );
    return totalRating / commentsForService.length;
  };

  // Obtener los top 3 comentarios basados en el rating
  const topComments = [...mockComments]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

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
            oportunidades y aprendizaje.
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
            {mockServices.slice(0, 3).map((service) => (
              <Grid item xs={12} sm={4} key={service.id}>
                <Card
                  className={classes.card}
                  onClick={() => setSelectedService(service)}
                >
                  <CardMedia
                    className={classes.media}
                    image={service.image}
                    title={service.nombre}
                  />
                  <CardContent>
                    <Typography variant="h6" component="div">
                      {service.nombre}
                    </Typography>
                    <Rating
                      value={getAverageRating(service.nombre)}
                      readOnly
                      size="small"
                      precision={0.1}
                    />
                    <Typography variant="body2" component="span">
                      {getAverageRating(service.nombre).toFixed(1)}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
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
          <Grid container spacing={3}>
            {topComments.map((comment) => (
              <Grid item xs={12} sm={4} key={comment.id}>
                <Card className={classes.card}>
                  <CardContent>
                    <Typography variant="h6" component="div">
                      {comment.user}
                    </Typography>
                    <Rating
                      value={comment.rating}
                      readOnly
                      size="small"
                      precision={0.1}
                    />
                    <Typography variant="body2" component="span">
                      {comment.rating.toFixed(1)}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
        <Typography variant="h6" paragraph>
          ¿Listo para explorar?
        </Typography>
        <Button variant="contained" color="primary" size="large">
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

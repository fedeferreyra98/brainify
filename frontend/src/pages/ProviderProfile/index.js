/* eslint-disable no-unused-vars */
import React, { useState, useCallback, useContext, useEffect } from 'react';
import {
  Button,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Rating,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import NotificationGreen from '../../components/ui/NotificationGreen';
import NotificationRed from '../../components/ui/NotificationRed';
import ImageUploadModal from '../../components/form/ImageUploadModal';
import EditProfileForm from '../../components/form/EditProfileForm';
import {
  apiUpdateUser,
  apiUpdateUserProfileImage,
  apiGetAllCommentsByUser,
  apiGetServicesByUser,
} from '../../api/apiService';
import { AuthContext } from '../../components/auth/AuthContext';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
    backgroundColor: '#DDEBF8',
  },
  button: {
    margin: theme.spacing(1),
  },
  card: {
    marginTop: theme.spacing(2),
  },
  section: {
    margin: theme.spacing(5, 0),
    padding: theme.spacing(3, 0),
    borderBottom: '1px solid #e0e0e0', // Agrega un borde inferior a cada sección
  },
  sectionTitle: {
    marginBottom: theme.spacing(3),
  },
  footer: {
    marginTop: theme.spacing(5),
    padding: theme.spacing(3),
    backgroundColor: '#f5f5f5',
  },
}));

function ProviderProfile() {
  const classes = useStyles();
  const { session, setSession } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdatingImage, setIsUpdatingImage] = useState(false);
  const [formData, setFormData] = useState({
    firstName: session.firstName || '',
    lastName: session.lastName || '',
    email: session.email || '',
    phoneNumber: session.phoneNumber || '',
    degree: session.degree || '',
    experience: session.experience || '',
  });
  const handleImageSelected = useCallback((file) => {
    setSelectedImage(file);
  }, []);

  const [greenNotificationOpen, setGreenNotificationOpen] = useState(false);
  const [greenNotificationMessage, setGreenNotificationMessage] = useState('');
  const [redNotificationOpen, setRedNotificationOpen] = useState(false);
  const [redNotificationMessage, setRedNotificationMessage] = useState('');

  const handleProfileUpdate = async (values, actions) => {
    try {
      const response = await apiUpdateUser(values);
      setGreenNotificationMessage('Información actualizada correctamente');
      setGreenNotificationOpen(true);
      console.log(response);
      setSession({ ...session, ...values });
    } catch (error) {
      console.error('Error al actualizar la información del usuario:', error);
      setRedNotificationMessage('Error al actualizar la información');
      setRedNotificationOpen(true);
    } finally {
      actions.setSubmitting(false);
      setIsEditing(false);
    }
  };

  const handleImageUpload = async () => {
    if (!selectedImage) {
      setRedNotificationMessage('No se ha seleccionado ninguna imagen');
      setRedNotificationOpen(true);
    }
    setIsUpdatingImage(true);
    try {
      const response = await apiUpdateUserProfileImage(selectedImage);
      setSession((prev) => ({ ...prev, profileImg: response.user.profileImg }));
      setGreenNotificationMessage('Imagen de perfil actualizada correctamente');
      setGreenNotificationOpen(true);
    } catch (error) {
      console.error('Error al actualizar la imagen de perfil:', error);
      setRedNotificationMessage('Error al actualizar la imagen de perfil');
      setRedNotificationOpen(true);
    }
    setSelectedImage(null);
    setIsUpdatingImage(false);
    setIsModalOpen(false);
  };

  const [topCommentsByUser, setTopCommentsByUser] = useState([]);
  const [servicesByUser, setServicesByUser] = useState([]);

  // Obtener comentarios y servicios de la API
  useEffect(() => {
    const fetchCommentsAndServices = async () => {
      try {
        // Obtener comentarios
        const commentsResponse = await apiGetAllCommentsByUser(session.id);
        // Obtener servicios
        const servicesResponse = await apiGetServicesByUser();

        const servicesById = servicesResponse.reduce((acc, service) => {
          // eslint-disable-next-line no-underscore-dangle
          acc[service._id] = service.name; // asumiendo que 'name' es el campo que contiene el nombre del servicio
          return acc;
        }, {});

        // Enriquecer los comentarios con el nombre del servicio
        const enrichedComments = commentsResponse.comments
          .filter((comment) => !comment.isBlocked)
          .map((comment) => {
            return {
              ...comment,
              serviceName: servicesById[comment.serviceId], // Añadir el nombre del servicio
            };
          })
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 6);

        setTopCommentsByUser(enrichedComments);
      } catch (error) {
        console.log('Error getting comments or services:', error);
      }
    };

    fetchCommentsAndServices();
  }, [session.id]);

  return (
    <Container className={classes.root}>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Mi Perfil
        </Typography>
      </Box>

      <Grid container spacing={2} alignItems="center" sx={{ pl: 3, pb: 1 }}>
        <Grid item xs={12}>
          <Typography variant="h5">{`${session.firstName} ${session.lastName}`}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1">{session.degree}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle2">{`E-mail: ${session.email}`}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="string">{`Tel: ${session.phoneNumber}`}</Typography>
        </Grid>
      </Grid>

      <Grid container spacing={2} alignItems="center" sx={{ px: 3, pb: 2 }}>
        <Grid item xs={12}>
          <Card className={classes.card}>
            <CardContent>
              <Typography variant="h6">Experiencia:</Typography>
              <Typography variant="body2">{session.experience}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            onClick={() => setIsEditing(true)}
          >
            Editar Perfil
          </Button>
        </Grid>
      </Grid>
      <div className={classes.section}>
        <Typography
          variant="h4"
          gutterBottom
          className={classes.sectionTitle}
          align="center"
        >
          Mejores Comentarios
        </Typography>
        <Grid container spacing={3}>
          {topCommentsByUser.length === 0 ? (
            <Grid
              item
              m={2}
              xs={12}
              style={{ display: 'flex' }}
              alignItems="center"
              justifyContent="center"
            >
              <Typography variant="h6">
                Aun no tienes ningún comentario en tus servicios
              </Typography>
            </Grid>
          ) : (
            topCommentsByUser.map((comment) => (
              <Grid
                item
                xs={12}
                sm={4}
                // eslint-disable-next-line no-underscore-dangle
                key={comment._id}
                style={{ display: 'flex' }}
              >
                <Card className={classes.card} style={{ width: '100%' }}>
                  <CardContent>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Typography variant="h5" component="div">
                          {comment.serviceName}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="h12" component="div">
                          {comment.content}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Rating
                          value={comment.rating}
                          readOnly
                          size="small"
                          precision={0.1}
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      </div>
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Brainify
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary">
          Contacto: info@brainify.com
        </Typography>
      </footer>
      <EditProfileForm
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        initialFormData={formData}
        handleSubmit={(values, actions) => {
          handleProfileUpdate(values, actions);
        }}
      />

      <ImageUploadModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedImage(null);
        }}
        isUpdatingImage={isUpdatingImage}
        onSubmit={handleImageUpload}
        onImageSelected={handleImageSelected}
      />
      <NotificationGreen
        open={greenNotificationOpen}
        message={greenNotificationMessage}
        onClose={() => setGreenNotificationOpen(false)}
      />
      <NotificationRed
        open={redNotificationOpen}
        message={redNotificationMessage}
        onClose={() => setRedNotificationOpen(false)}
      />
    </Container>
  );
}

export default ProviderProfile;

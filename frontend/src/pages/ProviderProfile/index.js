/* eslint-disable no-unused-vars */
import React, { useState, useCallback, useContext } from 'react';
import {
  Button,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Rating,
  Dialog,
} from '@mui/material';

import makeStyles from '@mui/styles/makeStyles';

import mockComments from '../../data/mockComments';
import NotificationGreen from '../../components/ui/NotificationGreen';
import NotificationRed from '../../components/ui/NotificationRed';
import ImageUploadModal from '../../components/form/ImageUploadModal';
import EditableAvatar from './EditableAvatar';
import EditProfileForm from '../../components/form/EditProfileForm';
import { apiUpdateUser, apiUpdateUserProfileImage } from '../../api/apiService';

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

  const topComments = [...mockComments]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 6);

  return (
    <Container className={classes.root}>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Mi Perfil
        </Typography>
      </Box>

      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={4} md={3}>
          <Grid
            container
            spacing={2}
            direction="column"
            alignItems="center"
            justifyContent="center"
          >
            <Grid item xs={12}>
              <EditableAvatar
                src={session.profileImg}
                onEdit={() => setIsModalOpen(true)}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={8} md={9}>
          <Typography variant="h5">{`${session.firstName} ${session.lastName}`}</Typography>
          <Typography variant="subtitle1">{session.degree}</Typography>
          <Typography variant="subtitle2">{`E-mail: ${session.email}`}</Typography>
          <Typography variant="string">{`Tel: ${session.phoneNumber}`}</Typography>
        </Grid>
      </Grid>

      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h6">Experiencia:</Typography>
          <Typography variant="body2">{session.experience}</Typography>
        </CardContent>
      </Card>
      <Grid container spacing={2}>
        <Grid item>
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
          {topComments.map((comment) => (
            <Grid item xs={12} sm={4} key={comment.id}>
              <Card className={classes.card}>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {comment.serviceName}
                  </Typography>
                  <Typography variant="h12" component="div">
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

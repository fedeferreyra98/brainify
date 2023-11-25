import React, { useState } from 'react';
import {
  Button,
  Container,
  Typography,
  Grid,
  Avatar,
  Card,
  CardContent,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  Rating,
} from '@mui/material';
import { styled } from '@mui/material/styles';

import makeStyles from '@mui/styles/makeStyles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import mockProvider from '../../data/mockProvider';
import mockComments from '../../data/mockComments';
import NotificationGreen from '../../components/ui/NotificationGreen';

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
  largeAvatar: {
    width: theme.spacing(10),
    height: theme.spacing(10),
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
  const [isEditing, setIsEditing] = useState(false);
  const [providerInfo, setProviderInfo] = useState(mockProvider); // Variable de estado para la información del proveedor
  const [updatedProvider, setUpdatedProvider] = useState(mockProvider);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedProvider((prev) => ({ ...prev, [name]: value }));
  };

  const [notificationOpen, setNotificationOpen] = useState(false);

  const handleSave = () => {
    setProviderInfo(updatedProvider); // Actualizar la información del proveedor
    setIsEditing(false);
    setNotificationOpen(true); // Mostrar la notificación
  };

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

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
              <Avatar
                alt={`${providerInfo.firstName} ${providerInfo.lastName}`}
                src={providerInfo.profileImage}
                className={classes.largeAvatar}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                component="label"
                variant="contained"
                startIcon={<CloudUploadIcon />}
              >
                Subir Foto
                <VisuallyHiddenInput type="file" />
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={8} md={9}>
          <Typography variant="h5">{`${providerInfo.firstName} ${providerInfo.lastName}`}</Typography>
          <Typography variant="subtitle1">{providerInfo.title}</Typography>
          <Typography variant="subtitle2">{`E-mail: ${providerInfo.email}`}</Typography>
          <Typography variant="string">{`Tel: ${providerInfo.phoneNumber}`}</Typography>
        </Grid>
      </Grid>

      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h6">Experiencia:</Typography>
          <Typography variant="body2">{providerInfo.experience}</Typography>
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
            Editar Información
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
      {/* Formulario de edición */}
      <Dialog open={isEditing} onClose={() => setIsEditing(false)}>
        <DialogTitle>Editar Perfil</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Nombre"
            type="text"
            fullWidth
            variant="outlined"
            value={updatedProvider.firstName}
            name="firstName"
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Apellido"
            type="text"
            fullWidth
            variant="outlined"
            value={updatedProvider.lastName}
            name="lastName"
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Mail"
            type="text"
            fullWidth
            variant="outlined"
            value={updatedProvider.email}
            name="mail"
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Nro Télefono"
            type="text"
            fullWidth
            variant="outlined"
            value={updatedProvider.phoneNumber}
            name="phoneNumber"
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Título"
            type="text"
            fullWidth
            variant="outlined"
            value={updatedProvider.title}
            name="title"
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Experiencia"
            type="text"
            fullWidth
            variant="outlined"
            multiline
            rows={4} // Aquí especificas cuántas líneas quieres que se muestren
            value={updatedProvider.experience}
            name="experience"
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsEditing(false)} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleSave} color="primary">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
      <NotificationGreen
        open={notificationOpen}
        message="Información actualizada"
        onClose={() => setNotificationOpen(false)}
      />
    </Container>
  );
}

export default ProviderProfile;

import React, { useState } from 'react';
import {
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Rating,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import NotificationGreen from '../../components/ui/NotificationGreen';
import NotificationRed from '../../components/ui/NotificationRed';
import { apiCreateComment } from '../../api/apiService';
import ContratacionForm from './ContratacionForm';

function ServiceCard({ service, onClick, validation, send }) {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mainComment, setMainComment] = useState('');
  const [commentRating, setRating] = useState(5); // [1, 5]
  const [openCommentForm, setOpenCommentForm] = useState(false);

  const [notificationRedOpen, setNotificationRedOpen] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [notificationRedMessage, setNotificationRedMessage] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [notificationGreenOpen, setNotificationGreenOpen] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [notificationGreenMessage, setNotificationGreenMessage] = useState('');

  // Estado para controlar el diálogo de contratación
  const [openDialog, setDialogOpen] = useState(false);

  const handleHireClick = () => {
    setDialogOpen(true);
  };

  const handleCloseHiringForm = () => {
    setDialogOpen(false);
  };

  const handleCommentClick = () => {
    setOpenCommentForm(true);
  };

  const handleCloseCommentForm = () => {
    setOpenCommentForm(false);
  };

  // Función para resetear el formulario de comentario
  const resetFormCmment = () => {
    setName('');
    setLastName('');
    setMainComment('');
    setRating(5);
  };

  const handleSendComment = async () => {
    try {
      console.log(service);
      const response = await apiCreateComment({
        // eslint-disable-next-line no-underscore-dangle
        serviceId: service._id,
        content: mainComment,
        rating: commentRating,
      });
      if (response) {
        if (validation) {
          send(false);
        } else {
          send(true);
        }
        resetFormCmment();
        setOpenCommentForm(false);
        setNotificationRedOpen(true);
      }
    } catch (error) {
      console.error(error);
      setOpenCommentForm(false);
      setNotificationRedOpen(true);
    }
  };

  const canSubmit = name && lastName;

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h5" marginBottom={1} marginTop={1}>
                {service.name}
              </Typography>
              <Rating value={service.averageRating} readOnly precision={0.5} />
            </Grid>
            <Grid item xs={12}>
              <img
                src="https://masqueclases.es/wp-content/uploads/2021/08/Global-Online-Education.jpg"
                style={{
                  width: '100%',
                  height: '20vh',
                  objectFit: 'cover',
                }}
                alt="Product"
              />
            </Grid>
          </Grid>
        </CardContent>

        <CardActions style={{ justifyContent: 'center' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={4}>
              <Button
                size="small"
                color="primary"
                onClick={() => onClick(service)}
              >
                Ver más
              </Button>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Button size="small" color="secondary" onClick={handleHireClick}>
                Contratar
              </Button>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Button size="small" onClick={handleCommentClick}>
                Comentar
              </Button>
            </Grid>
          </Grid>
        </CardActions>

        <Dialog open={openCommentForm} onClose={handleCloseCommentForm}>
          <DialogTitle>Comentar</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              label="Nombre"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              margin="dense"
              label="Apellido"
              fullWidth
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <Typography>Rating:</Typography>
            <Rating
              name="hover-feedback"
              value={commentRating}
              precision={0.5}
              onChange={(e) => setRating(e.target.value)}
            />
            <TextField
              margin="dense"
              label="Comentario Principal"
              fullWidth
              value={mainComment}
              onChange={(e) => setMainComment(e.target.value)}
            />
            <TextField
              margin="dense"
              label="Comentario Secundario"
              fullWidth
              multiline
              rows={4}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseCommentForm} color="primary">
              Cancelar
            </Button>
            <Button
              onClick={handleSendComment}
              color="primary"
              disabled={!canSubmit}
            >
              Enviar
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={openDialog} onClose={handleCloseHiringForm}>
          <DialogTitle>Contratar Servicio</DialogTitle>
          <ContratacionForm
            // eslint-disable-next-line no-underscore-dangle
            selectedService={service._id}
            dialogOpen={openDialog}
            closeHiringForm={handleCloseHiringForm}
          />
        </Dialog>

        <NotificationRed
          open={notificationRedOpen}
          message={notificationRedMessage}
          onClose={() => setNotificationRedOpen(false)}
        />
        <NotificationGreen
          open={notificationGreenOpen}
          message={notificationGreenMessage}
          onClose={() => notificationGreenOpen(false)}
        />
      </Card>
    </Grid>
  );
}

export default ServiceCard;

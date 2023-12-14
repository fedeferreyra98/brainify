/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
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
} from '@mui/material';
import NotificationGreen from '../../components/ui/NotificationGreen';
import NotificationRed from '../../components/ui/NotificationRed';
import { apiCreateComment } from '../../api/apiService';
import ContratacionForm from './ContratacionForm';
import CommentForm from '../../components/form/CommentForm';

function ServiceCard({ service, onClick, validation, send }) {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mainComment, setMainComment] = useState('');
  const [commentRating, setRating] = useState(5); // [1, 5]
  const [openCommentForm, setOpenCommentForm] = useState(false);

  const [notificationRedOpen, setNotificationRedOpen] = useState(false);
  const [notificationRedMessage, setNotificationRedMessage] = useState('');
  const [notificationGreenOpen, setNotificationGreenOpen] = useState(false);
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
          <CommentForm
            serviceId={service._id}
            handleCloseCommentForm={handleCloseCommentForm}
          />
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

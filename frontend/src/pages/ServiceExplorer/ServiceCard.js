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
import HiringForm from '../../components/form/HiringForm';
import CommentForm from '../../components/form/CommentForm';

function ServiceCard({
  service,
  onClick,
  validation,
  send,
  setNotificationRedOpen,
  setNotificationRedMessage,
  setNotificationGreenOpen,
  setNotificationGreenMessage,
}) {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mainComment, setMainComment] = useState('');
  const [commentRating, setRating] = useState(5); // [1, 5]
  const [openCommentForm, setOpenCommentForm] = useState(false);

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
    <Grid item xs={12} sm={6} md={4} style={{ display: 'flex' }}>
      <Card style={{ width: '100%' }}>
        <CardContent
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center', // Centra verticalmente
            height: '100%', // Asegúrate de que CardContent tenga altura completa
            alignItems: 'flex-end',
          }}
        >
          {' '}
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h5" marginBottom={1} marginTop={1}>
                {service.name}
              </Typography>
              <Rating value={service.averageRating} readOnly precision={0.5} />
            </Grid>
            <Grid item xs={12}>
              <img
                src={service.imageUrl}
                style={{
                  width: '100%',
                  height: '20vh',
                  objectFit: 'cover',
                }}
                alt="Product"
              />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <CardActions style={{ justifyContent: 'center' }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={6}>
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => onClick(service)}
                  >
                    Ver más
                  </Button>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <Button size="small" onClick={handleCommentClick}>
                    Comentar
                  </Button>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <Button
                    size="small"
                    color="primary"
                    variant="contained"
                    onClick={handleHireClick}
                  >
                    Contratar
                  </Button>
                </Grid>
              </Grid>
            </CardActions>
          </Grid>
        </CardContent>

        <Dialog open={openCommentForm} onClose={handleCloseCommentForm}>
          <CommentForm
            serviceId={service._id}
            handleCloseCommentForm={handleCloseCommentForm}
            setNotificationGreenOpen={setNotificationGreenOpen}
            setNotificationGreenMessage={setNotificationGreenMessage}
            setNotificationRedOpen={setNotificationRedOpen}
            setNotificationRedMessage={setNotificationRedMessage}
          />
        </Dialog>

        <Dialog open={openDialog} onClose={handleCloseHiringForm}>
          <DialogTitle>Contratar Servicio</DialogTitle>
          <HiringForm
            // eslint-disable-next-line no-underscore-dangle
            selectedServiceId={service._id}
            closeHiringForm={handleCloseHiringForm}
            setNotificationGreenMessage={setNotificationGreenMessage}
            setNotificationGreenOpen={setNotificationGreenOpen}
            setNotificationRedMessage={setNotificationRedMessage}
            setNotificationRedOpen={setNotificationRedOpen}
          />
        </Dialog>
      </Card>
    </Grid>
  );
}

export default ServiceCard;

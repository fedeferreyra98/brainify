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
import ContratacionForm from '../ServiceExplorer/ContratacionForm';

function ServiceCard({ service, onClick, validation, send }) {
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
            <Grid item xs={12}>
              <CardActions style={{ justifyContent: 'center' }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={12}>
                    <Button
                      size="small"
                      color="primary"
                      onClick={() => onClick(service)}
                    >
                      Ver más
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12}>
                    <Button
                      size="medium"
                      color="primary"
                      onClick={handleHireClick}
                      variant="contained"
                    >
                      Contratar
                    </Button>
                  </Grid>
                </Grid>
              </CardActions>
            </Grid>
          </Grid>
        </CardContent>

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

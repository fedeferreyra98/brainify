import React from 'react';
import {
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Rating,
} from '@mui/material';
import mockComments from '../data/mockComments';

function ServiceCard({ service, onClick, onHire }) {
  // Calculate average rating for the service
  const serviceComments = mockComments.filter(
    (comment) => comment.serviceName === service.nombre
  );
  const averageRating =
    serviceComments.reduce((acc, comment) => acc + comment.rating, 0) /
    serviceComments.length;

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card>
        <CardContent>
          <Typography variant="h6">{service.nombre}</Typography>
          <Typography color="textSecondary">{service.proveedor}</Typography>
          <Rating value={averageRating} readOnly precision={0.5} />
        </CardContent>
        <CardActions>
          <Button size="small" color="primary" onClick={() => onClick(service)}>
            Ver más
          </Button>
          <Button size="small" color="secondary" onClick={onHire}>
            Contratar
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}

export default ServiceCard;

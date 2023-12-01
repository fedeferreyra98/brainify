/* eslint-disable no-underscore-dangle */
import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  IconButton,
  Grid,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

function ServiceCard({ service, onEdit, onDelete, classes }) {
  console.log(service);
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h6">{service.name}</Typography>
        <Typography variant="body2">
          Duración: {service.duration} horas
        </Typography>
        <Typography variant="body2">Costo: $ {service.cost}</Typography>
      </CardContent>
      <CardActions>
        <Grid container spacing={2} justifyContent="center" margin-left={16}>
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
          <Grid item xs={4}>
            <IconButton onClick={() => onEdit(service)}>
              <EditIcon />
            </IconButton>
          </Grid>

          <Grid item xs={4}>
            {/*             eslint-disable-next-line no-underscore-dangle
             */}{' '}
            <IconButton
              onClick={() => {
                onDelete(service._id);
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Grid>

          <FormControlLabel
            control={
              <Checkbox
                // checked={publicado}
                // onChange={handlePublish}
                name="publushCheckbox"
              />
            }
            label="Publicar"
            style={{
              margin: '8px 0',
              height: '56px', // Ajusta la altura para que coincida con el dropdown
              display: 'flex',
              alignItems: 'center', // Asegúrate de que el contenido esté centrado verticalmente
            }}
          />
        </Grid>
      </CardActions>
    </Card>
  );
}

export default ServiceCard;

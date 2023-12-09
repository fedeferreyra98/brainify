import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  MenuItem,
  Grid,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';

function HiringList({ contrataciones, handleEstadoChange, classes }) {
  return (
    <Grid container spacing={3}>
      {contrataciones.map((contratacion) => (
        <Grid item xs={12} sm={6} md={4} key={contratacion.id}>
          <Card className={classes.card}>
            <CardContent>
              <Typography variant="h6">{contratacion.servicio}</Typography>
              <Typography color="textSecondary">
                {`E-mail: ${contratacion.contactEmail}`}
              </Typography>
              <Typography color="textSecondary">
                {`Tel: ${contratacion.phoneNumber}`}
              </Typography>
              <Typography color="textSecondary">
                {`Horario de contacto: ${contratacion.preferredContactTime}`}
              </Typography>
            </CardContent>
            <FormControl
              fullWidth
              variant="outlined"
              size="small"
              style={{ marginTop: '10px' }}
            >
              <InputLabel id={`select-label-${contratacion.contractStatus}`}>
                Estado
              </InputLabel>
              <Select
                labelId={`select-label-${contratacion.contractStatus}`}
                value={contratacion.contractStatus}
                onChange={(event) =>
                  // eslint-disable-next-line no-underscore-dangle
                  handleEstadoChange(contratacion._id, event.target.value)
                }
                label="Estado"
              >
                <MenuItem value="Solicitada">Solicitada</MenuItem>
                <MenuItem value="Aceptada">Aceptada</MenuItem>
                <MenuItem value="Cancelada">Cancelada</MenuItem>
                <MenuItem value="Finalizada">Finalizada</MenuItem>
              </Select>
            </FormControl>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default HiringList;

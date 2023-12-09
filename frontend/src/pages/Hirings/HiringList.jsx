import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  MenuItem,
  Grid,
  FormControl,
  InputLabel,
  Select,
  Box, // import Box for styling non-Grid message
} from '@mui/material';
import { apiGetServicesByUser } from '../../api/apiService';

function HiringList({ contrataciones, handleEstadoChange, classes }) {
  const [userServices, setUserServices] = useState([]);

  useEffect(() => {
    const getServiceName = async () => {
      try {
        if (contrataciones && contrataciones.length > 0) {
          const response = await apiGetServicesByUser();

          const serviceIdToNameMap = new Map();
          response.forEach((service) => {
            // eslint-disable-next-line no-underscore-dangle
            serviceIdToNameMap.set(service._id, service.name);
          });

          const updatedContrataciones = contrataciones.map((contratacion) => ({
            ...contratacion,
            serviceName: serviceIdToNameMap.get(contratacion.serviceId),
          }));

          setUserServices(updatedContrataciones);
        } else {
          // Set an empty array if there are no contracts to prevent undefined errors.
          setUserServices([]);
        }
      } catch (error) {
        console.log('Error getting comments info:', error);
      }
    };

    getServiceName();
  }, [contrataciones]);

  // Display a message if there are no contracts
  if (userServices.length === 0) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="200px"
      >
        <Typography variant="h5">No hay contrataciones para mostrar</Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={3}>
      {userServices.map((contratacion) => (
        <Grid item xs={12} sm={6} md={4} key={contratacion.id}>
          <Card className={classes.card}>
            <CardContent>
              <Typography variant="h6">
                {contratacion.serviceName || 'Loading...'}
              </Typography>
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

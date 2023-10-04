import React, { useState } from 'react';
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Select,
  MenuItem,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  button: {
    margin: theme.spacing(1),
  },
  list: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  mainContent: {
    padding: theme.spacing(5),
    textAlign: 'center',
  },
  footer: {
    marginTop: theme.spacing(5),
    padding: theme.spacing(3),
    backgroundColor: '#f5f5f5',
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
}));

function Hirings() {
  const classes = useStyles();

  // Estado inicial para las contrataciones
  const [contrataciones, setContrataciones] = useState([
    {
      id: 1,
      servicio: 'Clase de Matemáticas',
      usuario: 'Juan Pérez',
      numeroTelefonico: '1544054552',
      horarioContacto: '10:30-18:00',
      estado: 'solicitada',
    },
    {
      id: 2,
      servicio: 'Clase de Aleman',
      usuario: 'Benjamin Fernandez',
      numeroTelefonico: '1148766551',
      horarioContacto: '08:00-20:00',
      estado: 'aceptada',
    },
    // ... puedes agregar más contrataciones iniciales si lo deseas
  ]);

  // Función para cambiar el estado de una contratación
  const handleEstadoChange = (id, nuevoEstado) => {
    const updatedContrataciones = contrataciones.map((contratacion) => {
      if (contratacion.id === id) {
        return { ...contratacion, estado: nuevoEstado };
      }
      return contratacion;
    });
    setContrataciones(updatedContrataciones);
  };

  return (
    <div>
      <Container className={classes.root}>
        <Typography variant="h4" gutterBottom>
          Contrataciones
        </Typography>
        <List className={classes.list}>
          {contrataciones.map((contratacion) => (
            <ListItem key={contratacion.id} alignItems="flex-start">
              <ListItemText
                primary={contratacion.servicio}
                secondary={
                  <>
                    <Typography
                      component="span"
                      variant="body2"
                      color="textPrimary"
                    >
                      Usuario: {contratacion.usuario} <br />
                      Teléfono de contacto: {contratacion.numeroTelefonico}{' '}
                      <br />
                      Franja Horaria: {contratacion.horarioContacto}
                    </Typography>
                    <br />
                    {'Estado: '}
                    <Select
                      value={contratacion.estado}
                      onChange={(e) =>
                        handleEstadoChange(contratacion.id, e.target.value)
                      }
                    >
                      <MenuItem value="solicitada">Solicitada</MenuItem>
                      <MenuItem value="aceptada">Aceptada</MenuItem>
                      <MenuItem value="finalizada">Finalizada</MenuItem>
                    </Select>
                  </>
                }
              />
            </ListItem>
          ))}
        </List>
      </Container>
    </div>
  );
}

export default Hirings;

import React, { useEffect, useState } from 'react';
import {
  Dialog,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Card,
  CardContent,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Rating,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CategoryIcon from '@mui/icons-material/Category';
import ScheduleIcon from '@mui/icons-material/Schedule';
import TimerIcon from '@mui/icons-material/Timer';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ClassIcon from '@mui/icons-material/Class';
import useStyles from '../../styles/styles';
import {
  apiGetPublicUserData,
  apiGetAllCommentsByServiceId,
} from '../../api/apiService';

function ServiceDetails({ service, onClose }) {
  const classes = useStyles();
  const [providerInfo, setProviderInfo] = React.useState(null);

  useEffect(() => {
    if (service) {
      const fetchProviderInfo = async () => {
        try {
          const response = await apiGetPublicUserData(service.userId);
          setProviderInfo(response.publicProfile);
        } catch (error) {
          console.log('Error getting provider info:', error);
        }
      };
      fetchProviderInfo();
    }
  }, [service]);

  // Filter comments for the selected service
  const [serviceComments, setServiceComments] = useState([]);

  useEffect(() => {
    const getComments = async () => {
      try {
        if (service) {
          // eslint-disable-next-line no-underscore-dangle
          const response = await apiGetAllCommentsByServiceId(service._id);
          setServiceComments(response);
        }
      } catch (error) {
        console.log('Error getting comments info:', error);
      }
    };
    getComments();
  }, [service]);

  return (
    <Dialog open={!!service} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>{service?.name}</DialogTitle>
      <DialogContent>
        <List>
          <ListItem>
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText
              primary="Proveedor"
              secondary={
                providerInfo
                  ? `${providerInfo.firstName} ${providerInfo.lastName}`
                  : 'Cargando ...'
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem>
            <ListItemIcon>
              <CategoryIcon />
            </ListItemIcon>
            <ListItemText primary="Categoría" secondary={service?.category} />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem>
            <ListItemIcon>
              <ClassIcon />
            </ListItemIcon>
            <ListItemText primary="Tipo" secondary={service?.type} />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem>
            <ListItemIcon>
              <ScheduleIcon />
            </ListItemIcon>
            <ListItemText primary="Frecuencia" secondary={service?.frequency} />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem>
            <ListItemIcon>
              <TimerIcon />
            </ListItemIcon>
            <ListItemText
              primary="Duración"
              secondary={`${service?.duration} horas`}
            />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem>
            <ListItemIcon>
              <AttachMoneyIcon />
            </ListItemIcon>
            <ListItemText primary="Costo" secondary={`$ ${service?.cost}`} />
          </ListItem>
        </List>

        <Divider className={classes.commentCard} />

        {/* Display user comments and their ratings */}
        {serviceComments
          .filter((comment) => !comment.isBlocked) // Filtrar para pasar solo comentarios no bloqueados
          .map((comment) => (
            // eslint-disable-next-line no-underscore-dangle
            <Card key={comment._id} className={classes.commentCard}>
              <CardContent>
                <Typography variant="h6">{comment.user}</Typography>
                <Rating value={comment.rating} readOnly />
                <Typography variant="body1">{comment.content}</Typography>
                <Typography variant="body2">
                  {comment.secondaryComment}
                </Typography>
              </CardContent>
            </Card>
          ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ServiceDetails;

import React from 'react';
import {Container, Typography, List, ListItem, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  button: {
    margin: theme.spacing(1)
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
    color: 'inherit'
  }
}));

function Comments() {
  const classes = useStyles();

  return (
    <div>
      <Container className={classes.root}>
        <Typography variant='h4' gutterBottom>
          Comentarios
        </Typography>
        <List className={classes.list}>
          {/* Ejemplo de comentario */}
          <ListItem alignItems='flex-start'>
            <ListItemText
              primary='Usuario 1'
              secondary={
                <React.Fragment>
                  <Typography component='span' variant='body2' color='textPrimary'>
                    Excelente servicio!
                  </Typography>
                  {' — Estoy muy satisfecho con la clase que tomé.'}
                </React.Fragment>
              }
            />
          </ListItem>
          {/* Puedes agregar más comentarios de la misma manera */}
        </List>
      </Container>
    </div>
  );
}

export default Comments;
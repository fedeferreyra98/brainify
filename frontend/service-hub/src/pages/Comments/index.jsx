import React, { useState } from 'react';
import { Container, Typography, List, ListItem, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import NotificationGreen from '../../components/ui/NotificationGreen';
import CommentCard from './CommentCard';
import mockComments from '../../data/mockComments';

const useStyles = makeStyles((theme) => ({
  mainContent: {
    padding: theme.spacing(5),
    textAlign: 'left',
    backgroundColor: '#DDEBF8',
  },
  footer: {
    marginTop: theme.spacing(5),
    padding: theme.spacing(3),
    backgroundColor: '#f5f5f5',
  },
}));

function Comments() {
  const classes = useStyles();
  const [comments, setComments] = useState(mockComments);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handlePublish = (commentId) => {
    const updatedComments = comments.filter(
      (comment) => comment.id !== commentId
    );
    setComments(updatedComments);
    setSnackbarMessage('Comentario publicado');
    setOpenSnackbar(true);
    // Despues hay que agregar la logica de publicar el comentario, ahora solo desaparce de la pag (leido)
  };

  const handleDelete = (commentId) => {
    const updatedComments = comments.filter(
      (comment) => comment.id !== commentId
    );
    setComments(updatedComments);
    setSnackbarMessage('Comentario borrado');
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container className={classes.mainContent}>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Comentarios
        </Typography>
        <List>
          {comments.map((comment) => (
            <ListItem key={comment.id} disablePadding>
              <CommentCard
                comment={comment}
                onPublish={handlePublish}
                onDelete={handleDelete}
              />
            </ListItem>
          ))}
        </List>
      </Box>
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Brainify
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary">
          Contacto: info@brainify.com
        </Typography>
      </footer>
      <NotificationGreen
        open={openSnackbar}
        message={snackbarMessage}
        onClose={handleCloseSnackbar}
      />
    </Container>
  );
}

export default Comments;

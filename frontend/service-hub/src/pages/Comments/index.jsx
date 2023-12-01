import React, { useState, useEffect } from 'react';
import { Container, Typography, List, ListItem, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import NotificationGreen from '../../components/ui/NotificationGreen';
import CommentCard from './CommentCard';
import { apiGetAllCommentsByServiceId } from '../../api/apiService';

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

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // Filter comments for the selected service
  const [comments, setComments] = useState([]);
  const user = localStorage.getItem('user');

  useEffect(() => {
    const getComments = async () => {
      try {
        if (user) {
          const response = await apiGetAllCommentsByServiceId(
            JSON.parse(user).id
          );
          setComments(response);
        }
      } catch (error) {
        console.log('Error getting comments info:', error);
      }
    };
    getComments();
  }, [user]);

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

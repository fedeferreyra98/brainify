import React, { useState, useEffect } from 'react';
import { Container, Typography, List, ListItem, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import NotificationGreen from '../../components/ui/NotificationGreen';
import CommentCard from './CommentCard';
import {
  apiGetAllCommentsByUser,
  apiUpdateComment,
  apiDeleteComment,
} from '../../api/apiService';

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
          // eslint-disable-next-line no-underscore-dangle
          const userId = JSON.parse(user).id;
          const response = await apiGetAllCommentsByUser(userId);
          const blockedComments = response.comments.filter(
            (comment) => comment.isBlocked
          );
          setComments(blockedComments);
        }
      } catch (error) {
        console.log('Error getting comments info:', error);
      }
    };
    getComments();
  }, [user, openSnackbar]);

  const handlePublish = (commentId) => {
    const newCommentStatus = { isBlocked: false };
    apiUpdateComment(commentId, newCommentStatus);
    setSnackbarMessage('Comentario publicado');
    setOpenSnackbar(true);
    // Despues hay que agregar la logica de publicar el comentario, ahora solo desaparce de la pag (leido)
  };

  const handleDelete = (commentId) => {
    apiDeleteComment(commentId);
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
        {comments.length > 0 ? (
          <List>
            {comments.map((comment) => (
              // eslint-disable-next-line no-underscore-dangle
              <ListItem key={comment._id} disablePadding>
                <CommentCard
                  comment={comment}
                  onPublish={handlePublish}
                  onDelete={handleDelete}
                />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography>No hay comentarios para mostrar</Typography>
        )}
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

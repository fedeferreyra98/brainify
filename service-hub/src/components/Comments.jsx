import React, { useState } from 'react';
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Grid,
  Box,
  Card,
  CardContent,
  CardActions,
  Rating,
} from '@mui/material';
import NotificationGreen from './NotificationGreen';
import mockComments from '../data/mockComments';

function CommentActions({ onPublish, onDelete }) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={onPublish}
        >
          Publicar
        </Button>
      </Grid>
      <Grid item xs={12} md={6}>
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          onClick={onDelete}
        >
          Borrar
        </Button>
      </Grid>
    </Grid>
  );
}

function CommentCard({ comment, onPublish, onDelete }) {
  return (
    <Card sx={{ width: '100%', mb: 2 }}>
      <CardContent>
        <ListItemText
          primary={comment.user}
          secondary={
            <>
              <Typography
                component="span"
                variant="body2"
                color="textPrimary"
                sx={{ display: 'block', fontWeight: 'bold' }}
              >
                {comment.serviceName}
              </Typography>
              <Rating value={comment.rating} readOnly />
              <Typography
                component="span"
                variant="body2"
                color="textPrimary"
                sx={{ display: 'block' }}
              >
                {comment.comment}
              </Typography>
              {comment.secondaryComment}
            </>
          }
        />
      </CardContent>
      <CardActions>
        <CommentActions
          onPublish={() => onPublish(comment.id)}
          onDelete={() => onDelete(comment.id)}
        />
      </CardActions>
    </Card>
  );
}

function Comments() {
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
    <Container>
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
      <NotificationGreen
        open={openSnackbar}
        message={snackbarMessage}
        onClose={handleCloseSnackbar}
      />
    </Container>
  );
}

export default Comments;

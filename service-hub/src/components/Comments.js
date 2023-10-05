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
  Snackbar,
} from '@mui/material';

function Comments() {
  const [comments, setComments] = useState([
    {
      id: 1,
      user: 'Alejandro García Pérez',
      serviceName: 'Conferencia de Historia Moderna',
      comment: '¡Impresionante ponencia!',
      secondaryComment: 'La explicación del profesor fue clara y concisa.',
      rating: 5,
    },
    {
      id: 2,
      user: 'Emma Smith Johnson',
      serviceName: 'Taller de Ciencias Naturales',
      comment: 'Muy enriquecedor.',
      secondaryComment: 'Aprendí mucho en la charla de hoy.',
      rating: 4,
    },
    {
      id: 3,
      user: 'Maria Rossi Bianchi',
      serviceName: 'Seminario de Matemáticas Avanzadas',
      comment: '¡Gran contenido!',
      secondaryComment: 'La lección sobre historia fue fascinante.',
      rating: 5,
    },
    {
      id: 4,
      user: 'Ahmed Ali Khan',
      serviceName: 'Curso de Literatura Clásica',
      comment: '¡Bien hecho!',
      secondaryComment: 'La metodología de enseñanza es única.',
      rating: 4,
    },
    {
      id: 5,
      user: 'Sofia Rodriguez Fernandez',
      serviceName: 'Clase de Física Cuántica',
      comment: 'Muy informativo.',
      secondaryComment: 'La clase de ciencias superó mis expectativas.',
      rating: 3,
    },
    {
      id: 6,
      user: 'Olga Ivanova Petrovna',
      serviceName: 'Webinar de Tecnologías Emergentes',
      comment: 'Excelente interacción.',
      secondaryComment: 'Me gustó cómo el profesor involucró a la audiencia.',
      rating: 2,
    },
    {
      id: 7,
      user: 'Olga Ivanova Petrovna',
      serviceName: 'Taller de Escritura Creativa',
      comment: 'Contenido relevante.',
      secondaryComment: 'La lección sobre tecnología fue muy actual.',
      rating: 3,
    },
    {
      id: 8,
      user: 'Mia Nguyen Tran',
      serviceName: 'Conferencia de Filosofía Contemporánea',
      comment: 'Muy bien estructurado.',
      secondaryComment: 'La clase estuvo organizada y fluyó sin problemas.',
      rating: 4,
    },
    {
      id: 9,
      user: 'Luca Costa Silva',
      serviceName: 'Seminario de Psicología Positiva',
      comment: '¡Inspirador!',
      secondaryComment: 'La charla de motivación realmente me tocó.',
      rating: 5,
    },
    {
      id: 10,
      user: 'Priya Patel Sharma',
      serviceName: 'Curso de Biología Marina',
      comment: 'Gran uso de recursos.',
      secondaryComment: 'Las diapositivas y videos fueron muy útiles.',
      rating: 5,
    },
    {
      id: 11,
      user: 'Ivan Petrovich Sokolov',
      serviceName: 'Taller de Fotografía Digital',
      comment: 'Clase práctica.',
      secondaryComment: 'Me gustó la forma en que se llevó a cabo el taller.',
      rating: 4,
    },
    {
      id: 12,
      user: 'Isabella Santos Ferreira',
      serviceName: 'Conferencia de Diseño Gráfico',
      comment: '¡Muy recomendable!',
      secondaryComment:
        'Definitivamente asistiré a más clases de este profesor.',
      rating: 3,
    },
  ]);

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
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={() => handlePublish(comment.id)}
                      >
                        Publicar
                      </Button>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Button
                        variant="contained"
                        color="secondary"
                        fullWidth
                        onClick={() => handleDelete(comment.id)}
                      >
                        Borrar
                      </Button>
                    </Grid>
                  </Grid>
                </CardActions>
              </Card>
            </ListItem>
          ))}
        </List>
      </Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={1500}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        ContentProps={{
          style: { backgroundColor: 'green', color: 'white' },
        }}
      />
    </Container>
  );
}

export default Comments;

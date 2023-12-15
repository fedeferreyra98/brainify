import React from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import {
  Box,
  Button,
  DialogTitle,
  DialogContent,
  DialogActions,
  Rating,
  TextField,
  Typography,
} from '@mui/material';
import { apiCreateComment } from '../../api/apiService';

function CommentForm({
  serviceId,
  handleCloseCommentForm,
  setNotificationGreenOpen,
  setNotificationGreenMessage,
  setNotificationRedOpen,
  setNotificationRedMessage,
}) {
  const formik = useFormik({
    initialValues: {
      rating: 0,
      content: '',
    },
    validationSchema: Yup.object({
      rating: Yup.number()
        .min(1, 'Debe seleccionar una calificación')
        .max(5, 'Debe seleccionar una calificación')
        .required('Debe seleccionar una calificación'),
      content: Yup.string()
        .required('Debe ingresar un comentario')
        .max(255, 'El comentario no puede tener más de 255 caracteres'),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      try {
        await apiCreateComment(serviceId, values);
        setNotificationGreenMessage('Comentario enviado');
        setNotificationGreenOpen(true);
      } catch (error) {
        setNotificationRedMessage(
          'Ocurrió un error. Por favor intenta más tarde.'
        );
        setNotificationRedOpen(true);
      } finally {
        setSubmitting(false);
        handleCloseCommentForm();
      }
    },
  });

  return (
    <Box>
      <DialogTitle>Comentar</DialogTitle>
      <Box component="form" onSubmit={formik.handleSubmit}>
        <DialogContent>
          <Typography>Rating:</Typography>
          <Rating
            name="rating"
            value={formik.values.rating}
            onChange={(event, newValue) => {
              formik.setFieldValue('rating', newValue);
            }}
            helperText={formik.touched.rating && formik.errors.rating}
          />
          <TextField
            margin="dense"
            fullWidth
            id="content"
            name="content"
            label="Comentario"
            value={formik.values.content}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            multiline
            rows={4}
            error={formik.touched.content && Boolean(formik.errors.content)}
            helperText={formik.touched.content && formik.errors.content}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCommentForm} color="secondary">
            Cancelar
          </Button>
          <Button
            type="submit"
            disabled={formik.isSubmitting}
            variant="contained"
            color="primary"
          >
            {formik.isSubmitting ? 'Enviando...' : 'Enviar'}
          </Button>
        </DialogActions>
      </Box>
    </Box>
  );
}

export default CommentForm;

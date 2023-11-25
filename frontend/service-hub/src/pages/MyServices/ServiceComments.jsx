import React from 'react';
import { Dialog, DialogTitle, DialogContent, Typography } from '@mui/material';
import CommentCard from './CommentCard';
// import mockComments from '../../data/mockComments';

function ServiceComments({ open, serviceName, comments, onClose, onDelete }) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Comentarios de {serviceName}</DialogTitle>
      <DialogContent>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <CommentCard
              key={comment.serviceName}
              comment={comment}
              onDelete={onDelete}
            />
          ))
        ) : (
          <Typography> No hay comentarios para el servicio. </Typography>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default ServiceComments;

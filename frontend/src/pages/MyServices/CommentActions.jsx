import React from 'react';
import { Button, Grid } from '@mui/material';

function CommentActions({ onDelete }) {
  return (
    <Grid container spacing={1}>
      <Button
        variant="contained"
        color="secondary"
        fullWidth
        onClick={onDelete}
      >
        Borrar
      </Button>
    </Grid>
  );
}

export default CommentActions;

import React from 'react';
import { Card, CardContent, Typography, Rating, Grid } from '@mui/material';

function TopComments({ comments, classes }) {
  return (
    <Grid container spacing={3}>
      {comments.map((comment) => (
        // eslint-disable-next-line no-underscore-dangle
        <Grid item xs={12} sm={4} key={comment._id} style={{ display: 'flex' }}>
          <Card className={classes.card} style={{ width: '100%' }}>
            <CardContent
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center', // Centra verticalmente
                height: '100%', // Asegúrate de que CardContent tenga altura completa
                alignItems: 'flex-end',
              }}
            >
              <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                  <Typography variant="h6" component="div">
                    {comment.content}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Rating
                    value={comment.rating}
                    readOnly
                    size="large"
                    precision={0.1}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default TopComments;

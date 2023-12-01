import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardActions,
  ListItemText,
  Typography,
} from '@mui/material';
import Rating from '@mui/material/Rating';
import CommentActions from './CommentActions';
import { apiGetServiceById } from '../../api/apiService';

function CommentCard({ comment, onPublish, onDelete }) {
  const [serviceName, setServiceName] = useState('');

  const getServiceName = async () => {
    try {
      if (comment) {
        const response = await apiGetServiceById(comment.serviceId);
        setServiceName(response.service.name);
        console.log(response.service.name);
      }
    } catch (error) {
      console.log('Error getting comments info:', error);
    }
  };
  getServiceName();
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
                {serviceName}
              </Typography>
              <Rating value={comment.rating} readOnly />
              <Typography
                component="span"
                variant="body2"
                color="textPrimary"
                sx={{ display: 'block' }}
              >
                {comment.content}
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

export default CommentCard;

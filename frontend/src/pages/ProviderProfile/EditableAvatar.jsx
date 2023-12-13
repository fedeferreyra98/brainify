/* eslint-disable no-unused-vars */
import React from 'react';
import { Avatar, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  editableAvatar: {
    position: 'relative',
    '&:hover $editIcon': {
      opacity: 1,
    },
  },
  largeAvatar: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  editIcon: {
    opacity: 0,
    top: 0,
    right: 0,
    width: theme.spacing(2),
    height: theme.spacing(2),
    position: 'absolute',
    transition: 'opacity 0.3s ease', // Suaviza la transición
  },
}));

function EditableAvatar({ src, onEdit }) {
  const classes = useStyles();
  return (
    <div className={classes.editableAvatar}>
      <Avatar alt="Profile Picture" src={src} className={classes.largeAvatar} />
      <IconButton className={classes.editIcon} onClick={onEdit}>
        <EditIcon />
      </IconButton>
    </div>
  );
}

export default EditableAvatar;

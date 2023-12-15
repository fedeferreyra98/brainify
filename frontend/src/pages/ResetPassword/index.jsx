import React from 'react';
import { Container } from '@mui/material';
import { makeStyles } from '@mui/styles';
import ResetPasswordForm from './ResetPasswordForm';

// eslint-disable-next-line no-unused-vars
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#DDEBF8',
  },
}));

function RestorePassword() {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <ResetPasswordForm />
    </Container>
  );
}

export default RestorePassword;

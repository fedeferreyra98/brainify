import React from 'react';
import { Container } from '@mui/material';
import { makeStyles } from '@mui/styles';
import RequestPasswordResetForm from './RequestPasswordResetForm';

// eslint-disable-next-line no-unused-vars
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#DDEBF8',
  },
}));

function ForgotPassword() {
  const classes = useStyles();
  return (
    <Container className={classes.root}>
      <RequestPasswordResetForm />
    </Container>
  );
}

export default ForgotPassword;

import React from 'react';
import { Container } from '@mui/material';
import { makeStyles } from '@mui/styles';
import RequestPasswordResetForm from '../../components/form/RequestPasswordResetForm';

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
    <div className={classes.root}>
      <Container className={classes.mainContent}>
        <RequestPasswordResetForm />
      </Container>
    </div>
  );
}

export default ForgotPassword;

import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

function PasswordComponent() {
  const [password, setPassword] = useState('');
  const [isValid, setIsValid] = useState(true);
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setIsValid(regex.test(e.target.value));
  };

  return (
    <Box>
      <TextField
        type="password"
        value={password}
        onChange={handlePasswordChange}
        error={!isValid}
        label="Contraseña"
        helperText={
          !isValid &&
          'La contraseña debe tener al menos 8 caracteres y contener al menos una letra mayúscula, una letra minúscula, un dígito numérico y un carácter especial (como !@#$%^&*).'
        }
        variant="outlined"
        fullWidth
      />
    </Box>
  );
}

export default PasswordComponent;

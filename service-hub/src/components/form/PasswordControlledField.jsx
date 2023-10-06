import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

function PasswordControlledField({ label, value, onChange, ...props }) {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
  const isValid = regex.test(value);

  return (
    <TextField
      type={showPassword ? 'text' : 'password'}
      label={label}
      value={value}
      onChange={onChange}
      error={!isValid}
      helperText={
        !isValid &&
        'La contraseña debe tener al menos 8 caracteres y contener al menos una letra mayúscula, una letra minúscula, un dígito numérico y un carácter especial (como !@#$%^&*).'
      }
      variant="outlined"
      fullWidth
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton edge="end" onClick={handleTogglePasswordVisibility}>
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
}

export default PasswordControlledField;

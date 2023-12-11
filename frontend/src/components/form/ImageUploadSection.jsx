/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Button, Typography } from '@mui/material';

function ImageUploadSection({ onImageSelected, onSubmit, isSubmitting }) {
  const [previewSrc, setPreviewSrc] = useState(null); // Estado para la URL de previsualización

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      onImageSelected(file);

      // Generar la URL de previsualización
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewSrc(reader.result);
      };
      reader.readAsDataURL(file);
    },
    [onImageSelected]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*',
    maxFiles: 1,
  });

  return (
    <Box sx={{ p: 2 }}>
      <Box
        {...getRootProps()}
        sx={{
          cursor: 'pointer',
          border: 2,
          borderColor: 'gray.300',
          borderRadius: 2,
          p: 2,
          textAlign: 'center',
          borderStyle: 'dashed',
          bgcolor: 'background.paper',
        }}
      >
        <input {...getInputProps()} />
        <Typography variant="body1" sx={{ py: 2, color: 'gray.700' }}>
          Arrastra y soltá la imagen, o hacé click para seleccionar una
        </Typography>
      </Box>
      {previewSrc && (
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
          <img src={previewSrc} alt="Preview" style={{ maxWidth: '100%' }} />
        </Box>
      )}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <Button
          onClick={() => onSubmit()}
          variant="contained"
          color="primary"
          disabled={isSubmitting}
          sx={{ textTransform: 'none' }}
        >
          {isSubmitting ? 'Cargando...' : 'Subir Imagen'}
        </Button>
      </Box>
    </Box>
  );
}

export default ImageUploadSection;

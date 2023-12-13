/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Typography,
} from '@mui/material';

function ImageUploadModal({
  onImageSelected,
  onSubmit,
  isSubmitting,
  isOpen,
  onClose,
}) {
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
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Editar Imagen de Perfil</DialogTitle>
      <DialogContent>
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
              <img
                src={previewSrc}
                alt="Preview"
                style={{ maxWidth: '100%' }}
              />
            </Box>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            onClose();
            setPreviewSrc(null);
          }}
          color="primary"
        >
          Cancelar
        </Button>
        <Button
          onClick={() => onSubmit()}
          variant="contained"
          color="primary"
          disabled={isSubmitting}
          sx={{ textTransform: 'none' }}
        >
          {isSubmitting ? 'Cargando...' : 'Subir Imagen'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ImageUploadModal;

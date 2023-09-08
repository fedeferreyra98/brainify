import React, { useState } from 'react';

const Contrataciones = () => {
  const [contrataciones, setContrataciones] = useState([
    { id: 1, usuario: 'Ana López', servicio: 'Clases de Matemáticas', estado: 'Solicitada' },
    { id: 2, usuario: 'Carlos Rodríguez', servicio: 'Clases de Inglés', estado: 'Aceptada' }
    // Puedes agregar más contrataciones de ejemplo aquí
  ]);

  const handleCambiarEstado = (id, nuevoEstado) => {
    const nuevasContrataciones = contrataciones.map(contratacion => {
      if (contratacion.id === id) {
        return { ...contratacion, estado: nuevoEstado };
      }
      return contratacion;
    });
    setContrataciones(nuevasContrataciones);
  };

  return (
    <div className='contrataciones-container'>
      <h2>Contrataciones</h2>
      {contrataciones.map(contratacion => (
        <div key={contratacion.id} className='contratacion-item'>
          <h3>{contratacion.usuario}</h3>
          <p>Servicio: {contratacion.servicio}</p>
          <p>Estado: {contratacion.estado}</p>
          <button onClick={() => handleCambiarEstado(contratacion.id, 'Aceptada')}>Aceptar</button>
          <button onClick={() => handleCambiarEstado(contratacion.id, 'Finalizada')}>Finalizar</button>
          <button onClick={() => handleCambiarEstado(contratacion.id, 'Cancelada')}>Cancelar</button>
        </div>
      ))}
    </div>
  );
};

export default Contrataciones;
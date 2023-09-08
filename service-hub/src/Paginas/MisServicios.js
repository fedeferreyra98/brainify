import React, { useState } from 'react';

const MisServicios = () => {
  const [servicios, setServicios] = useState([
    { id: 1, nombre: 'Clases de Matemáticas', duracion: '1 hora', frecuencia: 'Semanal', costo: '$50' },
    { id: 2, nombre: 'Clases de Inglés', duracion: '2 horas', frecuencia: 'Mensual', costo: '$100' }
    // Puedes agregar más servicios de ejemplo aquí
  ]);

  const handleEliminar = (id) => {
    const nuevosServicios = servicios.filter(servicio => servicio.id !== id);
    setServicios(nuevosServicios);
  };

  return (
    <div className='mis-servicios-container'>
      <h2>Mis Servicios</h2>
      {servicios.map(servicio => (
        <div key={servicio.id} className='servicio-item'>
          <h3>{servicio.nombre}</h3>
          <p>Duración: {servicio.duracion}</p>
          <p>Frecuencia: {servicio.frecuencia}</p>
          <p>Costo: {servicio.costo}</p>
          <button onClick={() => handleEliminar(servicio.id)}>Eliminar</button>
        </div>
      ))}
    </div>
  );
};

export default MisServicios;
import React, { useState } from 'react';

const Comentarios = () => {
  const [comentarios, setComentarios] = useState([
    { id: 1, usuario: 'Ana López', comentario: 'Excelente servicio, muy recomendado.' },
    { id: 2, usuario: 'Carlos Rodríguez', comentario: 'Me ayudó mucho con mis dudas. Gracias!' }
    // Puedes agregar más comentarios de ejemplo aquí
  ]);

  const handleBloquear = (id) => {
    const nuevosComentarios = comentarios.filter(comentario => comentario.id !== id);
    setComentarios(nuevosComentarios);
  };

  return (
    <div className='comentarios-container'>
      <h2>Comentarios</h2>
      {comentarios.map(comentario => (
        <div key={comentario.id} className='comentario-item'>
          <h3>{comentario.usuario}</h3>
          <p>{comentario.comentario}</p>
          <button onClick={() => handleBloquear(comentario.id)}>Bloquear Comentario</button>
        </div>
      ))}
    </div>
  );
};

export default Comentarios;
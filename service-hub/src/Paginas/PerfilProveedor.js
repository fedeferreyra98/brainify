import React, { useState } from 'react';

const PerfilProveedor = () => {
  const [perfil, setPerfil] = useState({
    nombre: 'Juan Pérez',
    email: 'juan.perez@example.com',
    telefono: '123-456-7890',
    titulo: 'Licenciado en Matemáticas',
    experiencia: '5 años enseñando en escuelas y universidades'
  });

  const handleUpdate = (e) => {
    e.preventDefault();
    // Lógica de actualización aquí
    console.log('Perfil actualizado:', perfil);
  };

  return (
    <div className='perfil-proveedor-container'>
      <h2>Perfil Proveedor</h2>
      <form onSubmit={handleUpdate}>
        <div className='input-group'>
          <label>Nombre:</label>
          <input type='text' value={perfil.nombre} onChange={(e) => setPerfil({ ...perfil, nombre: e.target.value })} required />
        </div>
        <div className='input-group'>
          <label>Email:</label>
          <input type='email' value={perfil.email} onChange={(e) => setPerfil({ ...perfil, email: e.target.value })} required />
        </div>
        <div className='input-group'>
          <label>Teléfono:</label>
          <input type='tel' value={perfil.telefono} onChange={(e) => setPerfil({ ...perfil, telefono: e.target.value })} required />
        </div>
        <div className='input-group'>
          <label>Título:</label>
          <input type='text' value={perfil.titulo} onChange={(e) => setPerfil({ ...perfil, titulo: e.target.value })} required />
        </div>
        <div className='input-group'>
          <label>Experiencia:</label>
          <textarea value={perfil.experiencia} onChange={(e) => setPerfil({ ...perfil, experiencia: e.target.value })} required></textarea>
        </div>
        <button type='submit'>Actualizar Perfil</button>
      </form>
    </div>
  );
};

export default PerfilProveedor;
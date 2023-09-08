import React, { useState } from 'react';

const Registro = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica de registro aquí
    console.log('Datos de registro:', formData);
  };

  return (
    <div className='registro-container'>
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <div className='input-group'>
          <label>Nombre:</label>
          <input type='text' value={formData.nombre} onChange={(e) => setFormData({ ...formData, nombre: e.target.value })} required />
        </div>
        <div className='input-group'>
          <label>Apellido:</label>
          <input type='text' value={formData.apellido} onChange={(e) => setFormData({ ...formData, apellido: e.target.value })} required />
        </div>
        <div className='input-group'>
          <label>Email:</label>
          <input type='email' value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
        </div>
        <div className='input-group'>
          <label>Teléfono:</label>
          <input type='tel' value={formData.telefono} onChange={(e) => setFormData({ ...formData, telefono: e.target.value })} required />
        </div>
        <button type='submit'>Registrarse</button>
      </form>
    </div>
  );
};

export default Registro;
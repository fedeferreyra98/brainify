import React, { useState } from 'react';

const ExplorarServicios = () => {
  const [filtro, setFiltro] = useState({
    categoria: '',
    tipoClase: '',
    frecuencia: ''
  });

  const serviciosEjemplo = [
    { nombre: 'Clases de Matemáticas', categoria: 'Tutorías escolares', tipoClase: 'individual', frecuencia: 'semanal' },
    { nombre: 'Clases de Inglés', categoria: 'Clases de idioma', tipoClase: 'grupal', frecuencia: 'mensual' },
    // Puedes agregar más ejemplos aquí
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    // Lógica de búsqueda aquí
    console.log('Buscando servicios con filtro:', filtro);
  };

  return (
    <div className='explorar-container'>
      <h2>Explorar Servicios</h2>
      <form onSubmit={handleSearch}>
        <div className='input-group'>
          <label>Categoría:</label>
          <select value={filtro.categoria} onChange={(e) => setFiltro({ ...filtro, categoria: e.target.value })}>
            <option value=''>Todas</option>
            <option value='Tutorías escolares'>Tutorías escolares</option>
            <option value='Clases de idioma'>Clases de idioma</option>
            // Puedes agregar más categorías aquí
          </select>
        </div>
        <div className='input-group'>
          <label>Tipo de Clase:</label>
          <select value={filtro.tipoClase} onChange={(e) => setFiltro({ ...filtro, tipoClase: e.target.value })}>
            <option value=''>Todos</option>
            <option value='individual'>Individual</option>
            <option value='grupal'>Grupal</option>
          </select>
        </div>
        <div className='input-group'>
          <label>Frecuencia:</label>
          <select value={filtro.frecuencia} onChange={(e) => setFiltro({ ...filtro, frecuencia: e.target.value })}>
            <option value=''>Todas</option>
            <option value='única'>Única</option>
            <option value='semanal'>Semanal</option>
            <option value='mensual'>Mensual</option>
          </select>
        </div>
        <button type='submit'>Buscar</button>
      </form>
      <div className='servicios-list'>
        {serviciosEjemplo.map((servicio, index) => (
          <div key={index} className='servicio-item'>
            <h3>{servicio.nombre}</h3>
            <p>Categoría: {servicio.categoria}</p>
            <p>Tipo de Clase: {servicio.tipoClase}</p>
            <p>Frecuencia: {servicio.frecuencia}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExplorarServicios;
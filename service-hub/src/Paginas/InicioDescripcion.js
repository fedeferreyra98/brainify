import React from 'react';
import { Link } from 'react-router-dom';

const InicioDescripcion = () => {
  return (
    <div className='inicio-descripcion-container'>
      <h1>Bienvenido a nuestro Marketplace</h1>
      <p>Esta es una plataforma donde los profesores pueden ofrecer clases particulares y los alumnos pueden buscar y contratar estos servicios.</p>
      <div className='enlaces-container'>
        <Link to='/explorar-servicios'>Explorar Servicios</Link>
        <Link to='/registro'>Registro</Link>
        <Link to='/ingreso'>Ingreso</Link>
        <Link to='/mis-servicios'>Mis Servicios</Link>
        <Link to='/perfil-proveedor'>Perfil Proveedor</Link>
        <Link to='/comentarios'>Comentarios</Link>
        <Link to='/contrataciones'>Contrataciones</Link>
      </div>
    </div>
  );
};

export default InicioDescripcion;
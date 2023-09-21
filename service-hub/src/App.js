import React from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import LoginPage from './Paginas/LoginPage';
import ExplorarServicios from './Paginas/ExplorarServicios';
import Registro from './Paginas/Registro';
import MisServicios from './Paginas/MisServicios';
import PerfilProveedor from './Paginas/PerfilProveedor';
import Comentarios from './Paginas/Comentarios';
import Contrataciones from './Paginas/Contrataciones';
import InicioDescripcion from './Paginas/InicioDescripcion';
import './styles.css';


const ProtectedRoute = ({ children }) => {
  const isAuthenticated = true; // Aquí puedes verificar si el usuario está autenticado
  const navigate = useNavigate();
  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }
  return children;
};

const NotFoundPage = () => <div>Página no encontrada</div>;

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<InicioDescripcion />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/explorar-servicios' element={<ExplorarServicios />} />
        <Route path='/registro' element={<Registro />} />
        <Route path='/mis-servicios' element={<ProtectedRoute><MisServicios /></ProtectedRoute>} />
        <Route path='/perfil-proveedor' element={<ProtectedRoute><PerfilProveedor /></ProtectedRoute>} />
        <Route path='/comentarios' element={<ProtectedRoute><Comentarios /></ProtectedRoute>} />
        <Route path='/contrataciones' element={<ProtectedRoute><Contrataciones /></ProtectedRoute>} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
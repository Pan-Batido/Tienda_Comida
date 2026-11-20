import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import logoSakura from '../assets/img/logo-sakura.png';
import { getUsuarioActivo, clearSession } from '../services/api';

export function Navbar({ cantidadCarrito, alAbrirCarrito }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [usuarioActivo, setUsuarioActivo] = useState(null);

  const comprobarUsuario = () => {
    setUsuarioActivo(getUsuarioActivo());
  };

  useEffect(() => {
    comprobarUsuario();
    window.addEventListener('storage', comprobarUsuario);
    window.addEventListener('sakura_auth_change', comprobarUsuario);

    return () => {
      window.removeEventListener('storage', comprobarUsuario);
      window.removeEventListener('sakura_auth_change', comprobarUsuario);
    };
  }, []);

  useEffect(() => {
    comprobarUsuario();
  }, [location.pathname]);

  const handleCerrarSesion = () => {
    clearSession();
    setUsuarioActivo(null);
    navigate('/login');
  };

  const esStaff = usuarioActivo && (usuarioActivo.rol === 'ADMINISTRADOR' || usuarioActivo.rol === 'VENDEDOR');

  return (
    <nav className="navbar navbar-expand-lg navbar-dark shadow-sm navbar-sakura sticky-top">
      <div className="container">
        <Link className="navbar-brand fw-bold d-flex align-items-center" to="/">
          <img src={logoSakura} alt="Sakura Market" height="42" className="me-2" />
        </Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className={({ isActive }) => isActive ? 'nav-link active fw-bold' : 'nav-link'} to="/">Inicio</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => isActive ? 'nav-link active fw-bold' : 'nav-link'} to="/productos">Productos</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => isActive ? 'nav-link active fw-bold' : 'nav-link'} to="/categorias">Categorías</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => isActive ? 'nav-link active fw-bold' : 'nav-link'} to="/ofertas">Ofertas</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => isActive ? 'nav-link active fw-bold' : 'nav-link'} to="/blog">Blog</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => isActive ? 'nav-link active fw-bold' : 'nav-link'} to="/contacto">Contacto</NavLink>
            </li>
          </ul>

          <div className="d-flex align-items-center gap-2">
            {esStaff && (
              <Link to="/admin" className="btn btn-warning btn-sm fw-bold text-dark">
                <i className="bi bi-gear-fill me-1"></i>
                {usuarioActivo.rol === 'ADMINISTRADOR' ? 'Panel Admin' : 'Panel Vendedor'}
              </Link>
            )}

            {usuarioActivo ? (
              <div className="d-flex align-items-center gap-2">
                <span className="text-white small fw-bold d-flex align-items-center gap-1 bg-white bg-opacity-25 px-3 py-1 rounded-pill">
                  <i className="bi bi-person-fill"></i>
                  {usuarioActivo.nombre || 'Usuario'}
                </span>
                <button
                  onClick={handleCerrarSesion}
                  className="btn btn-outline-light btn-sm fw-bold"
                  title="Cerrar sesión"
                >
                  <i className="bi bi-box-arrow-right me-1"></i> Salir
                </button>
              </div>
            ) : (
              <Link to="/login" className="btn btn-outline-light btn-sm fw-bold">
                <i className="bi bi-box-arrow-in-right me-1"></i> Ingresar
              </Link>
            )}

            <button
              type="button"
              className="btn btn-sm text-white position-relative ms-1 fw-bold btn-carrito-matcha"
              onClick={alAbrirCarrito}
            >
              <i className="bi bi-cart-fill me-1"></i> Carrito
              {cantidadCarrito > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning text-dark">
                  {cantidadCarrito}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
import React from 'react';

export function Navbar({ cantidadCarrito }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark shadow-sm navbar-sakura">
      <div className="container">
        {/* Logo oficial de Sakura Market */}
        <a className="navbar-brand fw-bold d-flex align-items-center" href="#inicio">
          <img src="/img/logo-sakura.png" alt="Sakura Market" height="42" className="me-2" />
        </a>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item"><a className="nav-link active" href="#inicio">Inicio</a></li>
            <li className="nav-item"><a className="nav-link" href="#productos">Productos</a></li>
            <li className="nav-item"><a className="nav-link" href="#contacto">Contacto</a></li>
          </ul>

          <div className="d-flex align-items-center gap-2">
            <button className="btn btn-outline-light btn-sm fw-bold">
              <i className="bi bi-box-arrow-in-right me-1"></i> Ingresar
            </button>

            {/* Botón de Carrito con el verde Matcha */}
            <a 
              href="#carrito" 
              className="btn btn-sm text-white position-relative ms-1 fw-bold btn-carrito-matcha"
            >
              <i className="bi bi-cart-fill me-1"></i> Carrito
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {cantidadCarrito}
              </span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
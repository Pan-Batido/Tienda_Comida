import React from 'react';
import { Link } from 'react-router-dom';
import bebidasBanner from '../assets/img/bebidas-banner.jpg';

export function DetalleBlog2() {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-9">
          <nav aria-label="breadcrumb" className="mb-4">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/" className="text-decoration-none text-muted">Inicio</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="/blog" className="text-decoration-none text-muted">Blog</Link>
              </li>
              <li className="breadcrumb-item active text-danger fw-bold" aria-current="page">
                Historia del Ramune
              </li>
            </ol>
          </nav>

          <span className="badge bg-warning text-dark mb-2 fw-bold">Cultura</span>
          <h1 className="fw-bold mb-3 text-dark">
            La historia del Ramune y su famosa canica 🍾
          </h1>
          <div className="d-flex align-items-center gap-3 text-muted small mb-4 border-bottom pb-3">
            <span><i className="bi bi-person-circle me-1"></i> Especialista Sakura</span>
            <span><i className="bi bi-calendar3 me-1"></i> 05 Oct 2026</span>
            <span><i className="bi bi-clock me-1"></i> 4 min de lectura</span>
          </div>

          <div className="mb-4 rounded-3 overflow-hidden shadow-sm">
            <img 
              src={bebidasBanner} 
              alt="Bebidas Japonesas" 
              className="w-100 object-fit-cover"
              style={{ maxHeight: '400px' }} 
            />
          </div>

          <div className="content fs-5 text-secondary">
            <p>
              El **Ramune** es una de las bebidas carbonatadas más icónicas de Japón, famosa no solo por sus refrescantes sabores sino por el curioso mecanismo de sellado de su botella.
            </p>

            <h3 className="fw-bold text-danger mt-4 mb-3">La Botella Codd-neck</h3>
            <p>
              Diseñada originalmente en el siglo XIX, la botella posee una canica de vidrio que actúa como tapón de presión. Al presionar el abridor plástico, la canica cae dentro de la cámara superior del envase, liberando el gas y permitiendo beber.
            </p>

            <h3 className="fw-bold text-danger mt-4 mb-3">Un Símbolo del Verano Japonés</h3>
            <p>
              En Japón, abrir un Ramune frío durante los festivales de verano (Matsuri) es una tradición infaltable. Encuentra tus sabores favoritos de Ramune y tés asiáticos directamente en el catálogo de <strong>Sakura Market</strong>.
            </p>
          </div>

          <div className="border-top pt-4 mt-5 d-flex justify-content-between align-items-center">
            <Link to="/blog" className="btn btn-outline-danger fw-bold">
              <i className="bi bi-arrow-left me-2"></i>Volver al Blog
            </Link>
            <Link to="/productos" className="btn btn-danger fw-bold">
              Explorar Bebidas <i className="bi bi-bag-check ms-1"></i>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetalleBlog2;
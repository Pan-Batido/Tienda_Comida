import React from 'react';
import { Link } from 'react-router-dom';
import ramenBanner from '../assets/img/ramen-banner.jpg';

export function DetalleBlog1() {
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
                Ramen Perfecto
              </li>
            </ol>
          </nav>

          <span className="badge bg-warning text-dark mb-2 fw-bold">Recetas</span>
          <h1 className="fw-bold mb-3 text-dark">
            Guía de preparación: Cómo lograr el Ramen Perfecto 🍜
          </h1>
          <div className="d-flex align-items-center gap-3 text-muted small mb-4 border-bottom pb-3">
            <span><i className="bi bi-person-circle me-1"></i> Chef Sakura</span>
            <span><i className="bi bi-calendar3 me-1"></i> 10 Oct 2026</span>
            <span><i className="bi bi-clock me-1"></i> 5 min de lectura</span>
          </div>

          <div className="mb-4 rounded-3 overflow-hidden shadow-sm">
            <img 
              src={ramenBanner} 
              alt="Ramen Auténtico" 
              className="w-100 object-fit-cover"
              style={{ maxHeight: '400px' }} 
            />
          </div>

          <div className="content fs-5 text-secondary">
            <p>
              El ramen ha pasado de ser un plato de comida rápida en Japón a convertirse en un fenómeno gastronómico mundial. Para preparar un caldo rico en Umami y sazonar tus fideos como un chef en Tokio con productos de <strong>Sakura Market</strong>, sigue estos pasos clave:
            </p>

            <h3 className="fw-bold text-danger mt-4 mb-3">1. Un Caldo Base Balanceado</h3>
            <p>
              El secreto de un buen ramen reside en el equilibrio del caldo. Puedes elevar el sabor de tus fideos instantáneos agregando una cucharadita de miso, un chorrito de salsa de soya shoyu y unas gotas de aceite de sésamo tostado.
            </p>

            <h3 className="fw-bold text-danger mt-4 mb-3">2. Toppings Tradicionales</h3>
            <ul>
              <li><strong>Ajitsuke Tamago:</strong> Huevo de yema blanda marinado en soya y mirin.</li>
              <li><strong>Cebollín fresco:</strong> Aporta el toque crocante y fresco.</li>
              <li><strong>Nori:</strong> Hojas de alga marina para potenciar el perfil umami.</li>
            </ul>

            <div className="p-4 my-4 bg-light rounded-3 border-start border-4 border-danger">
              <p className="mb-0 fst-italic text-dark fw-medium">
                "Tip: No sobrecocines los fideos. Déjalos al dente para que absorban el sabor del caldo sin perder textura."
              </p>
            </div>
          </div>

          <div className="border-top pt-4 mt-5 d-flex justify-content-between align-items-center">
            <Link to="/blog" className="btn btn-outline-danger fw-bold">
              <i className="bi bi-arrow-left me-2"></i>Volver al Blog
            </Link>
            <Link to="/productos" className="btn btn-danger fw-bold">
              Ver Ramen en Tienda <i className="bi bi-bag-check ms-1"></i>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetalleBlog1;
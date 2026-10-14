import React from 'react';
import { Link } from 'react-router-dom';

export function Blog() {
  const articulos = [
    {
      id: 1,
      titulo: 'Guía de preparación: Cómo lograr el Ramen Perfecto',
      resumen: 'Aprende los secretos para preparar un caldo rico en Umami y sazonar tus fideos como un chef en Tokio.',
      fecha: '10 Oct 2026',
      categoria: 'Recetas'
    },
    {
      id: 2,
      titulo: 'La historia del Ramune y su famosa canica',
      resumen: 'Descubre por qué esta bebida tradicional japonesa tiene un diseño de botella único conocido como Codd-neck.',
      fecha: '05 Oct 2026',
      categoria: 'Cultura'
    }
  ];

  return (
    <div className="container py-4">
      <div className="text-center mb-4">
        <h1 className="fw-bold text-danger">Blog Sakura 🍱</h1>
        <p className="text-muted">Novedades, cultura gastronómica asiática y recetas exclusivas.</p>
      </div>

      <div className="row g-4 justify-content-center">
        {articulos.map((art) => (
          <div className="col-md-6" key={art.id}>
            <div className="card h-100 border-0 shadow-sm p-3">
              <div className="card-body">
                <span className="badge bg-warning text-dark mb-2 fw-bold">{art.categoria}</span>
                <h4 className="card-title fw-bold text-dark">{art.titulo}</h4>
                <p className="card-text text-muted">{art.resumen}</p>
              </div>
              <div className="card-footer bg-transparent border-0 d-flex justify-content-between align-items-center">
                <small className="text-muted">{art.fecha}</small>
                <Link 
                  to={`/blog/${art.id}`} 
                  className="btn btn-link text-danger p-0 fw-bold text-decoration-none"
                >
                  Leer más <i className="bi bi-arrow-right"></i>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Blog;
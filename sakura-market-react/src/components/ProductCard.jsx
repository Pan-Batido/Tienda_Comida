import React from 'react';
import { Link } from 'react-router-dom';

export function ProductCard({ producto, alAgregarAlCarrito }) {
  const { id, nombre, descripcion, precio, categoria, stock, imagen } = producto;

  // Formatear precio en pesos chilenos (CLP)
  const precioFormateado = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
  }).format(precio);

  return (
    <div className="card h-100 shadow-sm border-0 product-card hover-shadow transition-all">
      {/* Badge de Categoría */}
      <div className="position-relative">
        <img
          src={imagen}
          className="card-img-top object-fit-cover"
          alt={nombre}
          style={{ height: '200px' }}
        />
        <span className="position-absolute top-0 start-0 m-2 badge bg-danger text-white text-uppercase">
          {categoria}
        </span>
      </div>

      {/* Cuerpo de la Tarjeta */}
      <div className="card-body d-flex flex-column">
        <h5 className="card-title fw-bold text-dark mb-1">{nombre}</h5>
        
        <p className="card-text text-muted small flex-grow-1 line-clamp-2">
          {descripcion}
        </p>

        <div className="d-flex justify-content-between align-items-center my-2">
          <span className="fs-5 fw-bold text-danger">{precioFormateado}</span>
          <small className={stock > 0 ? 'text-success fw-semibold' : 'text-danger fw-semibold'}>
            {stock > 0 ? `Stock: ${stock}` : 'Agotado'}
          </small>
        </div>

        {/* Acciones */}
        <div className="d-flex gap-2 mt-2">
          <Link
            to={`/producto/${id}`}
            className="btn btn-outline-secondary btn-sm flex-grow-1 d-flex align-items-center justify-content-center"
          >
            <i className="bi bi-eye me-1"></i> Ver
          </Link>

          <button
            type="button"
            className="btn btn-danger btn-sm flex-grow-1 d-flex align-items-center justify-content-center fw-bold"
            onClick={() => alAgregarAlCarrito(producto)}
            disabled={stock <= 0}
          >
            <i className="bi bi-cart-plus me-1"></i> Agregar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
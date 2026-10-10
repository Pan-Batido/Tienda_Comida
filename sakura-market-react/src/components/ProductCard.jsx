import React from 'react';

export function ProductCard({ producto, alAgregar }) {
  return (
    <div className="col-12 col-md-6 col-lg-3 mb-4">
      <div className="card h-100 shadow-sm border-0 overflow-hidden">
        <img 
          src={producto.imagen} 
          className="card-img-top p-2" 
          alt={producto.nombre} 
          style={{ height: '200px', objectFit: 'contain', backgroundColor: '#fff' }}
        />
        <div className="card-body d-flex flex-column text-center">
          <span className="badge bg-sakura mb-2 align-self-center">
            {producto.categoria}
          </span>
          <h5 className="card-title fw-bold fs-6 text-dark">
            {producto.nombre}
          </h5>
          <p className="card-text text-muted small flex-grow-1">
            {producto.descripcion}
          </p>
          <div className="mt-3">
            <p className="fw-bold fs-5 text-success mb-2">
              ${producto.precio.toLocaleString('es-CL')}
            </p>
            <button 
              className="btn btn-outline-sakura w-100"
              onClick={() => alAgregar(producto)}
            >
              <i className="bi bi-cart-plus-fill me-1"></i> Añadir al Carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
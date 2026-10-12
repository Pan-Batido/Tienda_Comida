import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { obtenerProductoPorId } from '../data/db';

export function DetalleProducto({ alAgregarAlCarrito }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [producto, setProducto] = useState(null);
  const [cantidad, setCantidad] = useState(1);

  useEffect(() => {
    // Buscar el producto en la base de datos simulada por su ID
    const prodEncontrado = obtenerProductoPorId(id);
    if (prodEncontrado) {
      setProducto(prodEncontrado);
    }
  }, [id]);

  if (!producto) {
    return (
      <div className="container py-5 text-center">
        <div className="alert alert-warning d-inline-block px-5 py-4 shadow-sm rounded-3" role="alert">
          <i className="bi bi-exclamation-triangle-fill fs-1 text-warning d-block mb-3"></i>
          <h4 className="fw-bold">Producto no encontrado</h4>
          <p className="text-muted">El producto que intentas consultar no existe o fue removido del catálogo.</p>
          <Link to="/productos" className="btn btn-danger fw-bold mt-2">
            <i className="bi bi-arrow-left me-2"></i>Volver al Catálogo
          </Link>
        </div>
      </div>
    );
  }

  // Formatear precio a CLP
  const precioFormateado = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
  }).format(producto.precio);

  const handleAgregar = () => {
    // Agregar 'cantidad' veces el producto seleccionado
    for (let i = 0; i < cantidad; i++) {
      alAgregarAlCarrito(producto);
    }
  };

  return (
    <div className="container py-5">
      {/* Botón Volver */}
      <div className="mb-4">
        <button
          onClick={() => navigate(-1)}
          className="btn btn-outline-secondary btn-sm fw-semibold"
        >
          <i className="bi bi-arrow-left me-1"></i> Regresar
        </button>
      </div>

      <div className="card border-0 shadow-sm rounded-3 overflow-hidden">
        <div className="row g-0">
          {/* Imagen del Producto */}
          <div className="col-md-6 bg-light d-flex align-items-center justify-content-center p-4">
            <img
              src={producto.imagen}
              alt={producto.nombre}
              className="img-fluid rounded object-fit-cover shadow-sm"
              style={{ maxHeight: '420px', width: '100%' }}
            />
          </div>

          {/* Detalles del Producto */}
          <div className="col-md-6 p-4 p-lg-5 d-flex flex-column justify-content-between">
            <div>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="badge bg-danger text-uppercase px-3 py-2 fw-bold">
                  {producto.categoria}
                </span>
                <small className={producto.stock > 0 ? 'text-success fw-bold' : 'text-danger fw-bold'}>
                  <i className="bi bi-box-seam me-1"></i>
                  {producto.stock > 0 ? `Stock Disponible: ${producto.stock}` : 'Agotado'}
                </small>
              </div>

              <h2 className="fw-bold text-dark mb-3">{producto.nombre}</h2>

              <h3 className="text-danger fw-bold mb-4">{precioFormateado}</h3>

              <h6 className="fw-bold text-secondary text-uppercase small">Descripción:</h6>
              <p className="text-muted leading-relaxed mb-4">
                {producto.descripcion}
              </p>
            </div>

            {/* Controles de Selección de Cantidad y Compra */}
            <div className="border-top pt-4">
              <div className="row g-3 align-items-center">
                <div className="col-12 col-sm-4">
                  <label htmlFor="cantidadSelect" className="form-label fw-bold small text-muted mb-1">
                    Cantidad:
                  </label>
                  <div className="input-group">
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={() => setCantidad((prev) => Math.max(1, prev - 1))}
                      disabled={cantidad <= 1}
                    >
                      -
                    </button>
                    <span className="form-control text-center fw-bold bg-white">
                      {cantidad}
                    </span>
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={() => setCantidad((prev) => Math.min(producto.stock, prev + 1))}
                      disabled={cantidad >= producto.stock}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="col-12 col-sm-8">
                  <label className="form-label d-none d-sm-block small text-muted mb-1">
                    &nbsp;
                  </label>
                  <button
                    className="btn btn-danger w-100 py-2 fw-bold d-flex align-items-center justify-content-center gap-2"
                    onClick={handleAgregar}
                    disabled={producto.stock <= 0}
                  >
                    <i className="bi bi-cart-plus-fill fs-5"></i>
                    Añadir al Carrito ({precioFormateado && new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(producto.precio * cantidad)})
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetalleProducto;
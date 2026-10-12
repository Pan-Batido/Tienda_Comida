import React from 'react';
import { Link } from 'react-router-dom';

export function Carrito({ carrito, alActualizarCantidad, alEliminarItem, alVaciarCarrito }) {
  const formatearCLP = (monto) => {
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(monto);
  };

  const subtotal = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  const envio = subtotal > 0 ? 2990 : 0;
  const total = subtotal + envio;

  return (
    <div className="container py-5">
      <h1 className="fw-bold text-danger mb-4">
        <i className="bi bi-cart3 me-2"></i>Carrito de Compras
      </h1>

      {carrito.length === 0 ? (
        <div className="text-center py-5 bg-light rounded-3 shadow-sm">
          <i className="bi bi-cart-x fs-1 text-muted d-block mb-3"></i>
          <h4 className="fw-bold text-secondary">Tu carrito está vacío</h4>
          <p className="text-muted small mb-4">Revisa nuestro catálogo y añade tus productos favoritos.</p>
          <Link to="/productos" className="btn btn-danger fw-bold px-4 py-2">
            Ir a la Tienda <i className="bi bi-arrow-right ms-1"></i>
          </Link>
        </div>
      ) : (
        <div className="row g-4">
          {/* Tabla de Productos */}
          <div className="col-lg-8">
            <div className="card border-0 shadow-sm p-3 rounded-3">
              <div className="table-responsive">
                <table className="table align-middle">
                  <thead className="table-light">
                    <tr>
                      <th>Producto</th>
                      <th className="text-center">Precio</th>
                      <th className="text-center">Cantidad</th>
                      <th className="text-end">Subtotal</th>
                      <th className="text-center">Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {carrito.map((item) => (
                      <tr key={item.id}>
                        <td>
                          <div className="d-flex align-items-center gap-3">
                            <img
                              src={item.imagen}
                              alt={item.nombre}
                              className="rounded object-fit-cover"
                              style={{ width: '50px', height: '50px' }}
                            />
                            <span className="fw-semibold text-dark">{item.nombre}</span>
                          </div>
                        </td>
                        <td className="text-center">{formatearCLP(item.precio)}</td>
                        <td className="text-center">
                          <div className="btn-group btn-group-sm" role="group">
                            <button
                              className="btn btn-outline-secondary"
                              onClick={() => alActualizarCantidad(item.id, item.cantidad - 1)}
                            >
                              -
                            </button>
                            <span className="btn btn-light disabled px-3 fw-bold">{item.cantidad}</span>
                            <button
                              className="btn btn-outline-secondary"
                              onClick={() => alActualizarCantidad(item.id, item.cantidad + 1)}
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="text-end fw-bold text-danger">
                          {formatearCLP(item.precio * item.cantidad)}
                        </td>
                        <td className="text-center">
                          <button
                            className="btn btn-outline-danger btn-sm border-0"
                            onClick={() => alEliminarItem(item.id)}
                          >
                            <i className="bi bi-trash-fill"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="d-flex justify-content-between align-items-center mt-3 pt-3 border-top">
                <button className="btn btn-outline-secondary btn-sm" onClick={alVaciarCarrito}>
                  <i className="bi bi-trash me-1"></i> Vaciar Carrito
                </button>
                <Link to="/productos" className="btn btn-link text-danger text-decoration-none fw-bold small">
                  <i className="bi bi-arrow-left me-1"></i> Seguir Comprando
                </Link>
              </div>
            </div>
          </div>

          {/* Resumen del Pedido */}
          <div className="col-lg-4">
            <div className="card border-0 shadow-sm p-4 rounded-3 bg-light">
              <h5 className="fw-bold text-dark mb-3">Resumen de la Compra</h5>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Subtotal:</span>
                <span className="fw-semibold">{formatearCLP(subtotal)}</span>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span className="text-muted">Despacho estimado:</span>
                <span className="fw-semibold">{formatearCLP(envio)}</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between mb-4">
                <span className="fs-5 fw-bold text-dark">Total:</span>
                <span className="fs-5 fw-bold text-danger">{formatearCLP(total)}</span>
              </div>
              <Link to="/checkout" className="btn btn-danger w-100 fw-bold py-2">
                Proceder al Pago <i className="bi bi-credit-card ms-1"></i>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Carrito;
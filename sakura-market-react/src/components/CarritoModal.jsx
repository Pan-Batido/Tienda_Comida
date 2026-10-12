import React from 'react';
import { Link } from 'react-router-dom';

export function CarritoModal({
  mostrar,
  alCerrar,
  carrito,
  alActualizarCantidad,
  alEliminarItem,
  alVaciarCarrito
}) {
  if (!mostrar) return null;

  // Formateador a pesos chilenos (CLP)
  const formatearCLP = (monto) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
    }).format(monto);
  };

  // Calcular el total
  const total = carrito.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content border-0 shadow">
          {/* Encabezado del Modal */}
          <div className="modal-header bg-danger text-white">
            <h5 className="modal-title fw-bold">
              <i className="bi bi-cart3 me-2"></i>Carrito de Compras
            </h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={alCerrar}
              aria-label="Cerrar"
            ></button>
          </div>

          {/* Cuerpo del Modal */}
          <div className="modal-body p-4" style={{ maxHeight: '60vh', overflowY: 'auto' }}>
            {carrito.length === 0 ? (
              <div className="text-center py-5 text-muted">
                <i className="bi bi-cart-x fs-1 d-block mb-3 text-secondary"></i>
                <h5>Tu carrito está vacío</h5>
                <p className="small">¡Explora nuestro catálogo y agrega tus snacks o ramen favoritos!</p>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table align-middle">
                  <thead className="table-light">
                    <tr>
                      <th scope="col">Producto</th>
                      <th scope="col" className="text-center">Precio</th>
                      <th scope="col" className="text-center">Cantidad</th>
                      <th scope="col" className="text-end">Subtotal</th>
                      <th scope="col" className="text-center">Acción</th>
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
                              type="button"
                              className="btn btn-outline-secondary"
                              onClick={() => alActualizarCantidad(item.id, item.cantidad - 1)}
                            >
                              -
                            </button>
                            <span className="btn btn-light disabled px-3 fw-bold">
                              {item.cantidad}
                            </span>
                            <button
                              type="button"
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
                            type="button"
                            className="btn btn-outline-danger btn-sm border-0"
                            onClick={() => alEliminarItem(item.id)}
                            title="Eliminar producto"
                          >
                            <i className="bi bi-trash-fill"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Pie del Modal */}
          {carrito.length > 0 && (
            <div className="modal-footer bg-light d-flex justify-content-between align-items-center p-3">
              <button
                type="button"
                className="btn btn-outline-secondary btn-sm"
                onClick={alVaciarCarrito}
              >
                <i className="bi bi-trash me-1"></i> Vaciar Carrito
              </button>

              <div className="d-flex align-items-center gap-3">
                <span className="fs-5 fw-bold text-dark">
                  Total: <span className="text-danger">{formatearCLP(total)}</span>
                </span>

                <Link
                  to="/checkout"
                  className="btn btn-danger fw-bold"
                  onClick={alCerrar}
                >
                  Ir al Checkout <i className="bi bi-arrow-right ms-1"></i>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CarritoModal;
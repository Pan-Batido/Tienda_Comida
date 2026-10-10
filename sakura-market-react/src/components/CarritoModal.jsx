import React from 'react';

export function CarritoModal({ 
  mostrando, 
  alCerrar, 
  items, 
  alModificarCantidad, 
  alEliminarItem, 
  alVaciarCarrito,
  alFinalizarCompra 
}) {
  if (!mostrando) return null;

  const total = items.reduce((suma, item) => suma + item.precio * item.cantidad, 0);

  return (
    <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content border-0 shadow">
          <div className="modal-header bg-sakura text-white">
            <h5 className="modal-title fw-bold">
              <i className="bi bi-cart-fill me-2"></i>Tu Carrito de Compras
            </h5>
            <button 
              type="button" 
              className="btn-close btn-close-white" 
              onClick={alCerrar}
            ></button>
          </div>

          <div className="modal-body p-4">
            {items.length === 0 ? (
              <div className="text-center py-5">
                <i className="bi bi-cart-x text-muted display-1"></i>
                <p className="mt-3 fs-5 text-muted">Tu carrito está vacío 🌸</p>
              </div>
            ) : (
              <>
                <div className="table-responsive">
                  <table className="table align-middle">
                    <thead>
                      <tr>
                        <th>Producto</th>
                        <th>Precio</th>
                        <th className="text-center">Cantidad</th>
                        <th>Subtotal</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item) => (
                        <tr key={item.id}>
                          <td>
                            <div className="d-flex align-items-center gap-3">
                              <img 
                                src={item.imagen} 
                                alt={item.nombre} 
                                style={{ width: '48px', height: '48px', objectFit: 'contain' }} 
                              />
                              <span className="fw-semibold text-dark">{item.nombre}</span>
                            </div>
                          </td>
                          <td>${item.precio.toLocaleString('es-CL')}</td>
                          <td>
                            <div className="d-flex justify-content-center align-items-center gap-2">
                              <button 
                                className="btn btn-sm btn-outline-secondary"
                                onClick={() => alModificarCantidad(item.id, -1)}
                              >
                                -
                              </button>
                              <span className="fw-bold px-2">{item.cantidad}</span>
                              <button 
                                className="btn btn-sm btn-outline-secondary"
                                onClick={() => alModificarCantidad(item.id, 1)}
                              >
                                +
                              </button>
                            </div>
                          </td>
                          <td className="fw-bold text-success">
                            ${(item.precio * item.cantidad).toLocaleString('es-CL')}
                          </td>
                          <td>
                            <button 
                              className="btn btn-sm btn-outline-danger"
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

                <div className="d-flex justify-content-between align-items-center mt-4 pt-3 border-top">
                  <button 
                    className="btn btn-outline-danger btn-sm"
                    onClick={alVaciarCarrito}
                  >
                    <i className="bi bi-trash me-1"></i> Vaciar Carrito
                  </button>
                  <div className="text-end">
                    <span className="fs-5 fw-bold me-2">Total:</span>
                    <span className="fs-4 fw-bold text-success">${total.toLocaleString('es-CL')}</span>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="modal-footer bg-light">
            <button className="btn btn-secondary" onClick={alCerrar}>
              Seguir Comprando
            </button>
            {items.length > 0 && (
              <button 
                className="btn btn-carrito-matcha fw-bold"
                onClick={alFinalizarCompra}
              >
                Finalizar Compra
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
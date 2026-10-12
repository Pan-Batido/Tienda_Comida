import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Checkout({ carrito, alVaciarCarrito }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    direccion: '',
    ciudad: 'Santiago',
    metodoPago: 'webpay'
  });

  const formatearCLP = (monto) => {
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(monto);
  };

  const subtotal = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  const envio = subtotal > 0 ? 2990 : 0;
  const total = subtotal + envio;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simular procesamiento exitoso o error
    if (formData.metodoPago === 'error_simulado') {
      navigate('/pago-error');
    } else {
      alVaciarCarrito();
      navigate('/pago-exitoso');
    }
  };

  return (
    <div className="container py-5">
      <h1 className="fw-bold text-danger mb-4">
        <i className="bi bi-credit-card-2-front me-2"></i>Finalizar Compra
      </h1>

      <div className="row g-4">
        {/* Formulario de Despacho y Pago */}
        <div className="col-lg-7">
          <div className="card border-0 shadow-sm p-4 rounded-3">
            <h5 className="fw-bold text-dark mb-3">Datos de Envío</h5>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-bold small text-muted">Nombre Completo</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  placeholder="Juan Pérez"
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold small text-muted">Correo Electrónico</label>
                <input
                  type="email"
                  className="form-control"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="juan.perez@correo.com"
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold small text-muted">Dirección de Despacho</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  value={formData.direccion}
                  onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
                  placeholder="Av. Providencia 1234, Depto 501"
                />
              </div>

              <h5 className="fw-bold text-dark mt-4 mb-3">Método de Pago</h5>
              <div className="mb-3">
                <div className="form-check mb-2">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="metodoPago"
                    id="webpay"
                    value="webpay"
                    checked={formData.metodoPago === 'webpay'}
                    onChange={(e) => setFormData({ ...formData, metodoPago: e.target.value })}
                  />
                  <label className="form-check-label fw-semibold" htmlFor="webpay">
                    Webpay Plus (Débito / Crédito)
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="metodoPago"
                    id="transferencia"
                    value="transferencia"
                    checked={formData.metodoPago === 'transferencia'}
                    onChange={(e) => setFormData({ ...formData, metodoPago: e.target.value })}
                  />
                  <label className="form-check-label fw-semibold" htmlFor="transferencia">
                    Transferencia Bancaria Directa
                  </label>
                </div>
              </div>

              <button type="submit" className="btn btn-danger w-100 fw-bold py-2 mt-3">
                Pagar {formatearCLP(total)} <i className="bi bi-shield-lock-fill ms-1"></i>
              </button>
            </form>
          </div>
        </div>

        {/* Resumen lateral */}
        <div className="col-lg-5">
          <div className="card border-0 shadow-sm p-4 rounded-3 bg-light">
            <h5 className="fw-bold text-dark mb-3">Resumen de la Orden</h5>
            <ul className="list-group list-group-flush mb-3">
              {carrito.map((item) => (
                <li key={item.id} className="list-group-item bg-transparent d-flex justify-content-between px-0">
                  <div>
                    <span className="fw-semibold text-dark">{item.nombre}</span>
                    <small className="text-muted d-block">Cant: {item.cantidad}</small>
                  </div>
                  <span className="fw-bold">{formatearCLP(item.precio * item.cantidad)}</span>
                </li>
              ))}
            </ul>
            <div className="d-flex justify-content-between mb-2">
              <span className="text-muted">Subtotal:</span>
              <span className="fw-semibold">{formatearCLP(subtotal)}</span>
            </div>
            <div className="d-flex justify-content-between mb-3">
              <span className="text-muted">Envío:</span>
              <span className="fw-semibold">{formatearCLP(envio)}</span>
            </div>
            <hr />
            <div className="d-flex justify-content-between">
              <span className="fs-5 fw-bold text-dark">Total a Pagar:</span>
              <span className="fs-5 fw-bold text-danger">{formatearCLP(total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
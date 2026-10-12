import React from 'react';
import { Link } from 'react-router-dom';

export function PagoExitoso() {
  return (
    <div className="container py-5 text-center">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card border-0 shadow-sm p-5 rounded-3">
            <div className="mb-3">
              <i className="bi bi-check-circle-fill text-success" style={{ fontSize: '4rem' }}></i>
            </div>
            <h2 className="fw-bold text-dark mb-2">¡Pago Confirmado!</h2>
            <p className="text-muted mb-4">
              Hemos recibido tu pedido con éxito. Te enviamos los detalles de la transacción y el código de seguimiento a tu correo electrónico.
            </p>
            <div className="bg-light p-3 rounded mb-4">
              <small className="text-muted d-block">Número de Orden:</small>
              <span className="fw-bold text-danger fs-5">#SAK-{Math.floor(100000 + Math.random() * 900000)}</span>
            </div>
            <Link to="/productos" className="btn btn-danger fw-bold py-2">
              Volver a la Tienda <i className="bi bi-house-door-fill ms-1"></i>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PagoExitoso;
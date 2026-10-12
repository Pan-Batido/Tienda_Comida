import React from 'react';
import { Link } from 'react-router-dom';

export function PagoError() {
  return (
    <div className="container py-5 text-center">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card border-0 shadow-sm p-5 rounded-3">
            <div className="mb-3">
              <i className="bi bi-x-circle-fill text-danger" style={{ fontSize: '4rem' }}></i>
            </div>
            <h2 className="fw-bold text-dark mb-2">No se pudo procesar el pago</h2>
            <p className="text-muted mb-4">
              Ocurrió un inconveniente con el método de pago seleccionado. Por favor, verifica tus datos o intenta con otro medio de pago.
            </p>
            <div className="d-flex gap-3 justify-content-center">
              <Link to="/checkout" className="btn btn-danger fw-bold py-2">
                Reintentar Pago <i className="bi bi-arrow-counterclockwise ms-1"></i>
              </Link>
              <Link to="/contacto" className="btn btn-outline-secondary fw-bold py-2">
                Soporte
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PagoError;
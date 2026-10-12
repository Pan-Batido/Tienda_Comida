import React from 'react';

export function NotificacionToast({ mensaje, mostrar, alCerrar, tipo = 'success' }) {
  if (!mostrar) return null;

  const bgClass = tipo === 'success' ? 'bg-success' : tipo === 'danger' ? 'bg-danger' : 'bg-primary';

  return (
    <div className="toast-container position-fixed bottom-0 end-0 p-3" style={{ zIndex: 1100 }}>
      <div 
        className={`toast show align-items-center text-white ${bgClass} border-0 shadow-lg`} 
        role="alert" 
        aria-live="assertive" 
        aria-atomic="true"
      >
        <div className="d-flex">
          <div className="toast-body d-flex align-items-center gap-2 fw-semibold">
            {tipo === 'success' && <i className="bi bi-check-circle-fill fs-5"></i>}
            {tipo === 'danger' && <i className="bi bi-exclamation-triangle-fill fs-5"></i>}
            {tipo === 'info' && <i className="bi bi-info-circle-fill fs-5"></i>}
            <span>{mensaje}</span>
          </div>
          <button
            type="button"
            className="btn-close btn-close-white me-2 m-auto"
            onClick={alCerrar}
            aria-label="Cerrar"
          ></button>
        </div>
      </div>
    </div>
  );
}

export default NotificacionToast;
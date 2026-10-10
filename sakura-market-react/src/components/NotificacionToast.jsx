import React from 'react';

export function NotificacionToast({ mensaje, visible }) {
  if (!visible) return null;

  return (
    <div className="toast-container position-fixed bottom-0 end-0 p-3" style={{ zIndex: 1100 }}>
      <div className="toast show align-items-center text-white toast-matcha border-0 shadow" role="alert">
        <div className="d-flex">
          <div className="toast-body fs-6 fw-semibold">
            {mensaje}
          </div>
        </div>
      </div>
    </div>
  );
}
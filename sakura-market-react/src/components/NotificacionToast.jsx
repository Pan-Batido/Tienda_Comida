import React from 'react';

export function NotificacionToast({ mensaje, visible }) {
  if (!visible) return null;

  return (
    <div className="toast-container position-fixed bottom-0 end-0 p-3" style={{ zIndex: 2000 }}>
      <div 
        className="toast show align-items-center border-0 shadow-lg p-2 rounded-3" 
        style={{ backgroundColor: '#3f5135', color: '#ffffff' }}
        role="alert"
      >
        <div className="d-flex align-items-center">
          <div className="toast-body fs-6 fw-bold text-white">
            {mensaje}
          </div>
        </div>
      </div>
    </div>
  );
}
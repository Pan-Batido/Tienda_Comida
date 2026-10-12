import React, { useState } from 'react';

export function Contacto() {
  const [enviado, setEnviado] = useState(false);
  const [formData, setFormData] = useState({ nombre: '', email: '', mensaje: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setEnviado(true);
    setFormData({ nombre: '', email: '', mensaje: '' });
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card border-0 shadow-sm p-4 rounded-3">
            <h2 className="fw-bold text-danger text-center mb-3">
              <i className="bi bi-envelope-heart me-2"></i>Contáctanos
            </h2>
            <p className="text-muted text-center mb-4">
              ¿Tienes alguna pregunta o duda sobre un pedido? Envíanos un mensaje y te responderemos lo antes posible.
            </p>

            {enviado && (
              <div className="alert alert-success d-flex align-items-center gap-2 mb-4" role="alert">
                <i className="bi bi-check-circle-fill fs-5"></i>
                <div>¡Mensaje enviado con éxito! Te responderemos a la brevedad.</div>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-bold">Nombre Completo</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  placeholder="Tu nombre"
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Correo Electrónico</label>
                <input
                  type="email"
                  className="form-control"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="nombre@ejemplo.com"
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Mensaje</label>
                <textarea
                  className="form-control"
                  rows="4"
                  required
                  value={formData.mensaje}
                  onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                  placeholder="Escribe tu consulta aquí..."
                ></textarea>
              </div>

              <button type="submit" className="btn btn-danger w-100 fw-bold py-2">
                Enviar Consulta <i className="bi bi-send ms-1"></i>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contacto;
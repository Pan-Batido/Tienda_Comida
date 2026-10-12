import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as dbModule from '../data/db';

export function Registro() {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [exito, setExito] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    // Obtener usuarios usando la función exportada de db.js
    const obtenerUsuarios = dbModule.obtenerUsuarios || dbModule.getUsuarios || (() => []);
    const usuariosExistentes = obtenerUsuarios();
    
    const yaExiste = usuariosExistentes.some((u) => u.email.toLowerCase() === email.toLowerCase());

    if (yaExiste) {
      setError('El correo electrónico ya se encuentra registrado.');
      return;
    }

    const nuevoUsuario = {
      id: Date.now(),
      nombre,
      email,
      password,
      rol: 'cliente'
    };

    // Intentar guardar usuario según el nombre exacto de la función en db.js
    if (typeof dbModule.guardarUsuario === 'function') {
      dbModule.guardarUsuario(nuevoUsuario);
    } else if (typeof dbModule.agregarUsuario === 'function') {
      dbModule.agregarUsuario(nuevoUsuario);
    } else if (typeof dbModule.crearUsuario === 'function') {
      dbModule.crearUsuario(nuevoUsuario);
    } else {
      // Si no existe la función en db.js, guardamos directamente en localStorage
      const listaActualizada = [...usuariosExistentes, nuevoUsuario];
      localStorage.setItem('sakura_usuarios', JSON.stringify(listaActualizada));
    }

    setExito(true);

    setTimeout(() => {
      navigate('/login');
    }, 1500);
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-5">
          <div className="card border-0 shadow-sm p-4 rounded-3">
            <div className="text-center mb-4">
              <h2 className="fw-bold text-danger mb-1">
                <i className="bi bi-person-plus-fill me-2"></i>Crear Cuenta
              </h2>
              <p className="text-muted small">Únete a la comunidad de Sakura Market</p>
            </div>

            {error && (
              <div className="alert alert-danger d-flex align-items-center gap-2 mb-3" role="alert">
                <i className="bi bi-exclamation-triangle-fill fs-5"></i>
                <div className="small">{error}</div>
              </div>
            )}

            {exito && (
              <div className="alert alert-success d-flex align-items-center gap-2 mb-3" role="alert">
                <i className="bi bi-check-circle-fill fs-5"></i>
                <div className="small">¡Cuenta creada con éxito! Redirigiendo al Login...</div>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-bold small text-muted">Nombre Completo</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  placeholder="Tu nombre y apellido"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold small text-muted">Correo Electrónico</label>
                <input
                  type="email"
                  className="form-control"
                  required
                  placeholder="nombre@ejemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold small text-muted">Contraseña</label>
                <input
                  type="password"
                  className="form-control"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label className="form-label fw-bold small text-muted">Confirmar Contraseña</label>
                <input
                  type="password"
                  className="form-control"
                  required
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              <button type="submit" className="btn btn-danger w-100 fw-bold py-2 mb-3">
                Registrarse <i className="bi bi-check-lg ms-1"></i>
              </button>
            </form>

            <div className="text-center border-top pt-3 mt-2">
              <span className="text-muted small me-2">¿Ya tienes cuenta?</span>
              <Link to="/login" className="fw-bold text-danger text-decoration-none small">
                Inicia sesión aquí
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registro;
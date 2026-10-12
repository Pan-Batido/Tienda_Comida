import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { obtenerUsuarios } from '../data/db';

export function Login({ alIniciarSesion }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const usuarios = obtenerUsuarios();
    const usuarioEncontrado = usuarios.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (usuarioEncontrado) {
      // Guardar usuario en sesión o estado global
      if (alIniciarSesion) {
        alIniciarSesion(usuarioEncontrado);
      }
      
      // Si es admin, redirigir al panel de administración; de lo contrario a Inicio
      if (usuarioEncontrado.rol === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } else {
      setError('Correo electrónico o contraseña incorrectos.');
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-5">
          <div className="card border-0 shadow-sm p-4 rounded-3">
            <div className="text-center mb-4">
              <h2 className="fw-bold text-danger mb-1">
                <i className="bi bi-box-arrow-in-right me-2"></i>Iniciar Sesión
              </h2>
              <p className="text-muted small">Accede a tu cuenta de Sakura Market</p>
            </div>

            {error && (
              <div className="alert alert-danger d-flex align-items-center gap-2 mb-3" role="alert">
                <i className="bi bi-exclamation-triangle-fill fs-5"></i>
                <div className="small">{error}</div>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-bold small text-muted">Correo Electrónico</label>
                <div className="input-group">
                  <span className="input-group-text bg-light text-muted border-end-0">
                    <i className="bi bi-envelope"></i>
                  </span>
                  <input
                    type="email"
                    className="form-control border-start-0"
                    required
                    placeholder="ejemplo@correo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label fw-bold small text-muted">Contraseña</label>
                <div className="input-group">
                  <span className="input-group-text bg-light text-muted border-end-0">
                    <i className="bi bi-lock"></i>
                  </span>
                  <input
                    type="password"
                    className="form-control border-start-0"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-danger w-100 fw-bold py-2 mb-3">
                Ingresar <i className="bi bi-arrow-right ms-1"></i>
              </button>
            </form>

            <div className="text-center border-top pt-3 mt-2">
              <span className="text-muted small me-2">¿No tienes una cuenta aún?</span>
              <Link to="/registro" className="fw-bold text-danger text-decoration-none small">
                Regístrate aquí
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
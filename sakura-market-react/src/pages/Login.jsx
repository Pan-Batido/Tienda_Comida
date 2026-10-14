import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { obtenerUsuarios } from '../data/db';

export function Login() {
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
      // 1. Guardar el usuario activo en localStorage
      localStorage.setItem('sakura_usuario_activo', JSON.stringify(usuarioEncontrado));

      // 2. Disparar el evento de autenticación para que el Navbar reaccione de inmediato
      window.dispatchEvent(new Event('sakura_auth_change'));

      // 3. Redirigir según el rol
      if (usuarioEncontrado.rol === 'ADMIN' || usuarioEncontrado.rol === 'admin') {
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
        <div className="col-12 col-md-6 col-lg-4">
          <div className="card border-0 shadow-sm p-4 rounded-3">
            <div className="text-center mb-4">
              <h2 className="fw-bold text-danger mb-1">
                <i className="bi bi-box-arrow-in-right me-2"></i>Iniciar Sesión
              </h2>
              <p className="text-muted small">Ingresa tus datos para continuar</p>
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
                <input
                  type="email"
                  className="form-control"
                  required
                  placeholder="nombre@ejemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="mb-4">
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

              <button type="submit" className="btn btn-danger w-100 fw-bold py-2 mb-3">
                Ingresar <i className="bi bi-arrow-right-short ms-1"></i>
              </button>
            </form>

            <div className="text-center border-top pt-3 mt-2">
              <span className="text-muted small me-2">¿No tienes cuenta?</span>
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
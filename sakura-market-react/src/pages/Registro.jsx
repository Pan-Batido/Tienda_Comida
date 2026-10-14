import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { obtenerUsuarios } from '../data/db';

export function Registro() {
  const navigate = useNavigate();
  
  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [calle, setCalle] = useState('');
  const [departamento, setDepartamento] = useState('');
  const [region, setRegion] = useState('Región Metropolitana de Santiago');
  const [comuna, setComuna] = useState('Cerrillos');
  const [indicaciones, setIndicaciones] = useState('');

  const [error, setError] = useState('');
  const [exito, setExito] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    const usuariosExistentes = obtenerUsuarios();
    const yaExiste = usuariosExistentes.some(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );

    if (yaExiste) {
      setError('El correo electrónico ya se encuentra registrado.');
      return;
    }

    const nuevoUsuario = {
      id: Date.now(),
      nombre,
      apellidos,
      email,
      password,
      direccion: {
        calle,
        departamento,
        region,
        comuna,
        indicaciones
      },
      rol: 'USER'
    };

    const listaActualizada = [...usuariosExistentes, nuevoUsuario];
    localStorage.setItem('sakura_usuarios', JSON.stringify(listaActualizada));

    setExito(true);
    setTimeout(() => {
      navigate('/login');
    }, 1500);
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-8">
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
              <h5 className="fw-bold text-danger mb-3 border-bottom pb-2">Información Personal</h5>
              
              <div className="row g-3 mb-3">
                <div className="col-12 col-md-6">
                  <label className="form-label fw-bold small text-muted">Nombre*</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    placeholder="Tu nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                  />
                </div>
                <div className="col-12 col-md-6">
                  <label className="form-label fw-bold small text-muted">Apellidos*</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    placeholder="Tus apellidos"
                    value={apellidos}
                    onChange={(e) => setApellidos(e.target.value)}
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold small text-muted">Correo Electrónico*</label>
                <input
                  type="email"
                  className="form-control"
                  required
                  placeholder="nombre@ejemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="row g-3 mb-4">
                <div className="col-12 col-md-6">
                  <label className="form-label fw-bold small text-muted">Contraseña*</label>
                  <input
                    type="password"
                    className="form-control"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="col-12 col-md-6">
                  <label className="form-label fw-bold small text-muted">Confirmar Contraseña*</label>
                  <input
                    type="password"
                    className="form-control"
                    required
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>

              <h5 className="fw-bold text-danger mb-3 border-bottom pb-2">Dirección de entrega de los productos</h5>
              
              <div className="row g-3 mb-3">
                <div className="col-12 col-md-8">
                  <label className="form-label fw-bold small text-muted">Calle*</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    placeholder="Ej. Av. Pedro de Valdivia 1234"
                    value={calle}
                    onChange={(e) => setCalle(e.target.value)}
                  />
                </div>
                <div className="col-12 col-md-4">
                  <label className="form-label fw-bold small text-muted">Departamento (opcional)</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Ej. 603"
                    value={departamento}
                    onChange={(e) => setDepartamento(e.target.value)}
                  />
                </div>
              </div>

              <div className="row g-3 mb-3">
                <div className="col-12 col-md-6">
                  <label className="form-label fw-bold small text-muted">Región*</label>
                  <select
                    className="form-select"
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                  >
                    <option value="Región Metropolitana de Santiago">Región Metropolitana de Santiago</option>
                    <option value="Valparaíso">Valparaíso</option>
                    <option value="Bío-Bío">Bío-Bío</option>
                  </select>
                </div>
                <div className="col-12 col-md-6">
                  <label className="form-label fw-bold small text-muted">Comuna*</label>
                  <select
                    className="form-select"
                    value={comuna}
                    onChange={(e) => setComuna(e.target.value)}
                  >
                    <option value="Cerrillos">Cerrillos</option>
                    <option value="Santiago">Santiago</option>
                    <option value="Providencia">Providencia</option>
                    <option value="Maipú">Maipú</option>
                    <option value="La Florida">La Florida</option>
                  </select>
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label fw-bold small text-muted">Indicaciones para la entrega (opcional)</label>
                <textarea
                  className="form-control"
                  rows="2"
                  placeholder="Ej. Entre calles, color del edificio, dejar con el conserje"
                  value={indicaciones}
                  onChange={(e) => setIndicaciones(e.target.value)}
                ></textarea>
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
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export function Checkout({ carrito, alVaciarCarrito }) {
  const navigate = useNavigate();

  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [correo, setCorreo] = useState('');

  const [calle, setCalle] = useState('');
  const [departamento, setDepartamento] = useState('');
  const [region, setRegion] = useState('Región Metropolitana de Santiago');
  const [comuna, setComuna] = useState('Cerrillos');
  const [indicaciones, setIndicaciones] = useState('');

  useEffect(() => {
    const usuarioActivoStr = localStorage.getItem('sakura_usuario_activo');
    if (usuarioActivoStr) {
      try {
        const usuario = JSON.parse(usuarioActivoStr);
        setNombre(usuario.nombre || '');
        setApellidos(usuario.apellidos || '');
        setCorreo(usuario.email || '');

        if (usuario.direccion) {
          setCalle(usuario.direccion.calle || '');
          setDepartamento(usuario.direccion.departamento || '');
          setRegion(usuario.direccion.region || 'Región Metropolitana de Santiago');
          setComuna(usuario.direccion.comuna || 'Cerrillos');
          setIndicaciones(usuario.direccion.indicaciones || '');
        }
      } catch (err) {
        console.error("Error al cargar datos del usuario activo:", err);
      }
    }
  }, []);

  const totalCalculado = carrito.reduce(
    (sum, item) => sum + item.precio * item.cantidad,
    0
  );

  const formatearCLP = (monto) => {
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(monto);
  };

  const handlePagar = (e) => {
    e.preventDefault();

    const orden = {
      nroOrden: Math.floor(10000000 + Math.random() * 90000000),
      cliente: { nombre, apellidos, correo },
      direccion: { calle, departamento, region, comuna, indicaciones },
      items: carrito,
      total: totalCalculado
    };

    localStorage.setItem('sakura_ultima_orden', JSON.stringify(orden));
    alVaciarCarrito();
    navigate('/pago-exitoso');
  };

  if (carrito.length === 0) {
    return (
      <div className="container py-5 text-center">
        <i className="bi bi-cart-x fs-1 text-muted d-block mb-3"></i>
        <h3 className="fw-bold text-dark mb-3">El carrito está vacío</h3>
        <p className="text-muted mb-4">Agrega productos al carrito antes de proceder al pago.</p>
        <Link to="/productos" className="btn btn-danger fw-bold">
          Ver Catálogo
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-8">
          <div className="card border-0 shadow-sm p-4 rounded-3 bg-white">
            
            {/* Header del Carrito de compra */}
            <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-4">
              <div>
                <h3 className="fw-bold mb-1 text-dark">Carrito de compra</h3>
                <span className="text-muted small">Completa la siguiente información</span>
              </div>
              <div className="badge bg-danger fs-6 px-3 py-2 rounded-pill">
                Total a pagar: {formatearCLP(totalCalculado)}
              </div>
            </div>

            {/* Tabla resumen de items */}
            <div className="table-responsive mb-4">
              <table className="table align-middle">
                <thead className="table-light">
                  <tr>
                    <th>Imagen</th>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {carrito.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <img
                          src={item.imagen}
                          alt={item.nombre}
                          className="rounded object-fit-cover"
                          style={{ width: '40px', height: '40px' }}
                        />
                      </td>
                      <td className="fw-semibold text-dark">{item.nombre}</td>
                      <td>{formatearCLP(item.precio)}</td>
                      <td>{item.cantidad}</td>
                      <td className="fw-bold text-danger">{formatearCLP(item.precio * item.cantidad)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <form onSubmit={handlePagar}>
              {/* Información del Cliente */}
              <div className="mb-4">
                <h5 className="fw-bold mb-1 text-danger">Información del cliente</h5>
                <p className="text-muted small mb-3">Completa la siguiente información</p>

                <div className="row g-3">
                  <div className="col-12 col-md-6">
                    <label className="form-label small text-muted fw-semibold">Nombre*</label>
                    <input
                      type="text"
                      className="form-control"
                      required
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label small text-muted fw-semibold">Apellidos*</label>
                    <input
                      type="text"
                      className="form-control"
                      required
                      value={apellidos}
                      onChange={(e) => setApellidos(e.target.value)}
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label small text-muted fw-semibold">Correo*</label>
                    <input
                      type="email"
                      className="form-control"
                      required
                      value={correo}
                      onChange={(e) => setCorreo(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Dirección de entrega */}
              <div className="mb-4">
                <h5 className="fw-bold mb-1 text-danger">Dirección de entrega de los productos</h5>
                <p className="text-muted small mb-3">Ingrese dirección de forma detallada</p>

                <div className="row g-3 mb-3">
                  <div className="col-12 col-md-8">
                    <label className="form-label small text-muted fw-semibold">Calle*</label>
                    <input
                      type="text"
                      className="form-control"
                      required
                      value={calle}
                      onChange={(e) => setCalle(e.target.value)}
                    />
                  </div>
                  <div className="col-12 col-md-4">
                    <label className="form-label small text-muted fw-semibold">Departamento (opcional)</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Ej: 603"
                      value={departamento}
                      onChange={(e) => setDepartamento(e.target.value)}
                    />
                  </div>
                </div>

                <div className="row g-3 mb-3">
                  <div className="col-12 col-md-6">
                    <label className="form-label small text-muted fw-semibold">Región*</label>
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
                    <label className="form-label small text-muted fw-semibold">Comuna*</label>
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

                <div className="mb-3">
                  <label className="form-label small text-muted fw-semibold">Indicaciones para la entrega (opcional)</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    placeholder="Ej.: Entre calles, color del edificio, no tiene timbre."
                    value={indicaciones}
                    onChange={(e) => setIndicaciones(e.target.value)}
                  ></textarea>
                </div>
              </div>

              {/* Botón de Pago Matcha/Verde */}
              <div className="d-flex justify-content-end">
                <button type="submit" className="btn btn-danger btn-lg px-4 fw-bold">
                  Pagar ahora {formatearCLP(totalCalculado)}
                </button>
              </div>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
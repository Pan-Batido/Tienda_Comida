import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api, getUsuarioActivo, clearSession } from '../services/api';

export function AdminProductos() {
  const navigate = useNavigate();
  const usuario = getUsuarioActivo();
  const esAdmin = usuario?.rol === 'ADMINISTRADOR';
  const esVendedor = usuario?.rol === 'VENDEDOR';

  const [seccionActiva, setSeccionActiva] = useState(esVendedor ? 'ordenes' : 'dashboard');
  const [productos, setProductos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [ordenes, setOrdenes] = useState([]);
  const [listaCategorias, setListaCategorias] = useState([]);
  const [boletaSeleccionada, setBoletaSeleccionada] = useState(null);
  const [productoDetalle, setProductoDetalle] = useState(null);

  // Formulario Producto (Solo Administrador)
  const [modoEdicion, setModoEdicion] = useState(false);
  const [idEditando, setIdEditando] = useState(null);
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [categoria, setCategoria] = useState('Comida');
  const [stock, setStock] = useState('');
  const [imagen, setImagen] = useState('');

  // Formulario Categoría (Solo Administrador)
  const [nuevaCategoria, setNuevaCategoria] = useState('');
  const [notificacion, setNotificacion] = useState('');

  useEffect(() => {
    if (!usuario || (!esAdmin && !esVendedor)) {
      navigate('/login');
      return;
    }
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      const [prods, cats, bols] = await Promise.all([
        api.obtenerProductos(),
        api.obtenerCategorias(),
        api.obtenerBoletas(),
      ]);
      setProductos(prods);
      setListaCategorias(cats);
      setOrdenes(bols);

      if (esAdmin) {
        const usrs = await api.obtenerUsuarios();
        setUsuarios(usrs);
      }
    } catch (err) {
      console.error('Error cargando datos del panel:', err);
    }
  };

  const mostrarMensaje = (msg) => {
    setNotificacion(msg);
    setTimeout(() => setNotificacion(''), 3000);
  };

  const formatearCLP = (monto) => {
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(monto || 0);
  };

  const handleCerrarSesion = () => {
    clearSession();
    navigate('/login');
  };

  const handleGuardarProducto = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        nombre,
        descripcion,
        precio: Number(precio),
        categoria,
        stock: Number(stock),
        imagen: imagen || 'https://via.placeholder.com/150',
      };

      if (modoEdicion) {
        await api.actualizarProducto(idEditando, payload);
        mostrarMensaje('✅ Producto actualizado en MySQL');
      } else {
        await api.crearProducto(payload);
        mostrarMensaje('🎉 Producto registrado en MySQL');
      }
      limpiarFormulario();
      cargarDatos();
    } catch (err) {
      mostrarMensaje('❌ ' + err.message);
    }
  };

  const handleEditarProducto = (p) => {
    setModoEdicion(true);
    setIdEditando(p.id);
    setNombre(p.nombre);
    setDescripcion(p.descripcion || '');
    setPrecio(p.precio);
    setCategoria(p.categoria);
    setStock(p.stock);
    setImagen(p.imagen || '');
    setSeccionActiva('productos');
  };

  const handleEliminarProducto = async (id) => {
    if (window.confirm('¿Deseas eliminar este producto del inventario?')) {
      try {
        await api.eliminarProducto(id);
        mostrarMensaje('🗑️ Producto eliminado');
        cargarDatos();
      } catch (err) {
        mostrarMensaje('❌ ' + err.message);
      }
    }
  };

  const limpiarFormulario = () => {
    setModoEdicion(false);
    setIdEditando(null);
    setNombre('');
    setDescripcion('');
    setPrecio('');
    setCategoria(listaCategorias[0]?.nombre || 'Comida');
    setStock('');
    setImagen('');
  };

  const handleAgregarCategoria = async (e) => {
    e.preventDefault();
    if (!nuevaCategoria) return;
    try {
      await api.crearCategoria(nuevaCategoria);
      setNuevaCategoria('');
      mostrarMensaje('🏷️ Categoría añadida en MySQL');
      cargarDatos();
    } catch (err) {
      mostrarMensaje('❌ ' + err.message);
    }
  };

  const handleEliminarCategoria = async (cat) => {
    if (window.confirm(`¿Seguro que deseas eliminar la categoría "${cat.nombre}"?`)) {
      try {
        await api.eliminarCategoria(cat.id);
        mostrarMensaje(`🗑️ Categoría "${cat.nombre}" eliminada`);
        cargarDatos();
      } catch (err) {
        mostrarMensaje('❌ No se puede eliminar: tiene productos asociados');
      }
    }
  };

  const totalCompras = ordenes.reduce((acc, o) => acc + (o.total || 0), 0);
  const totalStockItems = productos.reduce((acc, p) => acc + (p.stock || 0), 0);

  return (
    <div className="container-fluid bg-light min-vh-100 p-0">
      <div className="bg-dark text-white px-4 py-2 d-flex justify-content-between align-items-center">
        <span className="fw-bold small text-white-50">
          Sakura Market — Panel de {esAdmin ? 'Administración' : 'Vendedor'} ({usuario?.nombre})
        </span>
        <Link to="/" className="btn btn-outline-light btn-sm fw-bold">
          <i className="bi bi-shop me-1"></i> Ir a la Tienda Principal
        </Link>
      </div>

      <div className="row g-0">
        {/* SIDEBAR CON CONTROL DE ROLES (ANEXO 1) */}
        <div className="col-12 col-md-3 col-lg-2 bg-white border-end min-vh-100 p-3 d-flex flex-column justify-content-between">
          <div>
            <div className="nav flex-column nav-pills gap-1 mb-4">
              {esAdmin && (
                <button
                  className={`nav-link text-start fw-bold py-2 ${seccionActiva === 'dashboard' ? 'active bg-primary' : 'text-dark'}`}
                  onClick={() => setSeccionActiva('dashboard')}
                >
                  <i className="bi bi-speedometer2 me-2"></i>Dashboard
                </button>
              )}

              {/* Vendedor y Administrador ven Órdenes y Productos */}
              <button
                className={`nav-link text-start fw-semibold py-2 ${seccionActiva === 'ordenes' ? 'active bg-primary' : 'text-dark'}`}
                onClick={() => setSeccionActiva('ordenes')}
              >
                <i className="bi bi-file-text me-2"></i>Órdenes
              </button>
              <button
                className={`nav-link text-start fw-semibold py-2 ${seccionActiva === 'productos' ? 'active bg-primary' : 'text-dark'}`}
                onClick={() => setSeccionActiva('productos')}
              >
                <i className="bi bi-cart3 me-2"></i>Productos
              </button>

              {/* Solo Administrador ve Categorías, Usuarios, Reportes y Perfil */}
              {esAdmin && (
                <>
                  <button
                    className={`nav-link text-start fw-semibold py-2 ${seccionActiva === 'categorias' ? 'active bg-primary' : 'text-dark'}`}
                    onClick={() => setSeccionActiva('categorias')}
                  >
                    <i className="bi bi-list-task me-2"></i>Categorías
                  </button>
                  <button
                    className={`nav-link text-start fw-semibold py-2 ${seccionActiva === 'usuarios' ? 'active bg-primary' : 'text-dark'}`}
                    onClick={() => setSeccionActiva('usuarios')}
                  >
                    <i className="bi bi-people me-2"></i>Usuarios
                  </button>
                  <button
                    className={`nav-link text-start fw-semibold py-2 ${seccionActiva === 'reportes' ? 'active bg-primary' : 'text-dark'}`}
                    onClick={() => setSeccionActiva('reportes')}
                  >
                    <i className="bi bi-graph-up-arrow me-2"></i>Reportes
                  </button>
                  <button
                    className={`nav-link text-start fw-semibold py-2 ${seccionActiva === 'perfil' ? 'active bg-primary' : 'text-dark'}`}
                    onClick={() => setSeccionActiva('perfil')}
                  >
                    <i className="bi bi-person-circle me-2"></i>Perfil
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="d-flex flex-column gap-2 pt-3 border-top">
            <Link to="/" className="btn btn-dark w-100 fw-bold d-flex align-items-center justify-content-center gap-2">
              <i className="bi bi-shop"></i> Tienda
            </Link>
            <button onClick={handleCerrarSesion} className="btn btn-danger w-100 fw-bold d-flex align-items-center justify-content-center gap-2">
              <i className="bi bi-box-arrow-right"></i> Cerrar Sesión
            </button>
          </div>
        </div>

        {/* CONTENIDO PRINCIPAL */}
        <div className="col-12 col-md-9 col-lg-10 p-4">
          {notificacion && (
            <div className="alert alert-info fw-bold shadow-sm mb-4" role="alert">
              {notificacion}
            </div>
          )}

          {/* DASHBOARD (Solo Admin) */}
          {esAdmin && seccionActiva === 'dashboard' && (
            <div>
              <h2 className="fw-bold text-dark mb-1">Dashboard</h2>
              <p className="text-muted small mb-4">Resumen de las actividades diarias</p>

              <div className="row g-3 mb-4">
                <div className="col-12 col-md-4">
                  <div className="card border-0 shadow-sm p-3 bg-primary text-white rounded-3">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h3 className="fw-bold mb-0">Ventas</h3>
                        <h2 className="fw-bold mb-0">{formatearCLP(totalCompras)}</h2>
                        <span className="small text-white-50">{ordenes.length} boletas emitidas</span>
                      </div>
                      <i className="bi bi-cart-fill fs-1 text-white-50"></i>
                    </div>
                  </div>
                </div>

                <div className="col-12 col-md-4">
                  <div className="card border-0 shadow-sm p-3 bg-success text-white rounded-3">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h3 className="fw-bold mb-0">Productos</h3>
                        <h2 className="fw-bold mb-0">{productos.length}</h2>
                        <span className="small text-white-50">Inventario actual: {totalStockItems}</span>
                      </div>
                      <i className="bi bi-box-seam-fill fs-1 text-white-50"></i>
                    </div>
                  </div>
                </div>

                <div className="col-12 col-md-4">
                  <div className="card border-0 shadow-sm p-3 bg-warning text-dark rounded-3">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h3 className="fw-bold mb-0">Usuarios</h3>
                        <h2 className="fw-bold mb-0">{usuarios.length}</h2>
                        <span className="small text-dark-50">Cuentas registradas</span>
                      </div>
                      <i className="bi bi-people-fill fs-1 text-dark-50"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ÓRDENES (Admin y Vendedor) */}
          {seccionActiva === 'ordenes' && (
            <div>
              <h2 className="fw-bold text-dark mb-4">Gestión de Órdenes y Boletas</h2>
              <div className="card border-0 shadow-sm p-4 rounded-3 bg-white">
                <div className="table-responsive">
                  <table className="table align-middle">
                    <thead className="table-light">
                      <tr>
                        <th>N° Orden</th>
                        <th>Cliente</th>
                        <th>Correo</th>
                        <th>Total Pagado</th>
                        <th>Acción</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ordenes.length === 0 ? (
                        <tr><td colSpan="5" className="text-center text-muted">No hay boletas registradas aún.</td></tr>
                      ) : (
                        ordenes.map((ord) => (
                          <tr key={ord.id}>
                            <td className="fw-bold">#{ord.numeroOrden}</td>
                            <td>{ord.nombreCliente} {ord.apellidosCliente}</td>
                            <td>{ord.correoCliente}</td>
                            <td className="fw-bold text-danger">{formatearCLP(ord.total)}</td>
                            <td>
                              <button className="btn btn-sm btn-danger fw-bold" onClick={() => setBoletaSeleccionada(ord)}>
                                Mostrar Boleta <i className="bi bi-receipt ms-1"></i>
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* PRODUCTOS (Admin: CRUD completo | Vendedor: Solo lista y detalle) */}
          {seccionActiva === 'productos' && (
            <div>
              <h2 className="fw-bold text-dark mb-4">
                {esAdmin ? 'Administración de Productos' : 'Catálogo e Inventario de Productos'}
              </h2>

              {esAdmin && (
                <div className="card border-0 shadow-sm p-4 rounded-3 bg-white mb-4">
                  <h5 className="fw-bold text-danger mb-3">{modoEdicion ? 'Editar Producto' : 'Crear Nuevo Producto'}</h5>
                  <form onSubmit={handleGuardarProducto}>
                    <div className="row g-3">
                      <div className="col-12 col-md-6">
                        <label className="form-label small fw-bold text-muted">Nombre*</label>
                        <input type="text" className="form-control" required value={nombre} onChange={(e) => setNombre(e.target.value)} />
                      </div>
                      <div className="col-12 col-md-3">
                        <label className="form-label small fw-bold text-muted">Precio CLP*</label>
                        <input type="number" className="form-control" required value={precio} onChange={(e) => setPrecio(e.target.value)} />
                      </div>
                      <div className="col-12 col-md-3">
                        <label className="form-label small fw-bold text-muted">Stock*</label>
                        <input type="number" className="form-control" required value={stock} onChange={(e) => setStock(e.target.value)} />
                      </div>
                      <div className="col-12 col-md-4">
                        <label className="form-label small fw-bold text-muted">Categoría*</label>
                        <select className="form-select" value={categoria} onChange={(e) => setCategoria(e.target.value)}>
                          {listaCategorias.map((c) => <option key={c.id} value={c.nombre}>{c.nombre}</option>)}
                        </select>
                      </div>
                      <div className="col-12 col-md-8">
                        <label className="form-label small fw-bold text-muted">URL Imagen*</label>
                        <input type="text" className="form-control" value={imagen} placeholder="/src/assets/img/..." onChange={(e) => setImagen(e.target.value)} />
                      </div>
                      <div className="col-12">
                        <label className="form-label small fw-bold text-muted">Descripción</label>
                        <input type="text" className="form-control" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
                      </div>
                    </div>
                    <div className="mt-3 d-flex gap-2">
                      <button type="submit" className="btn btn-danger fw-bold">{modoEdicion ? 'Actualizar' : 'Guardar'}</button>
                      {modoEdicion && <button type="button" className="btn btn-secondary fw-bold" onClick={limpiarFormulario}>Cancelar</button>}
                    </div>
                  </form>
                </div>
              )}

              <div className="card border-0 shadow-sm p-4 rounded-3 bg-white">
                <div className="table-responsive">
                  <table className="table align-middle">
                    <thead className="table-light">
                      <tr>
                        <th>Imagen</th>
                        <th>Nombre</th>
                        <th>Categoría</th>
                        <th>Precio</th>
                        <th>Stock</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {productos.map((p) => (
                        <tr key={p.id}>
                          <td><img src={p.imagen} alt={p.nombre} className="rounded object-fit-cover" style={{ width: '40px', height: '40px' }} /></td>
                          <td className="fw-bold">{p.nombre}</td>
                          <td><span className="badge bg-secondary">{p.categoria}</span></td>
                          <td className="fw-bold">{formatearCLP(p.precio)}</td>
                          <td><span className={`badge ${p.stock <= 5 ? 'bg-danger' : 'bg-success'}`}>{p.stock} un.</span></td>
                          <td>
                            <button className="btn btn-sm btn-outline-info me-2" onClick={() => setProductoDetalle(p)} title="Ver detalle">
                              <i className="bi bi-eye"></i>
                            </button>
                            {esAdmin && (
                              <>
                                <button className="btn btn-sm btn-outline-primary me-2" onClick={() => handleEditarProducto(p)}><i className="bi bi-pencil"></i></button>
                                <button className="btn btn-sm btn-outline-danger" onClick={() => handleEliminarProducto(p.id)}><i className="bi bi-trash"></i></button>
                              </>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* CATEGORÍAS (Solo Admin) */}
          {esAdmin && seccionActiva === 'categorias' && (
            <div>
              <h2 className="fw-bold text-dark mb-4">Gestión de Categorías</h2>
              <div className="card border-0 shadow-sm p-4 rounded-3 bg-white mb-4" style={{ maxWidth: '500px' }}>
                <h6 className="fw-bold text-danger mb-3">Añadir Nueva Categoría</h6>
                <form onSubmit={handleAgregarCategoria} className="d-flex gap-2">
                  <input type="text" className="form-control" placeholder="Ej: Dulces, Salsas..." value={nuevaCategoria} onChange={(e) => setNuevaCategoria(e.target.value)} required />
                  <button type="submit" className="btn btn-danger fw-bold text-nowrap">
                    <i className="bi bi-plus-lg me-1"></i> Añadir
                  </button>
                </form>
              </div>

              <div className="card border-0 shadow-sm p-4 rounded-3 bg-white">
                <div className="table-responsive">
                  <table className="table align-middle">
                    <thead className="table-light">
                      <tr>
                        <th>Nombre de Categoría</th>
                        <th>Productos Asociados</th>
                        <th className="text-end">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {listaCategorias.map((cat) => {
                        const cantidadProds = productos.filter((p) => p.categoria === cat.nombre).length;
                        return (
                          <tr key={cat.id}>
                            <td className="fw-bold text-dark">{cat.nombre}</td>
                            <td><span className="badge bg-primary rounded-pill">{cantidadProds} Productos</span></td>
                            <td className="text-end">
                              <button className="btn btn-sm btn-outline-danger fw-bold" onClick={() => handleEliminarCategoria(cat)}>
                                <i className="bi bi-trash me-1"></i> Eliminar
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* USUARIOS (Solo Admin) */}
          {esAdmin && seccionActiva === 'usuarios' && (
            <div>
              <h2 className="fw-bold text-dark mb-4">Usuarios Registrados</h2>
              <div className="card border-0 shadow-sm p-4 rounded-3 bg-white">
                <div className="table-responsive">
                  <table className="table align-middle">
                    <thead className="table-light">
                      <tr>
                        <th>Nombre</th>
                        <th>Correo</th>
                        <th>Rol</th>
                        <th>Dirección Registrada</th>
                      </tr>
                    </thead>
                    <tbody>
                      {usuarios.map((u) => (
                        <tr key={u.id}>
                          <td className="fw-bold">{u.nombre} {u.apellidos}</td>
                          <td>{u.email}</td>
                          <td><span className="badge bg-info text-dark">{u.rol}</span></td>
                          <td className="small text-muted">{u.calle || 'Sin dirección'}, {u.comuna || ''}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* REPORTES Y PERFIL (Solo Admin) */}
          {esAdmin && seccionActiva === 'reportes' && (
            <div>
              <h2 className="fw-bold text-dark mb-4">Reportes del Sistema</h2>
              <div className="card border-0 shadow-sm p-4 rounded-3 bg-white">
                <h5 className="fw-bold text-danger mb-3">Generación de Informes</h5>
                <p className="text-muted small">Ventas totales acumuladas: <strong>{formatearCLP(totalCompras)}</strong></p>
                <button className="btn btn-outline-danger fw-bold" onClick={() => window.print()}>
                  <i className="bi bi-printer me-2"></i>Imprimir Reporte
                </button>
              </div>
            </div>
          )}

          {esAdmin && seccionActiva === 'perfil' && (
            <div>
              <h2 className="fw-bold text-dark mb-4">Perfil del Administrador</h2>
              <div className="card border-0 shadow-sm p-4 rounded-3 bg-white">
                <h5 className="fw-bold mb-1">{usuario?.nombre} {usuario?.apellidos}</h5>
                <p className="text-muted small mb-3">{usuario?.email} — Rol: {usuario?.rol}</p>
                <button onClick={handleCerrarSesion} className="btn btn-danger fw-bold">Cerrar Sesión Activa</button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* MODAL DETALLE BOLETA (Admin y Vendedor) */}
      {boletaSeleccionada && (
        <div className="modal show d-block bg-dark bg-opacity-50" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content p-3">
              <div className="modal-header border-0">
                <h5 className="modal-title fw-bold text-danger">Boleta Electrónica #{boletaSeleccionada.numeroOrden}</h5>
                <button type="button" className="btn-close" onClick={() => setBoletaSeleccionada(null)}></button>
              </div>
              <div className="modal-body">
                <p className="small text-muted mb-1">Cliente: <strong>{boletaSeleccionada.nombreCliente} {boletaSeleccionada.apellidosCliente}</strong></p>
                <p className="small text-muted mb-1">Correo: {boletaSeleccionada.correoCliente}</p>
                <p className="small text-muted mb-3">Entrega: {boletaSeleccionada.calleEntrega}, {boletaSeleccionada.comunaEntrega}</p>
                <ul className="list-group list-group-flush mb-3">
                  {boletaSeleccionada.detalles?.map((det) => (
                    <li key={det.id} className="list-group-item d-flex justify-content-between align-items-center px-0">
                      <span>{det.producto?.nombre} x{det.cantidad}</span>
                      <strong className="text-dark">{formatearCLP(det.subtotal)}</strong>
                    </li>
                  ))}
                </ul>
                <div className="d-flex justify-content-between align-items-center fw-bold fs-5 text-danger pt-2 border-top">
                  <span>Total:</span>
                  <span>{formatearCLP(boletaSeleccionada.total)}</span>
                </div>
              </div>
              <div className="modal-footer border-0">
                <button className="btn btn-secondary fw-bold" onClick={() => setBoletaSeleccionada(null)}>Cerrar</button>
                <button className="btn btn-danger fw-bold" onClick={() => window.print()}>Imprimir</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL DETALLE PRODUCTO (Admin y Vendedor) */}
      {productoDetalle && (
        <div className="modal show d-block bg-dark bg-opacity-50" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content p-3">
              <div className="modal-header border-0">
                <h5 className="modal-title fw-bold text-danger">{productoDetalle.nombre}</h5>
                <button type="button" className="btn-close" onClick={() => setProductoDetalle(null)}></button>
              </div>
              <div className="modal-body">
                <p className="mb-1"><strong>Categoría:</strong> {productoDetalle.categoria}</p>
                <p className="mb-1"><strong>Precio:</strong> {formatearCLP(productoDetalle.precio)}</p>
                <p className="mb-1"><strong>Stock disponible:</strong> {productoDetalle.stock} unidades</p>
                <p className="text-muted small mt-2">{productoDetalle.descripcion}</p>
              </div>
              <div className="modal-footer border-0">
                <button className="btn btn-secondary fw-bold" onClick={() => setProductoDetalle(null)}>Cerrar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminProductos;
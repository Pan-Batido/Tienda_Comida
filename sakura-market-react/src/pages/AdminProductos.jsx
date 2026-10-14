import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { obtenerProductos, obtenerUsuarios } from '../data/db';

export function AdminProductos() {
  const navigate = useNavigate();
  const [seccionActiva, setSeccionActiva] = useState('dashboard');
  const [productos, setProductos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [ordenes, setOrdenes] = useState([]);
  const [boletaSeleccionada, setBoletaSeleccionada] = useState(null);

  // Formulario Producto (ABM)
  const [modoEdicion, setModoEdicion] = useState(false);
  const [idEditando, setIdEditando] = useState(null);
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [categoria, setCategoria] = useState('Ramen');
  const [stock, setStock] = useState('');
  const [imagen, setImagen] = useState('');

  // Formulario Categoría
  const [nuevaCategoria, setNuevaCategoria] = useState('');
  const [listaCategorias, setListaCategorias] = useState(['Ramen', 'Snacks', 'Bebidas', 'Salsas']);

  // Notificación Toast interna
  const [notificacion, setNotificacion] = useState('');

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = () => {
    // Cargar productos con fallback a db.js
    const prodsGuardados = localStorage.getItem('sakura_productos');
    if (prodsGuardados) {
      try {
        setProductos(JSON.parse(prodsGuardados));
      } catch (e) {
        setProductos(obtenerProductos() || []);
      }
    } else {
      const prods = obtenerProductos() || [];
      setProductos(prods);
      localStorage.setItem('sakura_productos', JSON.stringify(prods));
    }

    const usrs = obtenerUsuarios() || [];
    setUsuarios(usrs);

    // Cargar orden previa o datos de muestra
    const ultimaOrden = localStorage.getItem('sakura_ultima_orden');
    if (ultimaOrden) {
      try {
        setOrdenes([JSON.parse(ultimaOrden)]);
      } catch (e) {
        console.error(e);
      }
    } else {
      setOrdenes([
        {
          nroOrden: 20240705,
          fecha: '14/10/2026',
          cliente: { nombre: 'Pedro', apellidos: 'Hacker', correo: 'pedro@example.com' },
          direccion: { calle: 'Los Crisantemos 603', comuna: 'Cerrillos', region: 'RM' },
          items: [
            { id: 1, nombre: 'Shin Ramyun', precio: 2695, cantidad: 4 },
            { id: 2, nombre: 'Ramune Drink', precio: 1800, cantidad: 2 }
          ],
          total: 14380
        }
      ]);
    }
  };

  const persistirProductos = (nuevosProductos) => {
    setProductos(nuevosProductos);
    localStorage.setItem('sakura_productos', JSON.stringify(nuevosProductos));
  };

  const mostrarMensaje = (msg) => {
    setNotificacion(msg);
    setTimeout(() => setNotificacion(''), 3000);
  };

  const formatearCLP = (monto) => {
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(monto || 0);
  };

  const handleCerrarSesion = () => {
    localStorage.removeItem('sakura_usuario_activo');
    navigate('/login');
  };

  // Guardar/Editar Producto
  const handleGuardarProducto = (e) => {
    e.preventDefault();
    if (modoEdicion) {
      const actualizados = productos.map((p) =>
        p.id === idEditando
          ? { ...p, nombre, precio: Number(precio), categoria, stock: Number(stock), imagen }
          : p
      );
      persistirProductos(actualizados);
      mostrarMensaje('✅ Producto actualizado correctamente');
    } else {
      const nuevo = {
        id: Date.now(),
        nombre,
        precio: Number(precio),
        categoria,
        stock: Number(stock),
        imagen: imagen || 'https://via.placeholder.com/150'
      };
      const actualizados = [...productos, nuevo];
      persistirProductos(actualizados);
      mostrarMensaje('🎉 Producto registrado con éxito');
    }
    limpiarFormulario();
  };

  const handleEditarProducto = (p) => {
    setModoEdicion(true);
    setIdEditando(p.id);
    setNombre(p.nombre);
    setPrecio(p.precio);
    setCategoria(p.categoria);
    setStock(p.stock || 10);
    setImagen(p.imagen);
    setSeccionActiva('productos');
  };

  const handleEliminarProducto = (id) => {
    if (window.confirm('¿Deseas eliminar este producto del inventario?')) {
      const actualizados = productos.filter((p) => p.id !== id);
      persistirProductos(actualizados);
      mostrarMensaje('🗑️ Producto eliminado');
    }
  };

  const limpiarFormulario = () => {
    setModoEdicion(false);
    setIdEditando(null);
    setNombre('');
    setPrecio('');
    setCategoria('Ramen');
    setStock('');
    setImagen('');
  };

  // Gestión de Categorías
  const handleAgregarCategoria = (e) => {
    e.preventDefault();
    if (nuevaCategoria && !listaCategorias.includes(nuevaCategoria)) {
      setListaCategorias([...listaCategorias, nuevaCategoria]);
      setNuevaCategoria('');
      mostrarMensaje('🏷️ Categoría añadida con éxito');
    }
  };

  const handleEliminarCategoria = (catAEliminar) => {
    if (window.confirm(`¿Seguro que deseas eliminar la categoría "${catAEliminar}"?`)) {
      const actualizadas = listaCategorias.filter((cat) => cat !== catAEliminar);
      setListaCategorias(actualizadas);
      mostrarMensaje(`🗑️ Categoría "${catAEliminar}" eliminada`);
    }
  };

  const totalCompras = ordenes.reduce((acc, o) => acc + (o.total || 0), 0);
  const totalStockItems = productos.reduce((acc, p) => acc + (p.stock || 10), 0);

  return (
    <div className="container-fluid bg-light min-vh-100 p-0">
      
      {/* Barra superior de navegación */}
      <div className="bg-dark text-white px-4 py-2 d-flex justify-content-between align-items-center">
        <span className="fw-bold small text-white-50">Sakura Market — Panel de Administración</span>
        <Link to="/" className="btn btn-outline-light btn-sm fw-bold">
          <i className="bi bi-shop me-1"></i> Ir a la Tienda Principal
        </Link>
      </div>

      <div className="row g-0">
        
        {/* SIDEBAR NAVEGACIÓN */}
        <div className="col-12 col-md-3 col-lg-2 bg-white border-end min-vh-100 p-3 d-flex flex-column justify-content-between">
          <div>
            <div className="nav flex-column nav-pills gap-1 mb-4">
              <button
                className={`nav-link text-start fw-bold py-2 ${seccionActiva === 'dashboard' ? 'active bg-primary' : 'text-dark'}`}
                onClick={() => setSeccionActiva('dashboard')}
              >
                <i className="bi bi-speedometer2 me-2"></i>Dashboard
              </button>
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
            <div className="alert alert-success fw-bold shadow-sm mb-4" role="alert">
              {notificacion}
            </div>
          )}

          {/* DASHBOARD */}
          {seccionActiva === 'dashboard' && (
            <div>
              <h2 className="fw-bold text-dark mb-1">Dashboard</h2>
              <p className="text-muted small mb-4">Resumen de las actividades diarias</p>

              <div className="row g-3 mb-4">
                <div className="col-12 col-md-4">
                  <div className="card border-0 shadow-sm p-3 bg-primary text-white rounded-3">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h3 className="fw-bold mb-0">Compras</h3>
                        <h2 className="fw-bold mb-0">{formatearCLP(totalCompras)}</h2>
                        <span className="small text-white-50">Probabilidad de aumento: 20%</span>
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
                        <h2 className="fw-bold mb-0">{usuarios.length || 1}</h2>
                        <span className="small text-dark-50">Nuevos usuarios este mes: {usuarios.length || 1}</span>
                      </div>
                      <i className="bi bi-people-fill fs-1 text-dark-50"></i>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-3">
                <div className="col" onClick={() => setSeccionActiva('dashboard')} style={{ cursor: 'pointer' }}>
                  <div className="card border-0 shadow-sm p-3 text-center h-100 bg-white">
                    <i className="bi bi-speedometer2 fs-2 text-primary mb-2"></i>
                    <h6 className="fw-bold text-dark">Dashboard</h6>
                    <p className="text-muted small mb-0">Visión general de métricas clave.</p>
                  </div>
                </div>

                <div className="col" onClick={() => setSeccionActiva('ordenes')} style={{ cursor: 'pointer' }}>
                  <div className="card border-0 shadow-sm p-3 text-center h-100 bg-white">
                    <i className="bi bi-cart-check fs-2 text-primary mb-2"></i>
                    <h6 className="fw-bold text-dark">Órdenes</h6>
                    <p className="text-muted small mb-0">Gestión y seguimiento de ventas.</p>
                  </div>
                </div>

                <div className="col" onClick={() => setSeccionActiva('productos')} style={{ cursor: 'pointer' }}>
                  <div className="card border-0 shadow-sm p-3 text-center h-100 bg-white">
                    <i className="bi bi-box-seam fs-2 text-primary mb-2"></i>
                    <h6 className="fw-bold text-dark">Productos</h6>
                    <p className="text-muted small mb-0">Administrar catálogo e inventario.</p>
                  </div>
                </div>

                <div className="col" onClick={() => setSeccionActiva('categorias')} style={{ cursor: 'pointer' }}>
                  <div className="card border-0 shadow-sm p-3 text-center h-100 bg-white">
                    <i className="bi bi-tags fs-2 text-primary mb-2"></i>
                    <h6 className="fw-bold text-dark">Categorías</h6>
                    <p className="text-muted small mb-0">Organizar categorías de productos.</p>
                  </div>
                </div>

                <div className="col" onClick={() => setSeccionActiva('usuarios')} style={{ cursor: 'pointer' }}>
                  <div className="card border-0 shadow-sm p-3 text-center h-100 bg-white">
                    <i className="bi bi-people fs-2 text-primary mb-2"></i>
                    <h6 className="fw-bold text-dark">Usuarios</h6>
                    <p className="text-muted small mb-0">Gestión de cuentas de usuarios.</p>
                  </div>
                </div>

                <div className="col" onClick={() => setSeccionActiva('reportes')} style={{ cursor: 'pointer' }}>
                  <div className="card border-0 shadow-sm p-3 text-center h-100 bg-white">
                    <i className="bi bi-bar-chart-line fs-2 text-primary mb-2"></i>
                    <h6 className="fw-bold text-dark">Reportes</h6>
                    <p className="text-muted small mb-0">Generación de informes de operaciones.</p>
                  </div>
                </div>

                <div className="col" onClick={() => setSeccionActiva('perfil')} style={{ cursor: 'pointer' }}>
                  <div className="card border-0 shadow-sm p-3 text-center h-100 bg-white">
                    <i className="bi bi-person-badge fs-2 text-primary mb-2"></i>
                    <h6 className="fw-bold text-dark">Perfil</h6>
                    <p className="text-muted small mb-0">Configuraciones de la cuenta admin.</p>
                  </div>
                </div>

                <div className="col">
                  <Link to="/" className="text-decoration-none">
                    <div className="card border-0 shadow-sm p-3 text-center h-100 bg-white">
                      <i className="bi bi-shop fs-2 text-primary mb-2"></i>
                      <h6 className="fw-bold text-dark">Tienda</h6>
                      <p className="text-muted small mb-0">Visualiza tu tienda en tiempo real.</p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* ÓRDENES */}
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
                      {ordenes.map((ord, idx) => (
                        <tr key={idx}>
                          <td className="fw-bold">#{ord.nroOrden}</td>
                          <td>{ord.cliente?.nombre} {ord.cliente?.apellidos}</td>
                          <td>{ord.cliente?.correo}</td>
                          <td className="fw-bold text-danger">{formatearCLP(ord.total)}</td>
                          <td>
                            <button className="btn btn-sm btn-danger fw-bold" onClick={() => setBoletaSeleccionada(ord)}>
                              Mostrar Boleta <i className="bi bi-receipt ms-1"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* PRODUCTOS (ABM) */}
          {seccionActiva === 'productos' && (
            <div>
              <h2 className="fw-bold text-dark mb-4">Administración de Productos</h2>
              
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
                        {listaCategorias.map((c, i) => <option key={i} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div className="col-12 col-md-8">
                      <label className="form-label small fw-bold text-muted">URL Imagen*</label>
                      <input type="text" className="form-control" value={imagen} placeholder="https://..." onChange={(e) => setImagen(e.target.value)} />
                    </div>
                  </div>
                  <div className="mt-3 d-flex gap-2">
                    <button type="submit" className="btn btn-danger fw-bold">{modoEdicion ? 'Actualizar' : 'Guardar'}</button>
                    {modoEdicion && <button type="button" className="btn btn-secondary fw-bold" onClick={limpiarFormulario}>Cancelar</button>}
                  </div>
                </form>
              </div>

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
                          <td><span className={`badge ${p.stock <= 5 ? 'bg-danger' : 'bg-success'}`}>{p.stock || 10} un.</span></td>
                          <td>
                            <button className="btn btn-sm btn-outline-primary me-2" onClick={() => handleEditarProducto(p)}><i className="bi bi-pencil"></i></button>
                            <button className="btn btn-sm btn-outline-danger" onClick={() => handleEliminarProducto(p.id)}><i className="bi bi-trash"></i></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* CATEGORÍAS */}
          {seccionActiva === 'categorias' && (
            <div>
              <h2 className="fw-bold text-dark mb-4">Gestión de Categorías</h2>
              
              <div className="card border-0 shadow-sm p-4 rounded-3 bg-white mb-4" style={{ maxWidth: '500px' }}>
                <h6 className="fw-bold text-danger mb-3">Añadir Nueva Categoría</h6>
                <form onSubmit={handleAgregarCategoria} className="d-flex gap-2">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Ej: Dulces, Salsas..."
                    value={nuevaCategoria}
                    onChange={(e) => setNuevaCategoria(e.target.value)}
                    required
                  />
                  <button type="submit" className="btn btn-danger fw-bold text-nowrap">
                    <i className="bi bi-plus-lg me-1"></i> Añadir
                  </button>
                </form>
              </div>

              <div className="card border-0 shadow-sm p-4 rounded-3 bg-white">
                <h6 className="fw-bold text-dark mb-3">Categorías Registradas</h6>
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
                      {listaCategorias.map((cat, i) => {
                        const cantidadProds = productos.filter((p) => p.categoria === cat).length;
                        return (
                          <tr key={i}>
                            <td className="fw-bold text-dark">{cat}</td>
                            <td>
                              <span className="badge bg-primary rounded-pill">
                                {cantidadProds} {cantidadProds === 1 ? 'Producto' : 'Productos'}
                              </span>
                            </td>
                            <td className="text-end">
                              <button
                                className="btn btn-sm btn-outline-danger fw-bold"
                                onClick={() => handleEliminarCategoria(cat)}
                                title="Eliminar categoría"
                              >
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

          {/* USUARIOS */}
          {seccionActiva === 'usuarios' && (
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
                      {usuarios.length === 0 ? (
                        <tr><td colSpan="4" className="text-center text-muted">No hay usuarios registrados aún.</td></tr>
                      ) : (
                        usuarios.map((u, i) => (
                          <tr key={i}>
                            <td className="fw-bold">{u.nombre} {u.apellidos}</td>
                            <td>{u.email}</td>
                            <td><span className="badge bg-info text-dark">{u.rol || 'USER'}</span></td>
                            <td className="small text-muted">{u.direccion?.calle || 'Sin dirección'}, {u.direccion?.comuna || ''}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* REPORTES */}
          {seccionActiva === 'reportes' && (
            <div>
              <h2 className="fw-bold text-dark mb-4">Reportes del Sistema</h2>
              <div className="card border-0 shadow-sm p-4 rounded-3 bg-white mb-4">
                <h5 className="fw-bold text-danger mb-3">Generación de Informes</h5>
                <p className="text-muted small">Genera reportes de ventas totales, rotación de productos e historial.</p>
                <button className="btn btn-outline-danger fw-bold align-self-start" onClick={() => alert('Generando informe...')}>
                  <i className="bi bi-download me-2"></i>Descargar Reporte PDF
                </button>
              </div>
            </div>
          )}

          {/* PERFIL */}
          {seccionActiva === 'perfil' && (
            <div>
              <h2 className="fw-bold text-dark mb-4">Perfil del Administrador</h2>
              <div className="card border-0 shadow-sm p-4 rounded-3 bg-white">
                <div className="d-flex align-items-center gap-3 mb-3">
                  <i className="bi bi-person-circle fs-1 text-danger"></i>
                  <div>
                    <h5 className="fw-bold mb-0">Administrador General</h5>
                    <span className="text-muted small">admin@sakuramarket.cl</span>
                  </div>
                </div>
                <hr />
                <button onClick={handleCerrarSesion} className="btn btn-danger fw-bold">
                  Cerrar Sesión Activa
                </button>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* MODAL BOLETA */}
      {boletaSeleccionada && (
        <div className="modal show d-block bg-dark bg-opacity-50" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content p-3">
              <div className="modal-header border-0">
                <h5 className="modal-title fw-bold text-danger">Boleta Electrónica #{boletaSeleccionada.nroOrden}</h5>
                <button type="button" className="btn-close" onClick={() => setBoletaSeleccionada(null)}></button>
              </div>
              <div className="modal-body">
                <p className="small text-muted mb-1">Cliente: <strong>{boletaSeleccionada.cliente?.nombre} {boletaSeleccionada.cliente?.apellidos}</strong></p>
                <p className="small text-muted mb-3">Correo: {boletaSeleccionada.cliente?.correo}</p>
                <ul className="list-group list-group-flush mb-3">
                  {boletaSeleccionada.items?.map((it, idx) => (
                    <li key={idx} className="list-group-item d-flex justify-content-between align-items-center px-0">
                      <span>{it.nombre} x{it.cantidad}</span>
                      <strong className="text-dark">{formatearCLP(it.precio * it.cantidad)}</strong>
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

    </div>
  );
}

export default AdminProductos;
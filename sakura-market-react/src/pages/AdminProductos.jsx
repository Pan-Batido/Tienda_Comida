import React, { useState, useEffect } from 'react';
import { obtenerProductos, guardarProducto, eliminarProducto } from '../data/db';

export function AdminProductos() {
  const [productos, setProductos] = useState([]);
  const [formData, setFormData] = useState({
    id: '',
    nombre: '',
    descripcion: '',
    precio: '',
    categoria: 'Comida',
    stock: '',
    imagen: ''
  });
  const [editando, setEditando] = useState(false);

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = () => {
    setProductos(obtenerProductos());
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.nombre || !formData.precio) return;

    guardarProducto({
      ...formData,
      id: formData.id ? Number(formData.id) : null,
      precio: Number(formData.precio),
      stock: Number(formData.stock)
    });

    setFormData({ id: '', nombre: '', descripcion: '', precio: '', categoria: 'Comida', stock: '', imagen: '' });
    setEditando(false);
    cargarProductos();
  };

  const handleEditar = (producto) => {
    setFormData(producto);
    setEditando(true);
  };

  const handleEliminar = (id) => {
    if (window.confirm('¿Seguro que deseas eliminar este producto?')) {
      eliminarProducto(id);
      cargarProductos();
    }
  };

  return (
    <div className="container my-4">
      <h2 className="fw-bold mb-4">⚙️ Administración de Productos (ABM)</h2>

      {/* Formulario de Creación / Edición */}
      <div className="card shadow-sm mb-4">
        <div className="card-header bg-dark text-white fw-bold">
          {editando ? 'Editar Producto' : 'Agregar Nuevo Producto'}
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit} className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Nombre</label>
              <input type="text" className="form-control" name="nombre" value={formData.nombre} onChange={handleInputChange} required />
            </div>
            <div className="col-md-3">
              <label className="form-label">Categoría</label>
              <select className="form-select" name="categoria" value={formData.categoria} onChange={handleInputChange}>
                <option value="Comida">Comida</option>
                <option value="Snacks">Snacks</option>
                <option value="Bebidas">Bebidas</option>
              </select>
            </div>
            <div className="col-md-3">
              <label className="form-label">Precio ($CLP)</label>
              <input type="number" className="form-control" name="precio" value={formData.precio} onChange={handleInputChange} required />
            </div>
            <div className="col-md-9">
              <label className="form-label">Descripción</label>
              <input type="text" className="form-control" name="descripcion" value={formData.descripcion} onChange={handleInputChange} />
            </div>
            <div className="col-md-3">
              <label className="form-label">Stock</label>
              <input type="number" className="form-control" name="stock" value={formData.stock} onChange={handleInputChange} />
            </div>
            <div className="col-12 d-flex gap-2">
              <button type="submit" className="btn btn-sakura fw-bold">
                {editando ? 'Guardar Cambios' : 'Crear Producto'}
              </button>
              {editando && (
                <button type="button" className="btn btn-secondary" onClick={() => { setEditando(false); setFormData({ id: '', nombre: '', descripcion: '', precio: '', categoria: 'Comida', stock: '', imagen: '' }); }}>
                  Cancelar
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Tabla de Productos */}
      <div className="table-responsive bg-white rounded shadow-sm p-3">
        <table className="table table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Stock</th>
              <th className="text-end">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((prod) => (
              <tr key={prod.id}>
                <td>{prod.id}</td>
                <td className="fw-bold">{prod.nombre}</td>
                <td><span className="badge bg-secondary">{prod.categoria}</span></td>
                <td>${prod.precio.toLocaleString('es-CL')}</td>
                <td>{prod.stock} u.</td>
                <td className="text-end">
                  <button className="btn btn-sm btn-outline-primary me-2" onClick={() => handleEditar(prod)}>
                    ✏️ Editar
                  </button>
                  <button className="btn btn-sm btn-outline-danger" onClick={() => handleEliminar(prod.id)}>
                    🗑️ Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
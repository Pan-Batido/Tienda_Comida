import React, { useState, useEffect } from 'react';
import { obtenerProductos } from '../data/db';
import FiltroCategorias from '../components/FiltroCategorias';
import ProductCard from '../components/ProductCard';

export function Productos({ alAgregarAlCarrito }) {
  const [productos, setProductos] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todas');
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    // Cargar inventario completo desde la capa de datos db.js
    const datos = obtenerProductos();
    setProductos(datos);
  }, []);

  // Lógica de filtrado combinado (categoría + texto de búsqueda)
  const productosFiltrados = productos.filter((prod) => {
    const coincideCategoria =
      categoriaSeleccionada === 'Todas' || prod.categoria === categoriaSeleccionada;
    const coincideBusqueda = prod.nombre
      .toLowerCase()
      .includes(busqueda.toLowerCase());
    return coincideCategoria && coincideBusqueda;
  });

  return (
    <div className="container py-4">
      {/* Encabezado de la Sección */}
      <div className="border-bottom pb-3 mb-4 d-flex justify-content-between align-items-center flex-wrap gap-2">
        <div>
          <h1 className="fw-bold text-danger mb-1">
            <i className="bi bi-box-seam me-2"></i>Catálogo de Productos
          </h1>
          <p className="text-muted mb-0">
            Explora todos los alimentos, ramen y golosinas asiáticas disponibles.
          </p>
        </div>
        <span className="badge bg-danger fs-6 px-3 py-2 rounded-pill">
          {productosFiltrados.length} Productos
        </span>
      </div>

      {/* Control de Búsqueda y Filtros */}
      <FiltroCategorias
        categoriaSeleccionada={categoriaSeleccionada}
        alSeleccionarCategoria={setCategoriaSeleccionada}
        busqueda={busqueda}
        alCambiarBusqueda={setBusqueda}
      />

      {/* Cuadrícula / Grilla de Productos */}
      {productosFiltrados.length === 0 ? (
        <div className="text-center py-5 bg-light rounded-3 shadow-sm my-4">
          <i className="bi bi-cart-x fs-1 text-muted d-block mb-3"></i>
          <h4 className="text-secondary fw-bold">No se encontraron coincidencia(s)</h4>
          <p className="text-muted small mb-0">
            Intenta buscar con otros términos o selecciona una categoría diferente.
          </p>
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
          {productosFiltrados.map((producto) => (
            <div className="col" key={producto.id}>
              <ProductCard
                producto={producto}
                alAgregarAlCarrito={alAgregarAlCarrito}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Productos;
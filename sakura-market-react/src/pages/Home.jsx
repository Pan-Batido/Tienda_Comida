import React, { useState, useEffect } from 'react';
import { obtenerProductos } from '../data/db';
import Carrusel from '../components/Carrusel';
import FiltroCategorias from '../components/FiltroCategorias';
import ProductCard from '../components/ProductCard';

export function Home({ alAgregarAlCarrito }) {
  const [productos, setProductos] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todas');
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    setProductos(obtenerProductos());
  }, []);

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
      <Carrusel />

      <div className="text-center my-4">
        <h1 className="fw-bold text-danger">Catálogo Sakura Market 🍵</h1>
        <p className="text-muted lead">
          Encuentra los mejores productos, fideos ramen y snacks traídos directamente desde Japón.
        </p>
      </div>

      <FiltroCategorias
        categoriaSeleccionada={categoriaSeleccionada}
        alSeleccionarCategoria={setCategoriaSeleccionada}
        busqueda={busqueda}
        alCambiarBusqueda={setBusqueda}
      />

      {productosFiltrados.length === 0 ? (
        <div className="text-center py-5 my-4 bg-light rounded-3 shadow-sm">
          <i className="bi bi-search fs-1 text-muted d-block mb-2"></i>
          <h4 className="text-secondary fw-semibold">No se encontraron productos</h4>
          <p className="text-muted small">Intenta cambiando los términos de búsqueda o selecciona otra categoría.</p>
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

export default Home;
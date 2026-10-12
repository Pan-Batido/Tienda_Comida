import React, { useState, useEffect } from 'react';
import { obtenerProductos } from '../data/db';
import ProductCard from '../components/ProductCard';

export function Categorias({ alAgregarAlCarrito }) {
  const [productos, setProductos] = useState([]);
  const [categoriaActiva, setCategoriaActiva] = useState('Comida');

  useEffect(() => {
    setProductos(obtenerProductos());
  }, []);

  const categorias = [
    { id: 'Comida', nombre: 'Ramen & Comidas', icono: 'bi-egg-fried' },
    { id: 'Snacks', nombre: 'Snacks & Dulces', icono: 'bi-cookie' },
    { id: 'Bebidas', nombre: 'Bebidas Asiáticas', icono: 'bi-cup-straw' }
  ];

  const productosFiltrados = productos.filter(p => p.categoria === categoriaActiva);

  return (
    <div className="container py-4">
      <div className="text-center mb-4">
        <h1 className="fw-bold text-danger">Categorías Destacadas 🌸</h1>
        <p className="text-muted">Selecciona una categoría para explorar nuestra selección de productos importados.</p>
      </div>

      {/* Pestañas de Categoría */}
      <div className="d-flex justify-content-center gap-2 mb-4 flex-wrap">
        {categorias.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setCategoriaActiva(cat.id)}
            className={`btn fw-bold px-4 py-2 ${
              categoriaActiva === cat.id ? 'btn-danger shadow-sm' : 'btn-outline-danger bg-white'
            }`}
          >
            <i className={`bi ${cat.icono} me-2`}></i>
            {cat.nombre}
          </button>
        ))}
      </div>

      {/* Grilla de Productos de la Categoría */}
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
        {productosFiltrados.map((prod) => (
          <div className="col" key={prod.id}>
            <ProductCard producto={prod} alAgregarAlCarrito={alAgregarAlCarrito} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categorias;
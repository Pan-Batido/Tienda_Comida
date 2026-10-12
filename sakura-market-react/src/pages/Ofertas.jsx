import React, { useState, useEffect } from 'react';
import { obtenerProductos } from '../data/db';
import ProductCard from '../components/ProductCard';

export function Ofertas({ alAgregarAlCarrito }) {
  const [ofertas, setOfertas] = useState([]);

  useEffect(() => {
    // Simular productos en oferta
    const prods = obtenerProductos();
    setOfertas(prods);
  }, []);

  return (
    <div className="container py-4">
      <div className="bg-danger text-white rounded-3 p-4 mb-4 shadow-sm text-center">
        <h1 className="fw-bold mb-2">🔥 Ofertas & Descuentos Especiales</h1>
        <p className="lead mb-0">¡Aprovecha precios rebajados en tus snacks y bebidas favoritas por tiempo limitado!</p>
      </div>

      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
        {ofertas.map((prod) => (
          <div className="col" key={prod.id}>
            <ProductCard producto={prod} alAgregarAlCarrito={alAgregarAlCarrito} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Ofertas;
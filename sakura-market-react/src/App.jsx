import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { ProductCard } from './components/ProductCard';
import { productosAsia } from './data/productos';

export function App() {
  const [carrito, setCarrito] = useState([]);

  // Función para agregar productos al carrito
  const agregarAlCarrito = (producto) => {
    setCarrito([...carrito, producto]);
  };

  return (
    <div className="bg-light min-vh-100">
      {/* Navbar con contador en vivo */}
      <Navbar cantidadCarrito={carrito.length} />

      {/* Contenido Principal */}
      <main className="container my-5">
        <h2 className="fw-bold text-danger mb-4 text-center">
          🌸 Productos Destacados
        </h2>

        <div className="row">
          {productosAsia.map((prod) => (
            <ProductCard 
              key={prod.id} 
              producto={prod} 
              alAgregar={agregarAlCarrito} 
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
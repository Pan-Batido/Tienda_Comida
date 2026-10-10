import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Carrusel } from './components/Carrusel';
import { ProductCard } from './components/ProductCard';
import { NotificacionToast } from './components/NotificacionToast';
import { productosAsia } from './data/productos';

export function App() {
  const [carrito, setCarrito] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todos');
  const [toast, setToast] = useState({ visible: false, mensaje: '' });

  const mostrarToast = (mensaje) => {
    setToast({ visible: true, mensaje });
    setTimeout(() => {
      setToast({ visible: false, mensaje: '' });
    }, 3000);
  };

  const agregarAlCarrito = (producto) => {
    setCarrito([...carrito, producto]);
    mostrarToast(`¡${producto.nombre} añadido al carrito! 🌸`);
  };

  // Filtrar productos según la categoría activa
  const productosFiltrados = categoriaSeleccionada === 'Todos'
    ? productosAsia
    : productosAsia.filter(p => p.categoria.toLowerCase() === categoriaSeleccionada.toLowerCase());

  return (
    <div className="bg-light min-vh-100">
      <Navbar cantidadCarrito={carrito.length} />

      <main className="container my-4">
        {/* Hero Carrusel */}
        <Carrusel alSeleccionarCategoria={setCategoriaSeleccionada} />

        <h2 className="fw-bold text-sakura mb-4 text-center">
          🌸 Catálogo de Productos
        </h2>

        {/* Grilla de Productos */}
        <div className="row">
          {productosFiltrados.map((prod) => (
            <ProductCard 
              key={prod.id} 
              producto={prod} 
              alAgregar={agregarAlCarrito} 
            />
          ))}
        </div>
      </main>

      <NotificacionToast mensaje={toast.mensaje} visible={toast.visible} />
    </div>
  );
}

export default App;
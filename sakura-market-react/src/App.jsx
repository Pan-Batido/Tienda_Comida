import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Carrusel } from './components/Carrusel';
import { ProductCard } from './components/ProductCard';
import { NotificacionToast } from './components/NotificacionToast';
import { CarritoModal } from './components/CarritoModal';
import { productosAsia } from './data/productos';

export function App() {
  const [carrito, setCarrito] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todos');
  const [toast, setToast] = useState({ visible: false, mensaje: '' });
  const [mostrarModalCarrito, setMostrarModalCarrito] = useState(false);

  const mostrarToast = (mensaje) => {
    setToast({ visible: true, mensaje });
    setTimeout(() => setToast({ visible: false, mensaje: '' }), 3000);
  };

  const agregarAlCarrito = (producto) => {
    setCarrito((prev) => {
      const existe = prev.find((item) => item.id === producto.id);
      if (existe) {
        return prev.map((item) =>
          item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      }
      return [...prev, { ...producto, cantidad: 1 }];
    });
    mostrarToast(`¡${producto.nombre} añadido al carrito! 🌸`);
  };

  const modificarCantidad = (id, delta) => {
    setCarrito((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const nuevaCantidad = item.cantidad + delta;
            return nuevaCantidad > 0 ? { ...item, cantidad: nuevaCantidad } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const eliminarItem = (id) => {
    setCarrito((prev) => prev.filter((item) => item.id !== id));
  };

  const vaciarCarrito = () => setCarrito([]);

  const finalizarCompra = () => {
    setMostrarModalCarrito(false);
    vaciarCarrito();
    mostrarToast('¡Gracias por tu compra en Sakura Market! 🌸');
  };

  const totalUnidades = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  const productosFiltrados = categoriaSeleccionada === 'Todos'
    ? productosAsia
    : productosAsia.filter(p => p.categoria.toLowerCase() === categoriaSeleccionada.toLowerCase());

  return (
    <div className="bg-light min-vh-100">
      <Navbar 
        cantidadCarrito={totalUnidades} 
        alAbrirCarrito={() => setMostrarModalCarrito(true)} 
      />

      <main className="container my-4">
        <Carrusel alSeleccionarCategoria={setCategoriaSeleccionada} />

        <h2 className="fw-bold text-sakura mb-4 text-center">
          🌸 Catálogo de Productos
        </h2>

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

      <CarritoModal 
        mostrando={mostrarModalCarrito}
        alCerrar={() => setMostrarModalCarrito(false)}
        items={carrito}
        alModificarCantidad={modificarCantidad}
        alEliminarItem={eliminarItem}
        alVaciarCarrito={vaciarCarrito}
        alFinalizarCompra={finalizarCompra}
      />
    </div>
  );
}

export default App;
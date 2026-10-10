import React, { useState, useRef } from 'react';
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

  // Referencia para limpiar el temporizador del Toast
  const temporizadorToastRef = useRef(null);

  // Mostrar Toast limpiando cualquier temporizador activo previo
  const mostrarToast = (mensaje) => {
    if (temporizadorToastRef.current) {
      clearTimeout(temporizadorToastRef.current);
    }
    setToast({ visible: true, mensaje });

    temporizadorToastRef.current = setTimeout(() => {
      setToast({ visible: false, mensaje: '' });
    }, 3500); // Se mantiene visible 3.5 segundos exactos siempre
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

  // Finalizar compra: cierra el modal, muestra el mensaje y espera antes de reiniciar el carro
  const finalizarCompra = () => {
    setMostrarModalCarrito(false);
    mostrarToast('¡Gracias por tu compra en Sakura Market! Tu pedido está en camino 🌸');
    
    // Vaciamos el carrito tras dar tiempo a ver la notificación
    setTimeout(() => {
      vaciarCarrito();
    }, 1500);
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
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

      {/* Sección Inicio para el Navbar */}
      <section id="inicio">
        <main className="container my-4">
          <Carrusel alSeleccionarCategoria={setCategoriaSeleccionada} />

          {/* Sección Productos para el Navbar */}
          <div id="productos">
            <h2 className="fw-bold text-sakura mb-4 text-center">
              Catálogo de Productos
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
          </div>
        </main>
      </section>

{/* Sección Contacto Completa en Rosado Sakura */}
      <footer id="contacto" className="bg-white pt-5 pb-4 border-top mt-5 shadow-sm">
        <div className="container">
          <div className="row g-4 mb-4 text-start">
            
            {/* Columna 1: Información de la Tienda */}
            <div className="col-12 col-md-4">
              <h5 className="fw-bold mb-3" style={{ color: '#e287a3' }}> Sakura Market</h5>
              <p className="text-muted small mb-2">
                Tu tienda favorita de snacks, bebidas y productos asiáticos importados directo a tu mesa.
              </p>
              <div className="d-flex flex-column gap-2 small text-muted">
                <div><i className="bi bi-geo-alt-fill me-2" style={{ color: '#e287a3' }}></i>Av. Providencia 1234, Santiago, Chile</div>
                <div><i className="bi bi-envelope-fill me-2" style={{ color: '#e287a3' }}></i>contacto@sakuramarket.cl</div>
                <div><i className="bi bi-telephone-fill me-2" style={{ color: '#e287a3' }}></i>+56 9 1234 5678</div>
              </div>
            </div>

            {/* Columna 2: Horarios de Atención */}
            <div className="col-12 col-md-3">
              <h5 className="fw-bold text-dark mb-3"> Horario</h5>
              <ul className="list-unstyled small text-muted d-flex flex-column gap-1">
                <li><strong>Lunes a Viernes:</strong> 10:00 - 20:00 hrs</li>
                <li><strong>Sábados:</strong> 11:00 - 19:00 hrs</li>
                <li><strong>Domingos y Festivos:</strong> Cerrado</li>
              </ul>
              <h6 className="fw-bold text-dark mt-3 mb-2">Síguenos</h6>
              <div className="d-flex gap-3 fs-5">
                <a href="#contacto" style={{ color: '#e287a3' }}><i className="bi bi-instagram"></i></a>
                <a href="#contacto" style={{ color: '#e287a3' }}><i className="bi bi-facebook"></i></a>
                <a href="#contacto" style={{ color: '#e287a3' }}><i className="bi bi-tiktok"></i></a>
              </div>
            </div>

            {/* Columna 3: Formulario Rápido de Mensajes */}
            <div className="col-12 col-md-5">
              <h5 className="fw-bold text-dark mb-3"> Envíanos un mensaje</h5>
              <form onSubmit={(e) => {
                e.preventDefault();
                mostrarToast('¡Mensaje enviado con éxito! Te responderemos pronto 🌸');
                e.target.reset();
              }}>
                <div className="row g-2 mb-2">
                  <div className="col-6">
                    <input type="text" className="form-control form-control-sm" placeholder="Tu Nombre" required />
                  </div>
                  <div className="col-6">
                    <input type="email" className="form-control form-control-sm" placeholder="Tu Email" required />
                  </div>
                </div>
                <div className="mb-2">
                  <textarea className="form-control form-control-sm" rows="3" placeholder="¿En qué te podemos ayudar?" required></textarea>
                </div>
                <button 
                  type="submit" 
                  className="btn btn-sm text-white fw-bold px-4 border-0"
                  style={{ backgroundColor: '#e287a3' }}
                >
                  Enviar Mensaje
                </button>
              </form>
            </div>

          </div>

          <hr className="my-3 text-muted opacity-25" />

          {/* Copyright final */}
          <div className="text-center text-muted small">
            © 2026 Sakura Market - Todos los derechos reservados.
          </div>
        </div>
      </footer>

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
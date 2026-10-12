import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Importación de base de datos local
import { 
  obtenerProductos, 
  obtenerCarrito, 
  guardarCarrito, 
  vaciarCarritoBD 
} from './data/db';

// Importación de Componentes
import { Navbar } from './components/Navbar';
import { Carrusel } from './components/Carrusel';
import { FiltroCategorias } from './components/FiltroCategorias';
import { ProductCard } from './components/ProductCard';
import { CarritoModal } from './components/CarritoModal';
import { NotificacionToast } from './components/NotificacionToast';

// Importación de Páginas
import { AdminProductos } from './pages/AdminProductos';

export function App() {
  const [productos, setProductos] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todos');
  const [carrito, setCarrito] = useState([]);
  const [mostrarModalCarrito, setMostrarModalCarrito] = useState(false);
  const [notificacion, setNotificacion] = useState({ visible: false, mensaje: '' });

  useEffect(() => {
    setProductos(obtenerProductos());
    setCarrito(obtenerCarrito());
  }, []);

  const mostrarNotificacion = (mensaje) => {
    setNotificacion({ visible: true, mensaje });
    setTimeout(() => {
      setNotificacion({ visible: false, mensaje: '' });
    }, 3000);
  };

  const handleAgregarAlCarrito = (producto) => {
    const existe = carrito.find((item) => item.id === producto.id);
    let nuevoCarrito = [];

    if (existe) {
      nuevoCarrito = carrito.map((item) =>
        item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
      );
    } else {
      nuevoCarrito = [...carrito, { ...producto, cantidad: 1 }];
    }

    setCarrito(nuevoCarrito);
    guardarCarrito(nuevoCarrito);
    mostrarNotificacion(`🌸 ¡"${producto.nombre}" añadido al carrito!`);
  };

  const handleModificarCantidad = (id, cambio) => {
    const nuevoCarrito = carrito
      .map((item) => {
        if (item.id === id) {
          const nuevaCantidad = item.cantidad + cambio;
          return nuevaCantidad > 0 ? { ...item, cantidad: nuevaCantidad } : null;
        }
        return item;
      })
      .filter(Boolean);

    setCarrito(nuevoCarrito);
    guardarCarrito(nuevoCarrito);
  };

  const handleEliminarDelCarrito = (id) => {
    const nuevoCarrito = carrito.filter((item) => item.id !== id);
    setCarrito(nuevoCarrito);
    guardarCarrito(nuevoCarrito);
    mostrarNotificacion('🗑️ Producto eliminado del carrito');
  };

  const handleVaciarCarrito = () => {
    setCarrito([]);
    vaciarCarritoBD();
    mostrarNotificacion('🧹 Carrito vaciado');
  };

  const handleFinalizarCompra = () => {
    setCarrito([]);
    vaciarCarritoBD();
    setMostrarModalCarrito(false);
    mostrarNotificacion('🎉 ¡Gracias por tu compra en Sakura Market!');
  };

  const productosFiltrados = categoriaSeleccionada === 'Todos'
    ? productos
    : productos.filter((p) => p.categoria.toLowerCase() === categoriaSeleccionada.toLowerCase());

  const totalCantidadCarrito = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  return (
    <Router>
      <div className="bg-light min-vh-100 d-flex flex-column">
        <Navbar 
          cantidadCarrito={totalCantidadCarrito} 
          alAbrirCarrito={() => setMostrarModalCarrito(true)} 
        />

        <Routes>
          {/* Ruta Principal: Tienda Pública */}
          <Route 
            path="/" 
            element={
              <>
                <Carrusel alSeleccionarCategoria={(cat) => setCategoriaSeleccionada(cat)} />
                <main className="container my-4 flex-grow-1" id="productos">
                  <h2 className="text-center fw-bold mb-3 text-dark">🌸 Catálogo de Comida Asiática</h2>
                  <FiltroCategorias 
                    categoriaActiva={categoriaSeleccionada}
                    alSeleccionarCategoria={(cat) => setCategoriaSeleccionada(cat)}
                  />
                  <div className="row">
                    {productosFiltrados.map((prod) => (
                      <ProductCard key={prod.id} producto={prod} alAgregar={handleAgregarAlCarrito} />
                    ))}
                  </div>
                </main>
              </>
            } 
          />

          {/* Ruta Panel de Administración ABM */}
          <Route path="/admin" element={<AdminProductos />} />
        </Routes>

        <CarritoModal 
          mostrando={mostrarModalCarrito}
          alCerrar={() => setMostrarModalCarrito(false)}
          items={carrito}
          alModificarCantidad={handleModificarCantidad}
          alEliminarItem={handleEliminarDelCarrito}
          alVaciarCarrito={handleVaciarCarrito}
          alFinalizarCompra={handleFinalizarCompra}
        />

        <NotificacionToast mensaje={notificacion.mensaje} visible={notificacion.visible} />

        <footer className="bg-dark text-white text-center py-3 mt-auto">
          <div className="container d-flex justify-content-between align-items-center">
            <p className="mb-0 small">© 2026 <strong>Sakura Market</strong></p>
            <Link to="/admin" className="text-white-50 small text-decoration-none">
              ⚙️ Acceso Administrador
            </Link>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
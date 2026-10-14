import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Base de datos local
import { 
  obtenerProductos, 
  obtenerCarrito, 
  guardarCarrito, 
  vaciarCarritoBD 
} from './data/db';

// Componentes
import Navbar from './components/Navbar';
import CarritoModal from './components/CarritoModal';
import NotificacionToast from './components/NotificacionToast';

// Páginas
import Home from './pages/Home';
import Productos from './pages/Productos';
import Categorias from './pages/Categorias';
import Ofertas from './pages/Ofertas';
import DetalleProducto from './pages/DetalleProducto';
import Contacto from './pages/Contacto';
import Blog from './pages/Blog';
import DetalleBlog1 from './pages/DetalleBlog1';
import DetalleBlog2 from './pages/DetalleBlog2';
import Login from './pages/Login';
import Registro from './pages/Registro';
import AdminProductos from './pages/AdminProductos';

// Checkout
import Carrito from './pages/checkout/Carrito';
import Checkout from './pages/checkout/Checkout';
import PagoExitoso from './pages/checkout/PagoExitoso';
import PagoError from './pages/checkout/PagoError';

export function App() {
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [usuarioActivo, setUsuarioActivo] = useState(null);
  const [mostrarModalCarrito, setMostrarModalCarrito] = useState(false);
  const [notificacion, setNotificacion] = useState({ visible: false, mensaje: '' });

  // Cargar usuario activo y datos al iniciar
  useEffect(() => {
    try {
      setProductos(obtenerProductos() || []);
      setCarrito(obtenerCarrito() || []);
      
      const usrStr = localStorage.getItem('sakura_usuario_activo');
      if (usrStr) {
        setUsuarioActivo(JSON.parse(usrStr));
      }
    } catch (e) {
      console.error("Error al cargar datos iniciales:", e);
    }
  }, []);

  // Función para sincronizar la sesión en toda la app
  const actualizarUsuarioActivo = (usuario) => {
    if (usuario) {
      localStorage.setItem('sakura_usuario_activo', JSON.stringify(usuario));
      setUsuarioActivo(usuario);
    } else {
      localStorage.removeItem('sakura_usuario_activo');
      setUsuarioActivo(null);
    }
  };

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

  const handleModificarCantidad = (id, nuevaCantidad) => {
    let nuevoCarrito = [];
    if (nuevaCantidad <= 0) {
      nuevoCarrito = carrito.filter((item) => item.id !== id);
    } else {
      nuevoCarrito = carrito.map((item) =>
        item.id === id ? { ...item, cantidad: nuevaCantidad } : item
      );
    }

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

  const totalCantidadCarrito = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  return (
    <Router>
      <div className="bg-light min-vh-100 d-flex flex-column">
        {/* Le pasamos el usuario y la función de cerrar sesión al Navbar */}
        <Navbar 
          cantidadCarrito={totalCantidadCarrito} 
          alAbrirCarrito={() => setMostrarModalCarrito(true)}
          usuarioActivo={usuarioActivo}
          alCerrarSesion={() => actualizarUsuarioActivo(null)}
        />

        <div className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home alAgregarAlCarrito={handleAgregarAlCarrito} />} />
            <Route path="/productos" element={<Productos alAgregarAlCarrito={handleAgregarAlCarrito} />} />
            <Route path="/producto/:id" element={<DetalleProducto alAgregarAlCarrito={handleAgregarAlCarrito} />} />
            <Route path="/categorias" element={<Categorias alAgregarAlCarrito={handleAgregarAlCarrito} />} />
            <Route path="/ofertas" element={<Ofertas alAgregarAlCarrito={handleAgregarAlCarrito} />} />
            <Route path="/contacto" element={<Contacto />} />
            
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/1" element={<DetalleBlog1 />} />
            <Route path="/blog/2" element={<DetalleBlog2 />} />

            {/* Le pasamos la función de actualización a Login */}
            <Route path="/login" element={<Login alIniciarSesion={actualizarUsuarioActivo} />} />
            <Route path="/registro" element={<Registro />} />

            <Route 
              path="/carrito" 
              element={
                <Carrito 
                  carrito={carrito} 
                  alActualizarCantidad={handleModificarCantidad}
                  alEliminarItem={handleEliminarDelCarrito}
                  alVaciarCarrito={handleVaciarCarrito}
                />
              } 
            />
            <Route 
              path="/checkout" 
              element={
                <Checkout 
                  carrito={carrito} 
                  alVaciarCarrito={handleVaciarCarrito} 
                />
              } 
            />
            <Route path="/pago-exitoso" element={<PagoExitoso />} />
            <Route path="/pago-error" element={<PagoError />} />

            <Route path="/admin" element={<AdminProductos />} />
          </Routes>
        </div>

        <CarritoModal 
          mostrar={mostrarModalCarrito}
          alCerrar={() => setMostrarModalCarrito(false)}
          carrito={carrito}
          alActualizarCantidad={handleModificarCantidad}
          alEliminarItem={handleEliminarDelCarrito}
          alVaciarCarrito={handleVaciarCarrito}
        />

        <NotificacionToast 
          mensaje={notificacion.mensaje} 
          mostrar={notificacion.visible} 
          alCerrar={() => setNotificacion({ visible: false, mensaje: '' })}
        />

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
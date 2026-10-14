// Claves para el almacenamiento local (localStorage)
const DB_PRODUCTOS_KEY = 'sakura_productos';
const DB_CARRITO_KEY = 'sakura_carrito';
const DB_USUARIOS_KEY = 'sakura_usuarios';

// Definición de rutas de imágenes
const ramen1 = '/src/assets/img/RamenOrientalPicante.png';
const ramen2 = '/src/assets/img/RamenCarne.jpg';
const ramen3 = '/src/assets/img/RamenPollo.png';
const snack1 = '/src/assets/img/Pocky1.webp';
const snack2 = '/src/assets/img/Pocky2.webp';
const snack3 = '/src/assets/img/Pocky3.webp';
const snack4 = '/src/assets/img/Pocky4.webp';
const bebida1 = '/src/assets/img/bebida1.jpg';
const bebida3 = '/src/assets/img/bebida3.png';
const bebida6 ='/src/assets/img/bebida6.png';

// Catálogo inicial
const productosIniciales = [
  {
    id: 1,
    nombre: 'Ramen Tonkotsu Clásico',
    descripcion: 'Fideos de trigo artesanales en un cremoso y rico caldo de cerdo, acompañados de chashu suave y bambú.',
    precio: 7990,
    categoria: 'Comida',
    stock: 15,
    imagen: ramen1
  },
  {
    id: 2,
    nombre: 'Pocky de Té Verde Matcha',
    descripcion: 'Palitos de galleta crujiente cubiertos con deliciosa crema de matcha refinado.',
    precio: 2490,
    categoria: 'Snacks',
    stock: 30,
    imagen: snack1
  },
  {
    id: 3,
    nombre: 'Bebida Ramune Original',
    descripcion: 'Bebida gaseosa japonesa tradicional con sabor a lima-limón y su clásica canica selladora.',
    precio: 1990,
    categoria: 'Bebidas',
    stock: 25,
    imagen: bebida1
  },
  {
    id: 4,
    nombre: 'Leche con Té y Taro 390ml',
    descripcion: 'Sabroso e irresistible té con leche y taro de cremosa textura.',
    precio: 2300,
    categoria: 'Bebidas',
    stock: 20,
    imagen: bebida3
  },
  {
    id: 5,
    nombre: 'Mochi de Fresa Tradicional',
    descripcion: 'Pastelitos de arroz suave rellenos de dulce pasta de fresa natural.',
    precio: 3200,
    categoria: 'Snacks',
    stock: 18,
    imagen: snack2
  },
  {
    id: 6,
    nombre: 'Ramen Neoguri Picante',
    descripcion: 'Delicioso ramen picante sabor a mariscos con fideos gruesos.',
    precio: 2100,
    categoria: 'Comida',
    stock: 12,
    imagen: ramen2
  },
  {
    id: 7,
    nombre: 'Dorayaki Relleno de Anko',
    descripcion: 'Bizcocho esponjoso japonés relleno de pasta de judía roja dulce.',
    precio: 1800,
    categoria: 'Snacks',
    stock: 22,
    imagen: snack3
  },
  {
    id: 8,
    nombre: 'Jugo de Uva Verde Coco Palm',
    descripcion: 'Bebida de uva verde con trocitos reales de coco en su interior.',
    precio: 1650,
    categoria: 'Bebidas',
    stock: 40,
    imagen: bebida6
  },
  {
    id: 9,
    nombre: 'Pepero Almond Crunch',
    descripcion: 'Galletas de palito cubiertas de chocolate con leche y almendras crocantes.',
    precio: 2200,
    categoria: 'Snacks',
    stock: 25,
    imagen: snack4
  },
  {
    id: 10,
    nombre: 'Ramen Shin Ramyun Gourmet',
    descripcion: 'El clásico ramen coreano muy picante con caldo intenso de verduras y champiñones.',
    precio: 1950,
    categoria: 'Comida',
    stock: 15,
    imagen: ramen3
  }
];

// Usuarios iniciales de prueba
const usuariosIniciales = [
  {
    id: 1,
    nombre: 'Administrador Sakura',
    email: 'admin@sakuramarket.cl',
    password: 'admin123',
    rol: 'ADMIN'
  },
  {
    id: 2,
    nombre: 'Cliente Prueba',
    email: 'cliente@sakuramarket.cl',
    password: 'user123',
    rol: 'USER'
  }
];

// ==========================================
// 2. FUNCIONES DE INICIALIZACIÓN (localStorage)
// ==========================================
export const inicializarBD = () => {
  if (!localStorage.getItem(DB_PRODUCTOS_KEY)) {
    localStorage.setItem(DB_PRODUCTOS_KEY, JSON.stringify(productosIniciales));
  }
  if (!localStorage.getItem(DB_CARRITO_KEY)) {
    localStorage.setItem(DB_CARRITO_KEY, JSON.stringify([]));
  }
  if (!localStorage.getItem(DB_USUARIOS_KEY)) {
    localStorage.setItem(DB_USUARIOS_KEY, JSON.stringify(usuariosIniciales));
  }
};

// ==========================================
// 3. OPERACIONES CRUD PARA PRODUCTOS
// ==========================================

// Obtener todos los productos
export const obtenerProductos = () => {
  inicializarBD();
  const productosJSON = localStorage.getItem(DB_PRODUCTOS_KEY);
  return JSON.parse(productosJSON) || [];
};

// Obtener un producto por ID
export const obtenerProductoPorId = (id) => {
  const productos = obtenerProductos();
  return productos.find((prod) => prod.id === Number(id));
};

// Guardar (Crear o Actualizar) un producto
export const guardarProducto = (producto) => {
  const productos = obtenerProductos();

  if (producto.id) {
    // Modo Edición: Actualizar producto existente
    const index = productos.findIndex((p) => p.id === Number(producto.id));
    if (index !== -1) {
      productos[index] = { ...productos[index], ...producto };
    }
  } else {
    // Modo Creación: Asignar nuevo ID
    const nuevoId = productos.length > 0 ? Math.max(...productos.map((p) => p.id)) + 1 : 1;
    const nuevoProducto = { ...producto, id: nuevoId };
    productos.push(nuevoProducto);
  }

  localStorage.setItem(DB_PRODUCTOS_KEY, JSON.stringify(productos));
  return productos;
};

// Eliminar un producto por ID
export const eliminarProducto = (id) => {
  const productos = obtenerProductos();
  const productosFiltrados = productos.filter((prod) => prod.id !== Number(id));
  localStorage.setItem(DB_PRODUCTOS_KEY, JSON.stringify(productosFiltrados));
  return productosFiltrados;
};

// ==========================================
// 4. OPERACIONES PARA EL CARRITO DE COMPRAS
// ==========================================

// Obtener elementos del carrito
export const obtenerCarrito = () => {
  inicializarBD();
  const carritoJSON = localStorage.getItem(DB_CARRITO_KEY);
  return JSON.parse(carritoJSON) || [];
};

// Guardar/Actualizar estado completo del carrito
export const guardarCarrito = (carrito) => {
  localStorage.setItem(DB_CARRITO_KEY, JSON.stringify(carrito));
};

// Vaciar carrito
export const vaciarCarritoBD = () => {
  localStorage.setItem(DB_CARRITO_KEY, JSON.stringify([]));
};

// ==========================================
// 5. OPERACIONES PARA USUARIOS Y AUTENTICACIÓN
// ==========================================

// Obtener lista de usuarios
export const obtenerUsuarios = () => {
  inicializarBD();
  const usuariosJSON = localStorage.getItem(DB_USUARIOS_KEY);
  return JSON.parse(usuariosJSON) || [];
};

// Validar inicio de sesión
export const autenticarUsuario = (email, password) => {
  const usuarios = obtenerUsuarios();
  const usuarioEncontrado = usuarios.find(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );
  
  if (usuarioEncontrado) {
    const { password, ...datosUsuario } = usuarioEncontrado;
    return datosUsuario;
  }
  return null;
};
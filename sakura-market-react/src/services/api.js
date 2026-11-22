const API_URL = 'http://localhost:8080/api/v1';

const TOKEN_KEY = 'sakura_token';
const USER_KEY = 'sakura_usuario_activo';

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function saveSession(token, usuario) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(usuario));
  window.dispatchEvent(new Event('sakura_auth_change'));
}

export function clearSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  window.dispatchEvent(new Event('sakura_auth_change'));
}

export function getUsuarioActivo() {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

async function request(path, { method = 'GET', body } = {}) {
  const headers = { 'Content-Type': 'application/json' };
  const token = getToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (res.status === 204) return null;

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.mensaje || data.error || `Error ${res.status}`);
  }
  return data;
}

function normalizarProducto(p) {
  return {
    ...p,
    categoria: typeof p.categoria === 'object' && p.categoria !== null
      ? p.categoria.nombre
      : p.categoria,
  };
}

export const api = {
  // Autenticación
  login: (email, password) =>
    request('/auth/login', { method: 'POST', body: { email, password } }),

  registro: (datosRegistro) =>
    request('/auth/registro', { method: 'POST', body: datosRegistro }),

  loginGoogle: (credential) =>
    request('/auth/google', { method: 'POST', body: { credential } }),

  // Productos
  obtenerProductos: async () => {
    const lista = await request('/productos');
    return Array.isArray(lista) ? lista.map(normalizarProducto) : [];
  },

  obtenerProductoPorId: async (id) => {
    const prod = await request(`/productos/${id}`);
    return normalizarProducto(prod);
  },

  crearProducto: async (producto) => {
    const creado = await request('/productos', { method: 'POST', body: producto });
    return normalizarProducto(creado);
  },

  actualizarProducto: async (id, producto) => {
    const actualizado = await request(`/productos/${id}`, { method: 'PUT', body: producto });
    return normalizarProducto(actualizado);
  },

  eliminarProducto: (id) =>
    request(`/productos/${id}`, { method: 'DELETE' }),

  // Categorías
  obtenerCategorias: () => request('/categorias'),

  crearCategoria: (nombre, descripcion = '') =>
    request('/categorias', { method: 'POST', body: { nombre, descripcion } }),

  eliminarCategoria: (id) =>
    request(`/categorias/${id}`, { method: 'DELETE' }),

  // Boletas / Órdenes
  obtenerBoletas: () => request('/boletas'),

  crearBoleta: (ordenPayload) =>
    request('/boletas', { method: 'POST', body: ordenPayload }),

  // Usuarios (Solo Administrador)
  obtenerUsuarios: () => request('/usuarios'),
};
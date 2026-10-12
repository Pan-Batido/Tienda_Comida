import { 
  obtenerProductos, 
  guardarProducto, 
  eliminarProducto, 
  obtenerCarrito, 
  guardarCarrito, 
  vaciarCarritoBD 
} from '../src/data/db.js';

describe('Pruebas Unitarias - Capa de Datos Sakura Market', () => {

  beforeEach(() => {
    localStorage.clear();
  });

  it('Debe obtener la lista de productos por defecto', () => {
    const productos = obtenerProductos();
    expect(Array.isArray(productos)).toBeTrue();
    expect(productos.length).toBeGreaterThan(0);
  });

  it('Debe agregar un nuevo producto al catálogo', () => {
    const nuevo = {
      nombre: 'Mochi de Frutilla',
      descripcion: 'Pastel de arroz relleno',
      precio: 2990,
      categoria: 'Snacks',
      stock: 12
    };

    const lista = guardarProducto(nuevo);
    const existe = lista.some(p => p.nombre === 'Mochi de Frutilla');
    expect(existe).toBeTrue();
  });

  it('Debe eliminar un producto por ID', () => {
    const productos = obtenerProductos();
    const idEliminar = productos[0].id;

    const listaActualizada = eliminarProducto(idEliminar);
    const existe = listaActualizada.some(p => p.id === idEliminar);
    expect(existe).toBeFalse();
  });

  it('Debe guardar y vaciar el carrito en localStorage', () => {
    const carritoTest = [{ id: 1, nombre: 'Ramen', cantidad: 2, precio: 7990 }];
    guardarCarrito(carritoTest);

    expect(obtenerCarrito().length).toBe(1);

    vaciarCarritoBD();
    expect(obtenerCarrito().length).toBe(0);
  });
});
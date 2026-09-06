// --- RENDERIZAR Y FILTRAR PRODUCTOS ---

// Función para pintar la lista de productos en el HTML
function cargarProductos(lista = productosAsia) {
  const contenedor = document.getElementById("lista-productos");
  if (!contenedor) return;

  contenedor.innerHTML = "";

  if (typeof lista === "undefined" || lista.length === 0) {
    contenedor.innerHTML = `<p class="text-center text-muted col-12">No hay productos disponibles por el momento.</p>`;
    return;
  }

  lista.forEach((prod) => {
    const col = document.createElement("div");
    col.className = "col-12 col-md-6 col-lg-3";

    col.innerHTML = `
      <div class="card h-100 shadow-sm border-0 overflow-hidden">
        
        <!-- enlace en la imagen -->
        <a href="detalle_producto.html?id=${prod.id}">
          <img src="${prod.imagen}" class="card-img-top p-2" alt="${prod.nombre}" style="height: 200px; object-fit: contain; background-color: #fff;">
        </a>

        <div class="card-body d-flex flex-column">
          <span class="badge bg-danger mb-2 w-auto align-self-start">${prod.categoria}</span>
          
          <!-- enlace en el titulo -->
          <h5 class="card-title fw-bold fs-6">
            <a href="detalle_producto.html?id=${prod.id}" class="text-decoration-none text-dark">
              ${prod.nombre}
            </a>
          </h5>
          
          <p class="card-text text-muted small flex-grow-1">${prod.descripcion || ''}</p>
        
        <div class="mt-3">
          <p class="fw-bold fs-5 text-success mb-2">$${prod.precio.toLocaleString("es-CL")}</p>
          <button class="btn btn-outline-danger w-100" onclick="agregarAlCarrito(${prod.id})">
            <i class="bi bi-cart-plus-fill"></i> Añadir al Carrito
          </button>
        </div>

      </div>
    `;
    contenedor.appendChild(col);
  });
}

// Función para filtrar por la categoría seleccionada desde los botones
function filtrarProductos(categoria) {
  // Cambiar la clase activa visual en los botones
  const botones = document.querySelectorAll('.btn-group .btn');
  botones.forEach(btn => {
    btn.classList.remove('active');
    if (btn.textContent.includes(categoria) || (categoria === 'Todos' && btn.textContent.includes('Todos'))) {
      btn.classList.add('active');
    }
  });

  // Filtrar el arreglo global según la categoría
  if (typeof productosAsia !== "undefined") {
    if (categoria === 'Todos') {
      cargarProductos(productosAsia);
    } else {
      const filtrados = productosAsia.filter(p => p.categoria.toLowerCase() === categoria.toLowerCase());
      cargarProductos(filtrados);
    }
  }
}

// --- LÓGICA DEL CARRITO DE COMPRAS ---

function obtenerCarrito() {
  return JSON.parse(localStorage.getItem("carrito")) || [];
}

function agregarAlCarrito(idProducto) {
  if (typeof productosAsia === "undefined") return;

  let carrito = obtenerCarrito();
  const producto = productosAsia.find((p) => p.id === idProducto);

  if (!producto) return;

  const existe = carrito.find((item) => item.id === idProducto);

  if (existe) {
    existe.cantidad++;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));
  
  // Muestra el Toast si existe, o cae en un mensaje alternativo si no está cargado el HTML del Toast
  mostrarToast(`¡${producto.nombre} añadido al carrito! 🌸`);
  actualizarContadorCarrito();
}

function mostrarToast(mensaje) {
  const toastEl = document.getElementById("toast-carrito");
  const toastMsg = document.getElementById("toast-mensaje");

  if (toastEl && toastMsg && typeof bootstrap !== "undefined") {
    toastMsg.textContent = mensaje;
    const toast = new bootstrap.Toast(toastEl, { delay: 2500 });
    toast.show();
  } else {
    console.log(mensaje);
  }
}

function actualizarContadorCarrito() {
  const contador = document.getElementById("cart-count");
  if (contador) {
    const carrito = obtenerCarrito();
    const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    contador.textContent = totalItems;
  }
}

// --- EVENTO INICIAL (DETECTA EL CARRUSEL Y LA URL) ---

document.addEventListener("DOMContentLoaded", () => {
  actualizarContadorCarrito();

  // Revisar si la URL trae el parámetro de categoría (Ej: productos.html?cat=Comida)
  const urlParams = new URLSearchParams(window.location.search);
  const categoriaURL = urlParams.get('cat');
  const path = window.location.pathname;
  const esPaginaInicio = path.endsWith("index.html") || path.endsWith("/") || path.split("/").pop() === "";

  if (typeof productosAsia !== "undefined") {
    if (categoriaURL) {
      filtrarProductos(categoriaURL);
    } else if (esPaginaInicio) {
      // Selección variada de 10 productos destacados mediante sus IDs
      const idsDestacadas = [1, 3, 7, 10, 12, 15, 18, 21, 24, 28];
      const destacados = productosAsia.filter(p => idsDestacadas.includes(p.id));
      
      cargarProductos(destacados);
    } else {
      // En productos.html sin filtro se muestran todos
      cargarProductos(productosAsia);
    }
  }
});
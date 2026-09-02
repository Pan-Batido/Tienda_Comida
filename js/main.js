document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("lista-productos");

  if (contenedor) {
    productosAsia.forEach((prod) => {
      const col = document.createElement("div");
      col.className = "col-12 col-md-6 col-lg-3";

      col.innerHTML = `
        <div class="card h-100 shadow-sm">
          <img src="${prod.imagen}" class="card-img-top" alt="${prod.nombre}" style="height: 180px; object-fit: cover;">
          <div class="card-body d-flex flex-column">
            <span class="badge bg-danger mb-2 w-auto align-self-start">${prod.categoria}</span>
            <h5 class="card-title">${prod.nombre}</h5>
            <p class="card-text text-muted small">${prod.descripcion}</p>
            <p class="fw-bold fs-5 text-success">$${prod.precio.toLocaleString("es-CL")}</p>
            <button class="btn btn-outline-danger mt-auto" onclick="agregarAlCarrito(${prod.id})">
              <i class="bi bi-cart-plus"></i> Añadir al Carrito
            </button>
          </div>
        </div>
      `;
      contenedor.appendChild(col);
    });
  }
});

// Obtener el carrito actual o iniciar uno vacío
function obtenerCarrito() {
  return JSON.parse(localStorage.getItem("carrito")) || [];
}

// Agregar producto
function agregarAlCarrito(idProducto) {
  let carrito = obtenerCarrito();
  const producto = productosAsia.find((p) => p.id === idProducto);

  if (!producto) return;

  const existe = carrito.find((item) => item.id === idProducto);

  if (existe) {
    existe.cantidad++;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }

  // Guardar en localStorage
  localStorage.setItem("carrito", JSON.stringify(carrito));
  alert(`${producto.nombre} fue añadido al carrito`);
  actualizarContadorCarrito();
}

// Actualizar indicador visual del carrito en el Navbar
function actualizarContadorCarrito() {
  const contador = document.getElementById("cart-count");
  if (contador) {
    const carrito = obtenerCarrito();
    const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    contador.textContent = totalItems;
  }
}

// Ejecutar al cargar la página
document.addEventListener("DOMContentLoaded", actualizarContadorCarrito);

function renderizarCarrito() {
  const tabla = document.getElementById("tabla-carrito");
  const totalSpan = document.getElementById("total-precio");
  if (!tabla) return;

  const carrito = obtenerCarrito();
  tabla.innerHTML = "";
  let total = 0;

  carrito.forEach((prod, index) => {
    const subtotal = prod.precio * prod.cantidad;
    total += subtotal;

    tabla.innerHTML += `
      <tr>
        <td><strong>${prod.nombre}</strong></td>
        <td>$${prod.precio.toLocaleString("es-CL")}</td>
        <td>
          <input type="number" min="1" value="${prod.cantidad}" 
            class="form-control w-25" onchange="cambiarCantidad(${index}, this.value)">
        </td>
        <td>$${subtotal.toLocaleString("es-CL")}</td>
        <td>
          <button class="btn btn-sm btn-danger" onclick="eliminarDelCarrito(${index})">Eliminar</button>
        </td>
      </tr>
    `;
  });

  if (totalSpan) totalSpan.textContent = `$${total.toLocaleString("es-CL")}`;
}

function cambiarCantidad(index, nuevaCantidad) {
  let carrito = obtenerCarrito();
  carrito[index].cantidad = parseInt(nuevaCantidad);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  renderizarCarrito();
  actualizarContadorCarrito();
}

function eliminarDelCarrito(index) {
  let carrito = obtenerCarrito();
  carrito.splice(index, 1);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  renderizarCarrito();
  actualizarContadorCarrito();
}

// Cargar la tabla si estamos en carrito.html
document.addEventListener("DOMContentLoaded", renderizarCarrito);
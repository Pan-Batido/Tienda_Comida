// Cargar la vista de la tabla del carrito
function renderizarCarrito() {
  const tabla = document.getElementById("tabla-carrito");
  const contenedorVacio = document.getElementById("carrito-vacio");
  const resumenCompra = document.getElementById("resumen-compra");
  const accionesCarrito = document.getElementById("acciones-carrito");

  if (!tabla) return;

  const carrito = obtenerCarrito();

  if (carrito.length === 0) {
    tabla.parentElement.classList.add("d-none");
    accionesCarrito.classList.add("d-none");
    contenedorVacio.classList.remove("d-none");
    
    // Ocultar resumen de compra
    if (resumenCompra) resumenCompra.classList.add("d-none");
    return;
  }

  // Si hay productos, mostramos los componentes
  tabla.parentElement.classList.remove("d-none");
  accionesCarrito.classList.remove("d-none");
  contenedorVacio.classList.add("d-none");
  if (resumenCompra) resumenCompra.classList.remove("d-none");

  tabla.innerHTML = "";

  let subtotalGeneral = 0;

  carrito.forEach((item) => {
    const subtotal = item.precio * item.cantidad;
    subtotalGeneral += subtotal;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>
        <div class="d-flex align-items-center">
          <img src="${item.imagen}" alt="${item.nombre}" style="width: 50px; height: 50px; object-fit: cover;" class="rounded me-3">
          <div>
            <h6 class="mb-0 fw-bold">${item.nombre}</h6>
            <small class="text-muted">${item.categoria}</small>
          </div>
        </div>
      </td>
      <td class="fw-semibold">$${item.precio.toLocaleString("es-CL")}</td>
      <td class="text-center">
        <div class="btn-group btn-group-sm" role="group">
          <button class="btn btn-outline-secondary" onclick="cambiarCantidad(${item.id}, -1)">-</button>
          <span class="btn btn-light px-3 disabled fw-bold text-dark">${item.cantidad}</span>
          <button class="btn btn-outline-secondary" onclick="cambiarCantidad(${item.id}, 1)">+</button>
        </div>
      </td>
      <td class="text-end fw-bold text-success">$${subtotal.toLocaleString("es-CL")}</td>
      <td class="text-center">
        <button class="btn btn-sm btn-outline-danger border-0" onclick="eliminarProducto(${item.id})">
          <i class="bi bi-trash-fill fs-5"></i>
        </button>
      </td>
    `;
    tabla.appendChild(row);
  });

  actualizarResumen(subtotalGeneral);
}

// Modificar cantidad con botones + / -
function cambiarCantidad(idProducto, cambio) {
  let carrito = obtenerCarrito();
  const index = carrito.findIndex((item) => item.id === idProducto);

  if (index !== -1) {
    carrito[index].cantidad += cambio;

    if (carrito[index].cantidad <= 0) {
      carrito.splice(index, 1);
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarContadorCarrito();
    renderizarCarrito();
  }
}

// Eliminar un ítem completo
function eliminarProducto(idProducto) {
  let carrito = obtenerCarrito();
  carrito = carrito.filter((item) => item.id !== idProducto);

  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarContadorCarrito();
  renderizarCarrito();
}

// Actualizar valores de subtotal y total
function actualizarResumen(subtotal) {
  const costoEnvio = subtotal > 0 ? 2990 : 0;
  const total = subtotal + costoEnvio;

  const subtotalEl = document.getElementById("resumen-subtotal");
  const envioEl = document.getElementById("resumen-envio");
  const totalEl = document.getElementById("resumen-total");

  if (subtotalEl) subtotalEl.textContent = `$${subtotal.toLocaleString("es-CL")}`;
  if (envioEl) envioEl.textContent = `$${costoEnvio.toLocaleString("es-CL")}`;
  if (totalEl) totalEl.textContent = `$${total.toLocaleString("es-CL")}`;
}

// Inicializar eventos de la vista del carrito
document.addEventListener("DOMContentLoaded", () => {
  renderizarCarrito();

  // Vaciar carrito
  const btnVaciar = document.getElementById("btn-vaciar");
  if (btnVaciar) {
    btnVaciar.addEventListener("click", () => {
      if (confirm("¿Estás seguro de que deseas vaciar el carrito?")) {
        localStorage.removeItem("carrito");
        actualizarContadorCarrito();
        renderizarCarrito();
      }
    });
  }

  // Simular Checkout
  const btnCheckout = document.getElementById("btn-checkout");
  if (btnCheckout) {
    btnCheckout.addEventListener("click", () => {
      alert("¡Gracias por tu compra en Sakura Market! 🌸 Tu pedido está en proceso.");
      localStorage.removeItem("carrito");
      actualizarContadorCarrito();
      window.location.href = "index.html";
    });
  }
});
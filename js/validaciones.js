// Validar correos permitidos: @duoc.cl, @profesor.duoc.cl, @gmail.com
function validarEmail(email) {
  const regex = /^[a-zA-Z0-9._%+-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;
  return regex.test(email.trim());
}

// Validar RUN chileno sin puntos ni guion (Ej: 19011022K)
function validarRun(run) {
  const cleanRun = run.trim().toUpperCase();
  if (cleanRun.length < 7 || cleanRun.length > 9) return false;

  const cuerpo = cleanRun.slice(0, -1);
  const dvIngresado = cleanRun.slice(-1);

  if (!/^\d+$/.test(cuerpo)) return false;

  let suma = 0;
  let multiplicador = 2;

  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += parseInt(cuerpo.charAt(i)) * multiplicador;
    multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
  }

  const dvEsperado = 11 - (suma % 11);
  let dvCalc = "";
  if (dvEsperado === 11) dvCalc = "0";
  else if (dvEsperado === 10) dvCalc = "K";
  else dvCalc = dvEsperado.toString();

  return dvIngresado === dvCalc;
}

// Función auxiliar para mostrar u ocultar errores en Bootstrap
function mostrarError(inputId, errorId, mensaje, esValido) {
  const input = document.getElementById(inputId);
  const errorElement = document.getElementById(errorId);
  if (!input || !errorElement) return;

  if (esValido) {
    input.classList.remove("is-invalid");
    input.classList.add("is-valid");
    errorElement.textContent = "";
  } else {
    input.classList.remove("is-valid");
    input.classList.add("is-invalid");
    errorElement.textContent = mensaje;
  }
}
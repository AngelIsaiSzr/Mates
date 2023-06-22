// Selecciona el botón del menú y el menú desplegable
const botonMenu = document.querySelector('.boton-menu');
const opcionesMenu = document.querySelector('.opciones-menu');

// Función para mostrar u ocultar el menú de navegación
function toggleMenu() {
  if (opcionesMenu.style.display === 'block') {
    opcionesMenu.style.display = 'none';
  } else {
    opcionesMenu.style.display = 'block';
  }
}

// Agrega un event listener al documento
// para cerrar el menú cuando se haga clic en cualquier lugar fuera del menú
document.addEventListener('click', function (event) {
  // Verifica si se hizo clic fuera del menú desplegable o del botón del menú
  if (!opcionesMenu.contains(event.target) && !botonMenu.contains(event.target)) {
    opcionesMenu.style.display = 'none';
  }
});

// Función para mostrar una sección específica y ocultar las demás
function mostrarSeccion(id) {
  const secciones = document.querySelectorAll('section');
  for (let i = 0; i < secciones.length; i++) {
    if (secciones[i].id === id + '-seccion') {
      secciones[i].style.display = 'block';
    } else {
      secciones[i].style.display = 'none';
    }
  }
}

// Establecer la sección "inicio" como la sección predeterminada
mostrarSeccion('../html/inicio.html');

// Variables para el cronómetro
let intervalo = null;
let tiempoInicio = 0;
let tiempoPasado = 0;
let tiempoGuardado = 0;

// Función para iniciar el cronómetro
function iniciarCronometro() {
  // Inicia el cronómetro y se asegura de que se actualice correctamente en la pantalla
  tiempoPasado = tiempoGuardado;
  clearInterval(intervalo);
  tiempoInicio = Date.now() - tiempoPasado;
  intervalo = setInterval(function () {
    let tiempoActual = Date.now();
    tiempoPasado = tiempoActual - tiempoInicio;
    actualizarTiempo(tiempoPasado);
  }, 10);
}

// Función para detener el cronómetro
function detenerCronometro() {
  if (!intervalo) {
    // El cronómetro no se ha iniciado todavía, muestra un mensaje de error
    document.getElementById("tiempo-transcurrido").innerHTML = "00:00:00";
    return;
  }

  // Guarda el valor actual de tiempoPasado
  tiempoGuardado = tiempoPasado;

  // Detiene el intervalo
  clearInterval(intervalo);
}

// Función para reiniciar el cronómetro
function reiniciarCronometro() {
  clearInterval(intervalo);
  intervalo = null;
  tiempoPasado = 0;
  tiempoGuardado = 0;
  actualizarTiempo(tiempoPasado);
  document.getElementById("tiempo-transcurrido").innerHTML = "00:00:00";
}

// Función para actualizar el tiempo mostrado por el cronómetro
function actualizarTiempo(tiempo) {
  let horas = Math.floor(tiempo / 3600000);
  let minutos = Math.floor((tiempo % 3600000) / 60000);
  let segundos = Math.floor((tiempo % 60000) / 1000);
  let centesimas = Math.floor(tiempo % 1000 / 10);
  let tiempoFormateado = (horas < 10 ? "0" : "") + horas + ":" +
    (minutos < 10 ? "0" : "") + minutos + ":" +
    (segundos < 10 ? "0" : "") + segundos + ":" +
    (centesimas < 10 ? "0" : "") + centesimas;
  document.getElementById("tiempo-transcurrido").innerHTML = tiempoFormateado;
}
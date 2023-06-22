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

// Variables para el temporizador
let intervalId;
let segundosTotales;
let segundosRestantes;
let segundosGuardados;

// Función para iniciar el temporizador
function iniciarTemporizador() {
  // Obtiene el número de segundos ingresado por el usuario y lo convierte a un entero
  segundosTotales = parseInt(document.getElementById("temporizador-input").value);
  segundosRestantes = segundosTotales;

  // Verifica si el número ingresado es válido
  if (isNaN(segundosTotales) || segundosTotales < 1 || segundosTotales > 3600) {
    // Muestra un mensaje de error si el número no es válido
    document.getElementById("temporizador-resultado").innerHTML = "Ingrese un número válido entre 1 y 3600";
    return;
  }

  // Verifica que el temporizador haya sido detenido
  if (!segundosGuardados) {
    // Establece un intervalo que llama a la función actualizarTemporizador() cada segundo
    intervalId = setInterval(actualizarTemporizador, 1000);
  } else {
    // Restablece segundosRestantes al valor guardado
    segundosRestantes = segundosGuardados;
    // Establece un intervalo que llama a la función actualizarTemporizador() cada segundo
    intervalId = setInterval(actualizarTemporizador, 1000);
  }
}

// Función para detener el temporizador
function detenerTemporizador() {
  if (!intervalId || document.getElementById("temporizador-input").value == "") {
    // El temporizador no se ha iniciado todavía, muestra un mensaje de error
    document.getElementById("temporizador-resultado").innerHTML = "El temporizador no se ha iniciado todavía.";
    return;
  }

  // Guarda el valor actual de segundosRestantes
  segundosGuardados = segundosRestantes;

  // Detiene el intervalo
  clearInterval(intervalId);
}

// Función para reiniciar el temporizador
function reiniciarTemporizador() {
  if (!intervalId || document.getElementById("temporizador-input").value == "") {
    // El temporizador no se ha iniciado todavía, muestra un mensaje de error
    document.getElementById("temporizador-resultado").innerHTML = "El temporizador no se ha iniciado todavía.";
    return;
  }

  // Reinicia el intervalo y borra cualquier mensaje mostrado en el resultado y en el input del temporizador
  clearInterval(intervalId);
  segundosGuardados = 0;
  document.getElementById("temporizador-resultado").innerHTML = "";
  document.getElementById("temporizador-input").value = "";
}

// Función para actualizar el temporizador cada segundo
function actualizarTemporizador() {
  // Si el tiempo se ha agotado, detiene el temporizador y muestra un mensaje indicando que el tiempo ha terminado
  if (segundosRestantes <= 0) {
    detenerTemporizador();
    document.getElementById("temporizador-resultado").innerHTML = "¡Tiempo terminado!";
    return;
  }

  // Calcula los minutos y segundos restantes
  let minutos = Math.floor(segundosRestantes / 60);
  let segundos = segundosRestantes % 60;

  // Crea una cadena de texto que muestra el tiempo restante en minutos y segundos
  let tiempoMostrado = minutos + "m " + segundos + "s";

  // Muestra el tiempo restante en el resultado del temporizador y disminuye los segundos restantes en uno
  document.getElementById("temporizador-resultado").innerHTML = tiempoMostrado;
  segundosRestantes--;
}
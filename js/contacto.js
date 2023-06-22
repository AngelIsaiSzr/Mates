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
mostrarSeccion('../index.html');

// Función para manejar la ventana emergente
function mostrarVentanaEmergente(mensaje) {
  // Obtiene la referencia al elemento de la ventana emergente
  let ventanaEmergente = document.getElementById("ventana-emergente");
  // Actualiza el contenido del mensaje en la ventana emergente
  ventanaEmergente.querySelector(".mensaje span").textContent = mensaje;
  // Agrega la clase "animacion" y muestra la ventana emergente
  ventanaEmergente.classList.add("animacion");
  ventanaEmergente.style.display = "block";
  // Programa la animación de salida y la ocultación de la ventana emergente después de un tiempo determinado
  setTimeout(function () {
    // Elimina la clase "animacion" y agrega la clase "animacion-salida" para animar la salida
    ventanaEmergente.classList.remove("animacion");
    ventanaEmergente.classList.add("animacion-salida");
    // Programa la eliminación de la clase "animacion-salida" y la ocultación de la ventana emergente después de otro tiempo determinado
    setTimeout(function () {
      ventanaEmergente.classList.remove("animacion-salida");
      ventanaEmergente.style.display = "none";
    }, 500); // Oculta la ventana después de 0.5 segundos
  }, 1500); // Muestra la ventana durante 1.5 segundos
}

// Función para manejar el envío de un formulario
function enviado(event) {
  // Verifica si los campos requeridos están completos
  if (document.getElementById("nombre").value && document.getElementById("email").value.includes("@") && document.getElementById("mensaje").value) {
    // Si todos los campos requeridos están completos, muestra la ventana emergente
    mostrarVentanaEmergente('Enviado correctamente!');
    // Resetea el formulario después de .5 segundos
    setTimeout(function () {
      document.getElementById("formulario").reset();
    }, 500);
  } else if (document.getElementById("nombre").value && document.getElementById("email").value && document.getElementById("mensaje").value) {
    // Si no se ha escrito un correo electrónico válido, muestra un mensaje de error
    mostrarVentanaEmergente('Ingresa un correo electrónico válido.');
    // Evita que se envíe el formulario automáticamente
    event.preventDefault();
  } else {
    // Si no se han completado todos los campos requeridos, muestra un mensaje de error
    mostrarVentanaEmergente('Por favor, completa todos los campos requeridos.');
    // Evita que se envíe el formulario automáticamente
    event.preventDefault();
  }
}
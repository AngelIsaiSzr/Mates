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
document.addEventListener('click', function(event) {
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
  
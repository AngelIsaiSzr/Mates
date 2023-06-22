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
mostrarSeccion('../html/inicio.html');

// Obtener los elementos HTML correspondientes
const conversor = document.getElementById("conversor");
const secciones = document.querySelectorAll(".conversor");
// Declaramos la variable de resultado global
let resultado = 0;
let simbolo = "";

// Selección del botón "Convertir" para la conversión
const botonConvertir = document.getElementById("boton-convertir");

// Función para mostrar la sección correspondiente al conversor seleccionado
function mostrarConversor() {
  const valorSeleccionado = conversor.value;
  secciones.forEach((seccion) => {
    if (seccion.classList.contains(valorSeleccionado)) {
      seccion.style.display = "block";
      // Reiniciar los valores al cambiar de conversor
      document.getElementById("conversor-resultado").innerHTML = "";
      resultado = 0;
      // Agregar el eventListener correspondiente para la conversión
      if (valorSeleccionado === "temperatura-conversor") {
        botonConvertir.removeEventListener("click", convertirMoneda);
        botonConvertir.removeEventListener("click", convertirLongitud);
        botonConvertir.addEventListener("click", convertirTemperatura);
      } else if (valorSeleccionado === "moneda-conversor") {
        botonConvertir.removeEventListener("click", convertirTemperatura);
        botonConvertir.removeEventListener("click", convertirLongitud);
        botonConvertir.addEventListener("click", convertirMoneda);
      } else if (valorSeleccionado === "longitud-conversor") {
        botonConvertir.removeEventListener("click", convertirTemperatura);
        botonConvertir.removeEventListener("click", convertirMoneda);
        botonConvertir.addEventListener("click", convertirLongitud);
      }
    } else {
      seccion.style.display = "none";
    }
  });
}

// Llamar a la función mostrarConversor cuando se seleccione una opción en el menú desplegable
conversor.addEventListener("change", () => {
  mostrarConversor();
});

// Mostrar la sección correspondiente al conversor seleccionado inicialmente
mostrarConversor();

// Función para convertir unidades de temperatura
function convertirTemperatura() {
  // Borrar el contenido del elemento del DOM donde se muestra el resultado
  document.getElementById("conversor-resultado").innerHTML = "";
  // Establecer la variable global resultado a cero
  resultado = 0;

  // Obtener valores de los elementos del DOM
  const unidadOrigen = document.getElementById("unidad-origen-temperatura").value;
  const unidadDestino = document.getElementById("unidad-destino-temperatura").value;
  const valor = document.getElementById("valor").value;

  // Verificar que las unidades seleccionadas son válidas y diferentes
  if (unidadOrigen === unidadDestino) {
    document.getElementById("conversor-resultado").innerHTML = "Error: seleccione unidades diferentes";
    return;
  } else if (!["celsius", "fahrenheit", "kelvin"].includes(unidadOrigen) || !["celsius", "fahrenheit", "kelvin"].includes(unidadDestino)) {
    document.getElementById("conversor-resultado").innerHTML = "Error: seleccione unidades válidas";
    return;
  }

  // Verificar que se haya ingresado un número
  if (isNaN(valor) || valor === "") {
    document.getElementById("conversor-resultado").innerHTML = "Error: debe ingresar un número válido";
    return;
  }

  // Convertir el valor a la unidad de origen (Celsius)
  let valorEnCelsius = 0;
  switch (unidadOrigen) {
    case "celsius":
      valorEnCelsius = valor;
      break;
    case "fahrenheit":
      valorEnCelsius = (valor - 32) * 5 / 9;
      break;
    case "kelvin":
      valorEnCelsius = valor - 273.15;
      break;
  }

  // Convertir el valor en Celsius a la unidad de destino
  switch (unidadDestino) {
    case "celsius":
      resultado = valorEnCelsius;
      break;
    case "fahrenheit":
      resultado = valorEnCelsius * 9 / 5 + 32;
      break;
    case "kelvin":
      resultado = valorEnCelsius + 273.15;
      break;
  }

  simbolo = "°";

  // Mostrar el resultado en el elemento del DOM correspondiente
  document.getElementById("conversor-resultado").innerHTML = resultado.toFixed(2) + simbolo;
}

// Función para convertir unidades de moneda
function convertirMoneda() {
  // Borrar el contenido del elemento del DOM donde se muestra el resultado
  document.getElementById("conversor-resultado").innerHTML = "";
  // Establecer la variable global resultado a cero
  resultado = 0;

  // Obtener valores de los elementos del DOM
  const unidadOrigen = document.getElementById("unidad-origen-moneda").value;
  const unidadDestino = document.getElementById("unidad-destino-moneda").value;
  const valor = document.getElementById("valor").value;

  // Verificar que las unidades seleccionadas son válidas y diferentes
  if (unidadOrigen === unidadDestino) {
    document.getElementById("conversor-resultado").innerHTML = "Error: seleccione unidades diferentes";
    return;
  } else if (!["USD", "EUR", "MXN", "COP"].includes(unidadOrigen) || !["USD", "EUR", "MXN", "COP"].includes(unidadDestino)) {
    document.getElementById("conversor-resultado").innerHTML = "Error: seleccione unidades válidas";
    return;
  }

  // Verificar que se haya ingresado un número
  if (isNaN(valor) || valor === "") {
    document.getElementById("conversor-resultado").innerHTML = "Error: debe ingresar un número válido";
    return;
  }

  // Convertir el valor a la unidad de origen (Dolares Americanos)
  let valorEnDolares = 0;
  switch (unidadOrigen) {
    case "USD":
      valorEnDolares = valor;
      break;
    case "EUR":
      valorEnDolares = valor / 0.85;
      break;
    case "MXN":
      valorEnDolares = valor / 20.03;
      break;
    case "COP":
      valorEnDolares = valor / 3630.28;
      break;
  }

  // Convertir el valor en Dolares a la unidad de destino
  switch (unidadDestino) {
    case "USD":
      resultado = valorEnDolares;
      simbolo = " USD";
      break;
    case "EUR":
      resultado = valorEnDolares * 0.85;
      simbolo = " EUR";
      break;
    case "MXN":
      resultado = valorEnDolares * 20.03;
      simbolo = " MXN";
      break;
    case "COP":
      resultado = valorEnDolares * 3630.28;
      simbolo = " COP";
      break;
  }

  // Mostrar el resultado en el elemento del DOM correspondiente
  document.getElementById("conversor-resultado").innerHTML = resultado.toFixed(2) + simbolo;
}

// Función para convertir unidades de longitud
function convertirLongitud() {
  // Borrar el contenido del elemento del DOM donde se muestra el resultado
  document.getElementById("conversor-resultado").innerHTML = "";
  // Establecer la variable global resultado a cero
  resultado = 0;
  
  // Obtener valores de los elementos del DOM
  const unidadOrigen = document.getElementById("unidad-origen-longitud").value;
  const unidadDestino = document.getElementById("unidad-destino-longitud").value;
  const valor = document.getElementById("valor").value;

  // Verificar que las unidades seleccionadas son válidas y diferentes
  if (unidadOrigen === unidadDestino) {
    document.getElementById("conversor-resultado").innerHTML = "Error: seleccione unidades diferentes";
    return;
  } else if (!["metros", "kilometros", "pies", "millas"].includes(unidadOrigen) || !["metros", "kilometros", "pies", "millas"].includes(unidadDestino)) {
    document.getElementById("conversor-resultado").innerHTML = "Error: seleccione unidades válidas";
    return;
  }

  // Verificar que se haya ingresado un número
  if (isNaN(valor) || valor === "") {
    document.getElementById("conversor-resultado").innerHTML = "Error: debe ingresar un número válido";
    return;
  }

  // Convertir el valor a la unidad de origen (metros)
  let valorEnMetros = 0;
  switch (unidadOrigen) {
    case "metros":
      valorEnMetros = valor;
      break;
    case "kilometros":
      valorEnMetros = valor * 1000;
      break;
    case "pies":
      valorEnMetros = valor * 0.3048;
      break;
    case "millas":
      valorEnMetros = valor * 1609.34;
      break;
  }

  // Convertir el valor en metros a la unidad de destino
  switch (unidadDestino) {
    case "metros":
      resultado = valorEnMetros;
      simbolo = "m";
      break;
    case "kilometros":
      resultado = valorEnMetros / 1000;
      simbolo = "km";
      break;
    case "pies":
      resultado = valorEnMetros / 0.3048;
      simbolo = "ft";
      break;
    case "millas":
      resultado = valorEnMetros / 1609.34;
      simbolo = "mi";
      break;
  }

  // Mostrar el resultado en el elemento del DOM correspondiente
  document.getElementById("conversor-resultado").innerHTML = resultado.toFixed(2) + simbolo;
}
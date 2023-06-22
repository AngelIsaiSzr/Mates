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

// Obtener la pantalla y los botones
const displayScreen = document.querySelector(".display-screen");
const buttons = document.querySelectorAll(".button");

// Variables para realizar las operaciones
let currentNumber = "";
let previousNumber = "";
let operation = null;
let result = null;
let lastOperation = null;

// Función para borrar un solo dígito de la pantalla
function clearOne() {
  // Obtener el contenido actual de la pantalla
  let displayScreen = document.querySelector('.display-screen');
  let displayValue = displayScreen.textContent;

  // Verificar si el último carácter es un operador
  if (displayValue.slice(-1) === "+" || displayValue.slice(-1) === "-" || displayValue.slice(-1) === "*" || displayValue.slice(-1) === "/") {
    displayValue = displayValue.slice(0, -1);
    operation = null;
  } else {
    // Eliminar el último dígito del contenido de la pantalla
    displayValue = displayValue.slice(0, -1);
  }

  // Actualizar el contenido de la pantalla
  displayScreen.textContent = displayValue;

  // Actualizar la variable currentNumber con el contenido actualizado de la pantalla
  currentNumber = displayScreen.textContent;
}

// Función para borrar todo
function clear() {
  currentNumber = "";
  previousNumber = "";
  operation = null;
  result = null;
  displayScreen.textContent = "";
}

// Función para agregar un número a la pantalla
function appendNumber(number) {
  if (number === "." && currentNumber.includes(".")) {
    return;
  }
  currentNumber += number;
  if (operation === null) {
    displayScreen.textContent = currentNumber;
  } else {
    displayScreen.textContent = previousNumber + " " + operation + " " + currentNumber;
  }
}

// Función para seleccionar una operación
function selectOperation(op) {
  if (currentNumber === "") {
    return;
  }
  if (previousNumber !== "") {
    calculate();
  }
  operation = op;
  previousNumber = currentNumber;
  currentNumber = "";
  displayScreen.textContent = previousNumber + " " + operation;
}

// Función para realizar una operación
function calculate() {
  if (operation === null) {
    return;
  }
  if (isNaN(parseFloat(previousNumber)) || isNaN(parseFloat(currentNumber))) {
    displayScreen.textContent = "Error: número inválido";
    return;
  }
  switch (operation) {
    case "+":
      result = parseFloat(previousNumber) + parseFloat(currentNumber);
      break;
    case "-":
      result = parseFloat(previousNumber) - parseFloat(currentNumber);
      break;
    case "*":
      result = parseFloat(previousNumber) * parseFloat(currentNumber);
      break;
    case "/":
      if (parseFloat(currentNumber) === 0) {
        displayScreen.textContent = "Error: Indivisible entre 0";
        return;
      }
      result = parseFloat(previousNumber) / parseFloat(currentNumber);
      break;
    default:
      return;
  }

  // Mostrar la operación
  displayScreen.textContent = previousNumber + " " + operation + " " + currentNumber;

  // Actualizar la variable lastOperation con la última operación realizada
  lastOperation = previousNumber + " " + operation + " " + currentNumber;

  // Borrar la pantalla después de un breve retraso
  displayScreen.textContent = "";

  // Mostrar el resultado
  displayScreen.textContent = result.toString();
  currentNumber = result.toString();
  operation = null;
  previousNumber = "";
}

// Función para deshacer la última acción
function undo() {
  if (currentNumber !== "") {
    currentNumber = currentNumber.slice(0, -1);
    displayScreen.textContent = currentNumber;
  } else if (operation !== null) {
    operation = null;
    displayScreen.textContent = previousNumber;
  } else if (previousNumber !== "") {
    displayScreen.textContent = previousNumber;
    currentNumber = previousNumber;
    previousNumber = "";
  } else {
    // Mostrar la última operación realizada
    if (lastOperation !== null) {
      displayScreen.textContent = lastOperation;
      currentNumber = lastOperation.split(" ")[2];
      previousNumber = lastOperation.split(" ")[0];
      operation = lastOperation.split(" ")[1];
    } else {
      displayScreen.textContent = "";
    }
  }
}

// Agregar un evento de clic a cada botón
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.value;
    if (value === "clear") {
      // Si el botón es "clear", borrar todo
      clear();
    } else if (value === "+" || value === "-" || value === "*" || value === "/") {
      // Si el botón es un operador, seleccionar la operación
      selectOperation(value);
    } else if (value === "=") {
      // Si el botón es "=", realizar la operación
      calculate();
    } else if (value === "R") {
      // Si el botón es "R", deshacer la última acción
      undo();
    } else {
      // Si el botón es un número o un punto decimal, agregarlo a la pantalla
      // Verificar si el botón que se hizo clic es el botón CE
      if (button.classList.contains("clearOne")) {
        clearOne();
      } else {
        appendNumber(value);
      }
    }
  });
});
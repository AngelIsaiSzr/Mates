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

function mostrarTabla() {
  const tabla = parseInt(document.getElementById("tabla").value);
  const resultado = document.getElementById("tabla-resultado");
  const carga = document.getElementById("tabla-carga");

  carga.style.display = 'block';
  resultado.style.display = 'none';
  
  if (isNaN(tabla)) {
    resultado.innerHTML = "Error: debe ingresar un número válido";
    carga.style.display = 'none';
    resultado.style.display = 'block';
  } else {
    let resultadoTabla = "";
    for (let i = 1; i <= 10; i++) {
      resultadoTabla += `${tabla} x ${i} = ${tabla * i}<br>`;
    }
    resultado.innerHTML = resultadoTabla;
    carga.style.display = 'none';
    resultado.style.display = 'block';
  }
}

function descargarTabla() {
  const tabla = document.getElementById("tabla-resultado");
  
  if (tabla.innerHTML.trim() === "" || tabla.innerHTML.trim() === "Error: debe ingresar un número válido" || tabla.innerHTML.trim() === "Error: no ha generado ninguna tabla") {
    const resultado = document.getElementById("tabla-resultado");
    resultado.innerHTML = "Error: no ha generado ninguna tabla";
  } else {
    tabla.style.fontSize = "14px";
    html2canvas(tabla, {scale: 3}).then(function(canvas) {
      const doc = new jsPDF();
      const imgData = canvas.toDataURL("image/png");
      const imgWidth = 170;
      const pageHeight = (imgWidth * canvas.height) / canvas.width;
      let marginLeft = 0;
      let marginTop = -1;
      if (imgWidth < 210) {
        marginLeft = (210 - imgWidth) / 2;
        marginTop = (297 - pageHeight) / 2;
      }
      doc.addImage(imgData, "PNG", marginLeft, marginTop, imgWidth, pageHeight);
      doc.save("Tabla.pdf");
      tabla.style.fontSize = "18px";
    });
  }
}
// Archivo: trabajos.js

// Obtener elementos del DOM
const formularioTrabajo = document.getElementById("formulario-trabajo");
const listaTrabajos = document.getElementById("lista-trabajos");

// Obtener datos de localStorage o inicializar
let trabajos = JSON.parse(localStorage.getItem("trabajos")) || [];

// Función para guardar en localStorage
function guardarTrabajos() {
  localStorage.setItem("trabajos", JSON.stringify(trabajos));
}

// Función para renderizar los trabajos en la lista
function mostrarTrabajos() {
  listaTrabajos.innerHTML = "";

  trabajos.forEach((trabajo, index) => {
    const item = document.createElement("li");

    const total = parseFloat(trabajo.total);
    const porcentaje = parseFloat(trabajo.porcentaje);
    const adelanto = (total * porcentaje / 100).toFixed(2);
    const restante = (total - adelanto).toFixed(2);

    item.innerHTML = `
      <strong>${trabajo.nombre}</strong> | Cliente: ${trabajo.cliente} | Fecha: ${trabajo.fecha} <br>
      Total: S/ ${total.toFixed(2)} | Anticipo (${porcentaje}%): S/ ${adelanto} | Restante: S/ ${restante}
    `;

    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "Eliminar";
    btnEliminar.style.marginLeft = "10px";
    btnEliminar.addEventListener("click", () => {
      trabajos.splice(index, 1);
      guardarTrabajos();
      mostrarTrabajos();
    });

    item.appendChild(btnEliminar);
    listaTrabajos.appendChild(item);
  });
}

// Manejador del formulario
formularioTrabajo.addEventListener("submit", function (e) {
  e.preventDefault();

  const nombre = document.getElementById("nombre-trabajo").value;
  const cliente = document.getElementById("cliente-trabajo").value;
  const fecha = document.getElementById("fecha-trabajo").value;
  const total = parseFloat(document.getElementById("total-trabajo").value);
  const porcentaje = parseFloat(document.getElementById("porcentaje-trabajo").value);

  if (!nombre || !cliente || !fecha || isNaN(total) || isNaN(porcentaje)) {
    alert("Por favor completa todos los campos correctamente.");
    return;
  }

  trabajos.push({ nombre, cliente, fecha, total, porcentaje });
  guardarTrabajos();
  formularioTrabajo.reset();
  mostrarTrabajos();
});

// Inicializar al cargar
mostrarTrabajos();

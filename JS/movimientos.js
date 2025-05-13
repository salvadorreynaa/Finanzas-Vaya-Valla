function cargarMovimientos() {
  const movimientos = JSON.parse(localStorage.getItem("movimientos")) || [];
  const tbody = document.getElementById("lista-movimientos");
  const mesSeleccionado = document.getElementById("filtroMes").value;
  const añoSeleccionado = document.getElementById("filtroAño").value;

  tbody.innerHTML = "";
  let ingresos = 0;
  let egresos = 0;

  movimientos.forEach((mov, index) => {
    // Convertimos el monto a número de forma segura
    const monto = parseFloat(mov.monto);

    // Si el monto no es un número válido, lo ignoramos
    if (isNaN(monto)) return;

    if (
      (mesSeleccionado === "Todos" || mov.mes === mesSeleccionado) &&
      (añoSeleccionado === "Todos" || mov.año === añoSeleccionado)
    ) {
      const fila = document.createElement("tr");

      fila.innerHTML = `
        <td>${mov.tipo}</td>
        <td>${mov.descripcion}</td>
        <td>${mov.cliente}</td>
        <td>${mov.fecha}</td>
        <td>${mov.mes}</td>
        <td>${mov.año}</td>
        <td>${monto.toFixed(2)}</td>
        <td>
          <button class="boton-estado ${
            mov.estado === "Pagado" || mov.estado === "Cobrado" ? "verde" : ""
          }" onclick="cambiarEstado(${index})">${mov.estado}</button>
        </td>
      `;
      tbody.appendChild(fila);

      if (mov.tipo === "ingreso") ingresos += monto;
      if (mov.tipo === "egreso") egresos += monto;
    }
  });

  const disponible = ingresos - egresos;
  document.getElementById("total-ingresos").textContent = `S/ ${ingresos.toFixed(2)}`;
  document.getElementById("total-egresos").textContent = `S/ ${egresos.toFixed(2)}`;
  document.getElementById("dinero-disponible").textContent = `S/ ${disponible.toFixed(2)}`;
}

function cambiarEstado(index) {
  let movimientos = JSON.parse(localStorage.getItem("movimientos")) || [];
  const estados = ["Pendiente", "Cobrado", "Pagado"];
  const actual = movimientos[index].estado;
  const siguiente = estados[(estados.indexOf(actual) + 1) % estados.length];
  movimientos[index].estado = siguiente;
  localStorage.setItem("movimientos", JSON.stringify(movimientos));
  cargarMovimientos();
}

document.getElementById("filtroMes").addEventListener("change", cargarMovimientos);
document.getElementById("filtroAño").addEventListener("change", cargarMovimientos);
window.addEventListener("load", cargarMovimientos);

document.getElementById("formulario").addEventListener("submit", function (e) {
  e.preventDefault();

  const tipo = document.getElementById("tipo").value;
  const descripcion = document.getElementById("descripcion").value.trim(); // Limpiar espacios
  const cliente = document.getElementById("cliente").value.trim(); // Limpiar espacios
  const fecha = document.getElementById("fecha").value.trim(); // Limpiar espacios
  const mes = document.getElementById("mes").value;
  const año = document.getElementById("año").value;
  const monto = parseFloat(document.getElementById("monto").value);

  // Validación para asegurarse de que todos los campos estén completos
  if (!descripcion || !cliente || !fecha || isNaN(monto)) {
    alert("Por favor completa todos los campos correctamente.");
    return;
  }

  // Crear el nuevo movimiento
  const nuevoMovimiento = {
    tipo,
    descripcion,
    cliente,
    fecha,
    mes,
    año,
    monto,
    estado: "Pendiente" // Estado inicial
  };

  // Obtener los movimientos previos del localStorage, o un array vacío si no existen
  const movimientos = JSON.parse(localStorage.getItem("movimientos")) || [];
  
  // Agregar el nuevo movimiento al array
  movimientos.push(nuevoMovimiento);

  // Guardar los movimientos actualizados en localStorage
  localStorage.setItem("movimientos", JSON.stringify(movimientos));

  // Mostrar un mensaje de éxito
  alert("Movimiento guardado correctamente.");

  // Limpiar el formulario después de guardar
  document.getElementById("formulario").reset();
});

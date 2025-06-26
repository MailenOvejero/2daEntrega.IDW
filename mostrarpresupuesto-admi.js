document.addEventListener("DOMContentLoaded", () => {
  cargarPresupuestos();

 
  document.querySelector("#tablaPresupuestos tbody").addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-borrar")) {
      const id = parseInt(e.target.dataset.id);
      borrarPresupuesto(id);
    }
  });
});


function cargarPresupuestos() {
  const presupuestos = JSON.parse(localStorage.getItem("presupuestos")) || [];
  const tbody = document.querySelector("#tablaPresupuestos tbody");
  tbody.innerHTML = "";

  presupuestos.forEach(presupuesto => {
    const serviciosTexto = presupuesto.servicios
      .map(s => `${s.tipo}: ${s.nombre} ($${s.precio})`)
      .join(", ");

    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${presupuesto.id}</td>
      <td>${presupuesto.nombreCompleto}</td>
      <td>${presupuesto.fecha}</td>
      <td>${presupuesto.tematica}</td>
      <td>$${presupuesto.valorTotal}</td>
      <td>${serviciosTexto}</td>
      <td>
        <button class="btn btn-danger btn-sm btn-borrar" data-id="${presupuesto.id}">Borrar</button>
      </td>
    `;

    tbody.appendChild(fila);
  });
}

function borrarPresupuesto(id) {
  let presupuestos = JSON.parse(localStorage.getItem("presupuestos")) || [];
  presupuestos = presupuestos.filter(p => p.id !== id);
  localStorage.setItem("presupuestos", JSON.stringify(presupuestos));
  cargarPresupuestos(); 
}

function cerrarSesion() {
  sessionStorage.clear();
  window.location.href = "index.html";
}

document.getElementById("cerrarSesionBtn").onclick = cerrarSesion;
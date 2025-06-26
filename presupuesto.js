const SALONES_PREDEFINIDOS = [
  { id: 1, nombre: "Caritas", precio: 30000 },
  { id: 2, nombre: "Travesuras", precio: 30000 },
  { id: 3, nombre: "Smile Eventos", precio: 30000 },
  { id: 4, nombre: "Sueño Eventos", precio: 30000 },
  { id: 5, nombre: "Amor Eterno", precio: 30000 },
  { id: 6, nombre: "White Eventos", precio: 30000 },
  { id: 7, nombre: "Next Party", precio: 30000 },
  { id: 8, nombre: "Urban Eventos", precio: 30000 },
  { id: 9, nombre: "Aura", precio: 30000 }
];

const MENUS_PREDEFINIDOS = [
  { id: 1, nombre: "Menú Infantil", precio: 3000 },
  { id: 2, nombre: "Menú Adulto", precio: 5000 }
];

function combinarSinDuplicados(locales, predefinidos, key = "nombre") {
  const nombresLocales = new Set(locales.map(item => item[key]));
  return [...locales, ...predefinidos.filter(item => !nombresLocales.has(item[key]))];
}

function obtenerProximoId() {
  let ultimoId = parseInt(localStorage.getItem("ultimoPresupuestoId")) || 0;
  const nuevoId = ultimoId + 1;
  localStorage.setItem("ultimoPresupuestoId", nuevoId);
  return nuevoId;
}

document.addEventListener("DOMContentLoaded", () => {
  precargarServiciosSiNoExisten();
  cargarOpcionesServicios();

  const PRESUPUESTOS_KEY = "presupuestos";
  const form = document.getElementById("formPresupuesto");
  const resultadoSection = document.getElementById("resultadoPresupuesto");
  const resumenServicios = document.getElementById("resumenServicios");
  const totalPresupuesto = document.getElementById("totalPresupuesto");
  const btnNuevoPresupuesto = document.getElementById("btnNuevoPresupuesto");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!validarFormulario()) return;

    const presupuesto = crearPresupuesto();
    guardarPresupuesto(presupuesto);
    mostrarResultado(presupuesto);
    form.reset();
  });

  if (btnNuevoPresupuesto) {
    btnNuevoPresupuesto.addEventListener("click", () => {
      resultadoSection.classList.add("d-none");
      form.scrollIntoView({ behavior: "smooth" });
    });
  }

  function cargarOpcionesServicios() {
    const salonesLocales = JSON.parse(localStorage.getItem("salonesEventos")) || [];
    const salonesCombinados = combinarSinDuplicados(salonesLocales, SALONES_PREDEFINIDOS);
    cargarSelect("salonSeleccionado", salonesCombinados);

    const menusLocales = JSON.parse(localStorage.getItem("menuItems")) || [];
    const menusCombinados = combinarSinDuplicados(menusLocales, MENUS_PREDEFINIDOS);
    cargarSelect("menuSeleccionado", menusCombinados);

    const juegosDisponibles = JSON.parse(localStorage.getItem("juegosDisponibles")) || [];
    const juegosAdmin = JSON.parse(localStorage.getItem("juegosItems")) || [];
    const juegosCombinados = combinarSinDuplicados(juegosDisponibles, juegosAdmin, "nombre");
    cargarSelect("juegoSeleccionado", juegosCombinados);
  }

  function cargarSelect(selectId, opciones) {
    const select = document.getElementById(selectId);
    if (!select) return;
    select.innerHTML = '<option value="" selected disabled>Seleccione una opción</option>';

    opciones.forEach(item => {
      const precio = item.precio ?? 0;
      const opt = document.createElement("option");
      opt.value = precio;
      opt.textContent = `${item.nombre} - $${precio}`;
      opt.dataset.nombre = item.nombre;
      select.appendChild(opt);
    });
  }

  function validarFormulario() {
    const camposRequeridos = ["apellido", "nombre", "fecha", "tematica"];
    let valido = true;

    camposRequeridos.forEach(id => {
      const campo = document.getElementById(id);
      if (!campo.value.trim()) {
        campo.classList.add("is-invalid");
        valido = false;
      } else {
        campo.classList.remove("is-invalid");
      }
    });

    const fechaEvento = new Date(document.getElementById("fecha").value);
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    if (fechaEvento < hoy) {
      alert("La fecha del evento no puede ser anterior a hoy");
      return false;
    }

    const servicios = obtenerServiciosSeleccionados();
    if (servicios.length === 0) {
      alert("Debes seleccionar al menos un servicio");
      return false;
    }

    return valido;
  }

  function crearPresupuesto() {
    const servicios = obtenerServiciosSeleccionados();
    const total = servicios.reduce((acc, s) => acc + s.precio, 0);

    return {
      id: obtenerProximoId(), // ✅ ID incremental
      nombreCompleto: `${document.getElementById("apellido").value.trim()}, ${document.getElementById("nombre").value.trim()}`,
      fecha: document.getElementById("fecha").value,
      tematica: document.getElementById("tematica").value.trim(),
      valorTotal: total,
      servicios: servicios,
      estado: "Pendiente",
      fechaCreacion: new Date().toISOString()
    };
  }

  function obtenerServiciosSeleccionados() {
    const servicios = [];
    const selects = {
      "Salón": "salonSeleccionado",
      "Menú": "menuSeleccionado",
      "Juego": "juegoSeleccionado"
    };

    for (const [tipo, id] of Object.entries(selects)) {
      const select = document.getElementById(id);
      if (select && select.value) {
        servicios.push({
          tipo,
          nombre: select.options[select.selectedIndex].dataset.nombre,
          precio: parseInt(select.value)
        });
      }
    }

    return servicios;
  }

  function guardarPresupuesto(presupuesto) {
    const presupuestos = JSON.parse(localStorage.getItem(PRESUPUESTOS_KEY)) || [];
    presupuestos.push(presupuesto);
    localStorage.setItem(PRESUPUESTOS_KEY, JSON.stringify(presupuestos));

    const toast = new bootstrap.Toast(document.getElementById('toastPresupuesto'));
    toast.show();
  }

  function mostrarResultado(presupuesto) {
    resumenServicios.innerHTML = "";

    presupuesto.servicios.forEach(s => {
      const li = document.createElement("li");
      li.className = "list-group-item d-flex justify-content-between align-items-center";
      li.innerHTML = `
          <span>${s.tipo}: ${s.nombre}</span>
          <span class="badge bg-primary rounded-pill">$${s.precio}</span>
      `;
      resumenServicios.appendChild(li);
    });

    totalPresupuesto.textContent = presupuesto.valorTotal;
    document.getElementById("presupuestoIdResultado").textContent = presupuesto.id;
    document.getElementById("clienteResultado").textContent = presupuesto.nombreCompleto;
    document.getElementById("fechaResultado").textContent = presupuesto.fecha;
    document.getElementById("tematicaResultado").textContent = presupuesto.tematica;

    resultadoSection.classList.remove("d-none");
    resultadoSection.scrollIntoView({ behavior: "smooth" });
  }
});

function precargarServiciosSiNoExisten() {
  if (!localStorage.getItem("salonesEventos")) {
    localStorage.setItem("salonesEventos", JSON.stringify([
      { nombre: "Salón carita feliz", precio: 10000 },
      { nombre: "Salón sonrisitas", precio: 15000 }
    ]));
  }

  if (!localStorage.getItem("menuItems")) {
    localStorage.setItem("menuItems", JSON.stringify([
      { nombre: "Menú kinder", precio: 6000 },
      { nombre: "Menú Adulto", precio: 8000 }
    ]));
  }

  if (!localStorage.getItem("juegosDisponibles")) {
    localStorage.setItem("juegosDisponibles", JSON.stringify([
      { nombre: "Castillo Inflable", precio: 20000 },
      { nombre: "animadoras", precio: 25000 }
    ]));
  }
}

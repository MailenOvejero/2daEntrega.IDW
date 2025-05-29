document.addEventListener("DOMContentLoaded", () => {
  validarSesion();
  mostrarSalonesEnTabla();
  mostrarSalonesPredefinidos();
});

const SALONES_KEY = "salonesEventos";
const SALONES_KEY_PREDEFINIDOS = "salonesPredefinidos";

const SALONES_PREDEFINIDOS = [
  { id: 1, nombre: "Caritas", capacidad: 80, ubicacion: "Belgrano", descripcion: "Megajuego, alberca de pelotas, laberinto de ligas, toboganes.", imagen: "imagenes/imgservicios/salonvertical.jpg" },
  { id: 2, nombre: "Travesuras", capacidad: 90, ubicacion: "Pellegrini 865", descripcion: "Juegos para niños, plaza blanda, pantalla temática.", imagen: "imagenes/imgservicios/trave2.jpg" },
  { id: 3, nombre: "Smile Eventos", capacidad: 100, ubicacion: "Avenida Belgrano 765", descripcion: "Pista de baile, videojuegos, castillo inflable, metegol.", imagen: "imagenes/imgservicios/aura1.jpg" },
  { id: 4, nombre: "Sueño Eventos", capacidad: 150, ubicacion: "Bolivia 234", descripcion: "Espacio para ceremonia, salón ambientado con luces cálidas, fotocabina.", imagen: "imagenes/imgservicios/boda.png" },
  { id: 5, nombre: "Amor Eterno", capacidad: 120, ubicacion: "Belgrano", descripcion: "Alberca de pelotas, laberintos, mesa de hockey, toboganes.", imagen: "imagenes/imgservicios/amoreterno.jpg" },
  { id: 6, nombre: "White Eventos", capacidad: 150, ubicacion: "La Rioja 222", descripcion: "Vista imponente, ambiente sofisticado, catering gourmet, barra de tragos premium.", imagen: "imagenes/imgservicios/white3.jpg" },
  { id: 7, nombre: "Next Party", capacidad: 200, ubicacion: "Matanza 567", descripcion: "Espacio moderno con pista de luces y sonido envolvente.", imagen: "imagenes/imgservicios/general.jpg" },
  { id: 8, nombre: "Urban Eventos", capacidad: 180, ubicacion: "La Rioja 222", descripcion: "Diseño elegante, estilo minimalista, ideal para recepciones empresariales.", imagen: "imagenes/imgservicios/urban.jpg" },
  { id: 9, nombre: "Aura", capacidad: 100, ubicacion: "San Justo 567", descripcion: "Decoración cálida, efectos de luces, ideal para eventos infantiles y baby showers.", imagen: "imagenes/imgservicios/au1.jpg" }
];

function validarSesion() {
  const usuario = localStorage.getItem("usuarioLogueado");
  if (!usuario) {
    alert("Debes iniciar sesión primero.");
    window.location.href = "iniciosesion.html";
  } else {
    document.getElementById("usuarioActivo").textContent = usuario;
  }
}

function cerrarSesion() {
  localStorage.removeItem("usuarioLogueado");
  window.location.href = "index.html";
}

function obtenerSalones() {
  return JSON.parse(localStorage.getItem(SALONES_KEY)) || [];
}

function agregarSalon(nombre, capacidad, ubicacion, descripcion, imagenBase64, nombreImagen) {
  let salones = obtenerSalones();
  let nuevoSalon = {
    id: salones.length ? salones[salones.length - 1].id + 1 : 1,
    nombre, capacidad, ubicacion, descripcion, imagen: imagenBase64, nombreImagen
  };
  salones.push(nuevoSalon);
  localStorage.setItem(SALONES_KEY, JSON.stringify(salones));
  console.log("Nuevo salón guardado:", nuevoSalon);
  mostrarSalonesEnTabla();
}

function eliminarSalon(id) {
  let confirmar = confirm("¿Estás seguro de que quieres eliminar este salón?");
  if (confirmar) {
    let salones = obtenerSalones();
    salones = salones.filter(salon => salon.id !== id);
    localStorage.setItem(SALONES_KEY, JSON.stringify(salones));
    mostrarSalonesEnTabla();
  }
}

function modificarSalon(id) {
  let nombre = document.querySelector(`#nombre-${id}`).value.trim();
  let capacidad = parseInt(document.querySelector(`#capacidad-${id}`).value);
  let ubicacion = document.querySelector(`#ubicacion-${id}`).value.trim();
  let descripcion = document.querySelector(`#descripcion-${id}`).value.trim();
  let archivoImagen = document.querySelector(`#imagen-${id}`).files[0];
  let salones = obtenerSalones();
  let index = salones.findIndex(salon => salon.id == id);
  if (index !== -1) {
    if (archivoImagen) {
      const reader = new FileReader();
      reader.onload = function (e) {
        salones[index].imagen = e.target.result;
        localStorage.setItem(SALONES_KEY, JSON.stringify(salones));
        mostrarSalonesEnTabla();
      };
      reader.readAsDataURL(archivoImagen);
    } else {
      salones[index] = { id, nombre, capacidad, ubicacion, descripcion, imagen: salones[index].imagen };
      localStorage.setItem(SALONES_KEY, JSON.stringify(salones));
      mostrarSalonesEnTabla();
    }
  }
}

function mostrarSalonesEnTabla() {
  let salones = obtenerSalones();
  let tablaBody = document.querySelector("#tablaSalones tbody");
  tablaBody.innerHTML = "";
  salones.forEach(salon => {
    let fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${salon.id}</td>
      <td><span id="nombre-text-${salon.id}">${salon.nombre}</span>
          <input type="text" id="nombre-${salon.id}" value="${salon.nombre}" class="d-none"></td>
      <td><span id="capacidad-text-${salon.id}">${salon.capacidad}</span>
          <input type="number" id="capacidad-${salon.id}" value="${salon.capacidad}" class="d-none"></td>
      <td><span id="ubicacion-text-${salon.id}">${salon.ubicacion}</span>
          <input type="text" id="ubicacion-${salon.id}" value="${salon.ubicacion}" class="d-none"></td>
      <td><span id="descripcion-text-${salon.id}">${salon.descripcion}</span>
          <textarea id="descripcion-${salon.id}" rows="3" class="d-none">${salon.descripcion}</textarea></td>
      <td><img src="${salon.imagen}" style="max-width: 100px; border-radius: 5px;">
          <input type="file" id="imagen-${salon.id}" class="form-control mt-2 d-none" accept="image/*"></td>
      <td>
        <button class="btn btn-secondary btn-sm" onclick="editarSalon(${salon.id})" id="editar-${salon.id}">Editar</button>
        <button class="btn btn-success btn-sm d-none" onclick="modificarSalon(${salon.id})" id="guardar-${salon.id}">Guardar Cambios</button>
        <button class="btn btn-danger btn-sm" onclick="eliminarSalon(${salon.id})">Eliminar</button>
      </td>
    `;
    tablaBody.appendChild(fila);
  });
}

function editarSalon(id) {
  document.querySelector(`#nombre-text-${id}`).classList.add("d-none");
  document.querySelector(`#capacidad-text-${id}`).classList.add("d-none");
  document.querySelector(`#ubicacion-text-${id}`).classList.add("d-none");
  document.querySelector(`#descripcion-text-${id}`).classList.add("d-none");
  document.querySelector(`#nombre-${id}`).classList.remove("d-none");
  document.querySelector(`#capacidad-${id}`).classList.remove("d-none");
  document.querySelector(`#ubicacion-${id}`).classList.remove("d-none");
  document.querySelector(`#descripcion-${id}`).classList.remove("d-none");
  document.querySelector(`#imagen-${id}`).classList.remove("d-none");
  document.querySelector(`#editar-${id}`).classList.add("d-none");
  document.querySelector(`#guardar-${id}`).classList.remove("d-none");
}

function obtenerSalonesPredefinidos() {
  return JSON.parse(localStorage.getItem(SALONES_KEY_PREDEFINIDOS)) || [];
}

function mostrarSalonesPredefinidos() {
  let salones = SALONES_PREDEFINIDOS.map(salon => {
    let editado = JSON.parse(localStorage.getItem(`salon_editado_${salon.id}`));
    return editado || salon;
  });
  let tablaBody = document.querySelector("#tablaSalonesPredefinidos tbody");
  tablaBody.innerHTML = "";
  salones.forEach(salon => {
    let fila = document.createElement("tr");
    fila.innerHTML = `
      <td><span id="nombre-predef-text-${salon.id}">${salon.nombre}</span>
          <input type="text" id="nombre-predef-${salon.id}" value="${salon.nombre}" class="d-none"></td>
      <td><span id="capacidad-predef-text-${salon.id}">${salon.capacidad}</span>
          <input type="number" id="capacidad-predef-${salon.id}" value="${salon.capacidad}" class="d-none"></td>
      <td><span id="ubicacion-predef-text-${salon.id}">${salon.ubicacion}</span>
          <input type="text" id="ubicacion-predef-${salon.id}" value="${salon.ubicacion}" class="d-none"></td>
      <td><span id="descripcion-predef-text-${salon.id}">${salon.descripcion}</span>
          <textarea id="descripcion-predef-${salon.id}" rows="3" class="d-none">${salon.descripcion}</textarea></td>
      <td><img src="${salon.imagen}" style="max-width: 100px;">
          <input type="file" id="imagen-predef-${salon.id}" class="form-control mt-2 d-none" accept="image/*"></td>
      <td>
        <button class="btn btn-secondary btn-sm" onclick="editarSalonPredefinido(${salon.id})" id="editar-predef-${salon.id}">Editar</button>
        <button class="btn btn-success btn-sm d-none" onclick="modificarSalonPredefinido(${salon.id})" id="guardar-predef-${salon.id}">Guardar Cambios</button>
      </td>
    `;
    tablaBody.appendChild(fila);
  });
}

function editarSalonPredefinido(id) {
  document.querySelector(`#nombre-predef-text-${id}`).classList.add("d-none");
  document.querySelector(`#capacidad-predef-text-${id}`).classList.add("d-none");
  document.querySelector(`#ubicacion-predef-text-${id}`).classList.add("d-none");
  document.querySelector(`#descripcion-predef-text-${id}`).classList.add("d-none");
  document.querySelector(`#nombre-predef-${id}`).classList.remove("d-none");
  document.querySelector(`#capacidad-predef-${id}`).classList.remove("d-none");
  document.querySelector(`#ubicacion-predef-${id}`).classList.remove("d-none");
  document.querySelector(`#descripcion-predef-${id}`).classList.remove("d-none");
  document.querySelector(`#imagen-predef-${id}`).classList.remove("d-none");
  document.querySelector(`#editar-predef-${id}`).classList.add("d-none");
  document.querySelector(`#guardar-predef-${id}`).classList.remove("d-none");
}

function modificarSalonPredefinido(id) {
  let nombre = document.querySelector(`#nombre-predef-${id}`).value.trim();
  let capacidad = parseInt(document.querySelector(`#capacidad-predef-${id}`).value);
  let ubicacion = document.querySelector(`#ubicacion-predef-${id}`).value.trim();
  let descripcion = document.querySelector(`#descripcion-predef-${id}`).value.trim();
  let archivoImagen = document.querySelector(`#imagen-predef-${id}`).files[0];

  let salonEditado = JSON.parse(localStorage.getItem(`salon_editado_${id}`)) || SALONES_PREDEFINIDOS.find(salon => salon.id === id);
  if (!salonEditado) {
    console.error("No se encontró el salón con ID:", id);
    return;
  }

  salonEditado.nombre = nombre;
  salonEditado.capacidad = capacidad;
  salonEditado.ubicacion = ubicacion;
  salonEditado.descripcion = descripcion;

  if (archivoImagen) {
    const reader = new FileReader();
    reader.onload = function (e) {
      salonEditado.imagen = e.target.result;
      guardarEdicionSalon(id, salonEditado);
    };
    reader.readAsDataURL(archivoImagen);
  } else {
    guardarEdicionSalon(id, salonEditado);
  }
}

function guardarEdicionSalon(id, salon) {
  localStorage.setItem(`salon_editado_${id}`, JSON.stringify(salon));
  mostrarSalonesPredefinidos();
}

document.getElementById("formSalon").addEventListener("submit", function (e) {
  e.preventDefault();
  const nombre = document.getElementById("nombreSalon").value.trim();
  const capacidad = parseInt(document.getElementById("capacidadSalon").value);
  const ubicacion = document.getElementById("ubicacionSalon").value.trim();
  const descripcion = document.getElementById("descripcionSalon").value.trim();
  const archivoImagen = document.getElementById("imagenSalon").files[0];
  if (!archivoImagen) {
    alert("Por favor, seleccioná una imagen.");
    return;
  }
  const reader = new FileReader();
  reader.onload = function (e) {
    const imagenBase64 = e.target.result;
    agregarSalon(nombre, capacidad, ubicacion, descripcion, imagenBase64, archivoImagen.name);
    document.getElementById("formSalon").reset();
  };
  reader.readAsDataURL(archivoImagen);
});

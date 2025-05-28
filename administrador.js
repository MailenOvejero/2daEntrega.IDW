document.addEventListener("DOMContentLoaded", () => {
  validarSesion();
  mostrarSalonesEnTabla();

  const formulario = document.querySelector("#formSalon");
  formulario.addEventListener("submit", (event) => {
    event.preventDefault();

    let nombre = document.querySelector("#nombreSalon").value.trim();
    let capacidad = parseInt(document.querySelector("#capacidadSalon").value);
    let ubicacion = document.querySelector("#ubicacionSalon").value.trim();
    let descripcion = document.querySelector("#descripcionSalon").value.trim();
    let archivoImagen = document.querySelector("#imagenSalon").files[0];

    if (nombre && capacidad && ubicacion && descripcion && archivoImagen) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const imagenBase64 = e.target.result;
        const nombreImagen = archivoImagen.name;
        agregarSalon(nombre, capacidad, ubicacion, descripcion, imagenBase64, nombreImagen);
        formulario.reset();
        mostrarSalonesEnTabla();
      };
      reader.readAsDataURL(archivoImagen);
    } else {
      alert("Por favor, completa todos los campos correctamente.");
    }
  });

  document.querySelector("#cerrarSesionBtn").addEventListener("click", cerrarSesion);
});

const SALONES_KEY = "salonesEventos";

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
    nombre,
    capacidad,
    ubicacion,
    descripcion,
    imagen: imagenBase64,
    nombreImagen
  };
  salones.push(nuevoSalon);
  localStorage.setItem(SALONES_KEY, JSON.stringify(salones));
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

  if (nombre && capacidad && ubicacion && descripcion) {
    let salones = obtenerSalones();
    let index = salones.findIndex(salon => salon.id === id);
    if (index !== -1) {
      let imagen = salones[index].imagen || "";
      let nombreImagen = salones[index].nombreImagen || "Sin imagen";
      salones[index] = { id, nombre, capacidad, ubicacion, descripcion, imagen, nombreImagen };
      localStorage.setItem(SALONES_KEY, JSON.stringify(salones));
      mostrarSalonesEnTabla();
    }
  } else {
    alert("Por favor, ingresa valores válidos antes de guardar.");
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
      <td><input type="text" id="nombre-${salon.id}" value="${salon.nombre}"></td>
      <td><input type="number" id="capacidad-${salon.id}" value="${salon.capacidad}"></td>
      <td><input type="text" id="ubicacion-${salon.id}" value="${salon.ubicacion}"></td>
      <td><textarea id="descripcion-${salon.id}" rows="3">${salon.descripcion}</textarea></td>
      <td>${salon.nombreImagen || 'Sin imagen'}</td>
      <td>
        <button class="btn btn-success btn-sm" onclick="modificarSalon(${salon.id})">Guardar Cambios</button>
        <button class="btn btn-danger btn-sm" onclick="eliminarSalon(${salon.id})">Eliminar</button>
      </td>
    `;
    tablaBody.appendChild(fila);
  });
}

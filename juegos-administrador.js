if (!sessionStorage.getItem("accessToken")) {
  window.location.href = "iniciosesion.html";
}

document.addEventListener("DOMContentLoaded", () => {
  validarSesion();
  inicializarDatos();
  mostrarItems();
});

const ITEMS_KEY = "juegosItems";

const ITEMS_PREDEFINIDOS = [
  {
    id: 1,
    nombre: "Castillo Inflable",
    categoria: "Inflable",
    descripcion: "Castillo inflable gigante para eventos infantiles.",
    precio: 15000,
    imagen: "imagenes/imgservicios/salonvertical.jpg"
  },
  {
    id: 2,
    nombre: "Plaza Blanda",
    categoria: "Didáctico",
    descripcion: "Espacio seguro con colchonetas y bloques grandes.",
    precio: 12000,
    imagen: "imagenes/imgservicios/amoreterno.jpg"
  },
  {
    id: 3,
    nombre: "Pantalla Interactiva",
    categoria: "Tecnología",
    descripcion: "Juegos interactivos para niños de todas las edades.",
    precio: 18000,
    imagen: "imagenes/imgservicios/aura1.jpg"
  }
];

function validarSesion() {
  const usuario = sessionStorage.getItem("usuario");
  if (!usuario) {
    alert("Debes iniciar sesión primero.");
    window.location.href = "iniciosesion.html";
  } else {
    const usuarioActivo = JSON.parse(usuario);
    document.getElementById("usuarioActivo").textContent = usuarioActivo.username;
  }
}

function cerrarSesion() {
  sessionStorage.clear();
  window.location.href = "index.html";
}

document.getElementById("cerrarSesionBtn").onclick = cerrarSesion;

function inicializarDatos() {
  if (!localStorage.getItem(ITEMS_KEY)) {
    localStorage.setItem(ITEMS_KEY, JSON.stringify(ITEMS_PREDEFINIDOS));
  }
}

document.getElementById("formJuegos").addEventListener("submit", function (e) {
  e.preventDefault();

  const nombre = document.getElementById("nombreJuegos").value.trim();
  const categoria = document.getElementById("categoriaJuegos").value.trim();
  const precio = parseFloat(document.getElementById("precioJuegos").value);
  const descripcion = document.getElementById("descripcionJuegos").value.trim();
  const archivoImagen = document.getElementById("imagenJuegos").files[0];

  if (!archivoImagen) {
    alert("Selecciona una imagen");
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    const imagenBase64 = e.target.result;
    let items = obtenerItems();
    const nuevoItem = {
      id: items.length ? items[items.length - 1].id + 1 : 1,
      nombre,
      categoria,
      descripcion,
      precio,
      imagen: imagenBase64
    };
    items.push(nuevoItem);
    guardarItems(items);
    mostrarItems();
    document.getElementById("formJuegos").reset();
  };
  reader.readAsDataURL(archivoImagen);
});

function obtenerItems() {
  return JSON.parse(localStorage.getItem(ITEMS_KEY)) || [];
}

function guardarItems(items) {
  localStorage.setItem(ITEMS_KEY, JSON.stringify(items));
}

function mostrarItems() {
  const items = obtenerItems();
  const tbody = document.querySelector("#tablaItems tbody");
  tbody.innerHTML = "";

  items.forEach(item => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${item.id}</td>
      <td>
        <span id="nombre-text-${item.id}">${item.nombre}</span>
        <input type="text" id="nombre-${item.id}" value="${item.nombre}" class="form-control d-none">
      </td>
      <td>
        <span id="categoria-text-${item.id}">${item.categoria}</span>
        <input type="text" id="categoria-${item.id}" value="${item.categoria}" class="form-control d-none">
      </td>
      <td>
        <span id="descripcion-text-${item.id}">${item.descripcion}</span>
        <input type="text" id="descripcion-${item.id}" value="${item.descripcion}" class="form-control d-none">
      </td>
      <td>
        <span id="precio-text-${item.id}">$${item.precio}</span>
        <input type="number" id="precio-${item.id}" value="${item.precio}" class="form-control d-none">
      </td>
      <td>
        <img src="${item.imagen}" style="max-width: 100px;">
        <input type="file" id="imagen-${item.id}" class="form-control mt-2 d-none" accept="image/*">
      </td>
      <td>
        <button onclick="editarItem(${item.id})" id="editar-${item.id}" class="btn btn-secondary btn-sm">Editar</button>
        <button onclick="modificarItem(${item.id})" id="guardar-${item.id}" class="btn btn-success btn-sm d-none">Guardar</button>
        <button onclick="eliminarItem(${item.id})" class="btn btn-danger btn-sm">Eliminar</button>
      </td>
    `;
    tbody.appendChild(fila);
  });
}

function editarItem(id) {
  document.getElementById(`nombre-text-${id}`).classList.add("d-none");
  document.getElementById(`categoria-text-${id}`).classList.add("d-none");
  document.getElementById(`descripcion-text-${id}`).classList.add("d-none");
  document.getElementById(`precio-text-${id}`).classList.add("d-none");

  document.getElementById(`nombre-${id}`).classList.remove("d-none");
  document.getElementById(`categoria-${id}`).classList.remove("d-none");
  document.getElementById(`descripcion-${id}`).classList.remove("d-none");
  document.getElementById(`precio-${id}`).classList.remove("d-none");
  document.getElementById(`imagen-${id}`).classList.remove("d-none");

  document.getElementById(`editar-${id}`).classList.add("d-none");
  document.getElementById(`guardar-${id}`).classList.remove("d-none");
}

function modificarItem(id) {
  const nombre = document.getElementById(`nombre-${id}`).value.trim();
  const categoria = document.getElementById(`categoria-${id}`).value.trim();
  const descripcion = document.getElementById(`descripcion-${id}`).value.trim();
  const precio = parseFloat(document.getElementById(`precio-${id}`).value);
  const archivoImagen = document.getElementById(`imagen-${id}`).files[0];

  let items = obtenerItems();
  const index = items.findIndex(item => item.id === id);

  if (index !== -1) {
    if (archivoImagen) {
      const reader = new FileReader();
      reader.onload = function (e) {
        items[index] = {
          ...items[index],
          nombre,
          categoria,
          descripcion,
          precio,
          imagen: e.target.result,
        };
        guardarItems(items);
        mostrarItems();
      };
      reader.readAsDataURL(archivoImagen);
    } else {
      items[index] = {
        ...items[index],
        nombre,
        categoria,
        descripcion,
        precio
      };
      guardarItems(items);
      mostrarItems();
    }
  }
}

function eliminarItem(id) {
  let items = obtenerItems();
  items = items.filter(item => item.id !== id);
  guardarItems(items);
  mostrarItems();
}

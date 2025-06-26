if (!sessionStorage.getItem("accessToken")) {
  window.location.href = "iniciosesion.html";
}

document.addEventListener("DOMContentLoaded", () => {
  validarSesion();

  // Inicializa los ítems predefinidos si aún no hay datos guardados
  if (!localStorage.getItem(ITEMS_KEY)) {
    guardarItems(ITEMS_PREDEFINIDOS);
  }

  mostrarItems();
});

const ITEMS_KEY = "menuItems";
const ITEMS_PREDEFINIDOS = [
  {
    id: 1,
    nombre: "Pizza Especial",
    categoria: "Pizza",
    descripcion: "Pizza con morrón, aceitunas, champiñones, carne y quesos.",
    precio: 4000,
    imagen: "imagenes/imgservicios/pizza.jpg"
  },
  {
    id: 2,
    nombre: "Picadas",
    categoria: "Entrada",
    descripcion: "Selección de fiambres y quesos con pan artesanal.",
    precio: 3000,
    imagen: "imagenes/imgservicios/picada.png"
  },
  {
    id: 3,
    nombre: "Empanadas Artesanales",
    categoria: "Empanadas",
    descripcion: "Variedad de empanadas tradicionales horneadas o fritas.",
    precio: 6000,
    imagen: "imagenes/imgservicios/empanadas.jpg"
  },
  {
    id: 4,
    nombre: "Carne Asada",
    categoria: "Parrilla",
    descripcion: "Corte vacuno con guarnición a elección.",
    precio: 8000,
    imagen: "imagenes/imgservicios/carne.jpg"
  },
  {
    id: 5,
    nombre: "Pastas Artesanales",
    categoria: "Pastas",
    descripcion: "Ravioles, ñoquis, sorrentinos con salsa a elección.",
    precio: 8000,
    imagen: "imagenes/imgservicios/PASTAS.jpg"
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

document.getElementById("formMenu").addEventListener("submit", function (e) {
  e.preventDefault();

  const nombre = document.getElementById("nombreMenu").value.trim();
  const categoria = document.getElementById("categoriaMenu").value.trim();
  const descripcion = document.getElementById("descripcionMenu").value.trim();
  const precio = parseFloat(document.getElementById("precioMenu").value);
  const archivoImagen = document.getElementById("imagenMenu").files[0];

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
    document.getElementById("formMenu").reset();
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

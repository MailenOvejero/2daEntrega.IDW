const formulario = document.getElementById('formulario');
const lista = document.getElementById('lista');

let catalogo = JSON.parse(localStorage.getItem('catalogo')) || [];

function mostrarCatalogo() {
  lista.innerHTML = '';
  catalogo.forEach((item, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <strong>${item.nombre}</strong> - ${item.descripcion} | ${item.categoria} | $${item.precio}
      <button onclick="editar(${index})">Editar</button>
      <button onclick="eliminar(${index})">Eliminar</button>
    `;
    lista.appendChild(li);
  });
}

formulario.addEventListener('submit', function(e) {
  e.preventDefault();
  const nuevoItem = {
    nombre: document.getElementById('nombre').value,
    descripcion: document.getElementById('descripcion').value,
    categoria: document.getElementById('categoria').value,
    precio: document.getElementById('precio').value
  };

  catalogo.push(nuevoItem);
  localStorage.setItem('catalogo', JSON.stringify(catalogo));
  formulario.reset();
  mostrarCatalogo();
});

function eliminar(index) {
  catalogo.splice(index, 1);
  localStorage.setItem('catalogo', JSON.stringify(catalogo));
  mostrarCatalogo();
}

function editar(index) {
  const item = catalogo[index];
  document.getElementById('nombre').value = item.nombre;
  document.getElementById('descripcion').value = item.descripcion;
  document.getElementById('categoria').value = item.categoria;
  document.getElementById('precio').value = item.precio;

  catalogo.splice(index, 1);
  mostrarCatalogo();
}

mostrarCatalogo();

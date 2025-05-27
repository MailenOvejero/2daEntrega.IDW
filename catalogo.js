const contenedor = document.getElementById('contenedor-juegos');
const catalogo = JSON.parse(localStorage.getItem('catalogo')) || [];

catalogo.forEach(item => {
  const div = document.createElement('div');
  div.classList.add('categoriaservicio');
  div.innerHTML = `
    <h3>${item.nombre}</h3>
    <p><strong>Descripción:</strong> ${item.descripcion}</p>
    <p><strong>Categoría:</strong> ${item.categoria}</p>
    <p class="precio">Desde $${item.precio}</p>
  `;
  contenedor.appendChild(div);
});

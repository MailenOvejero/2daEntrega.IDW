document.addEventListener("DOMContentLoaded", mostrarSalones);

const SALONES_KEY = "salonesEventos";

// Obtener los salones desde LocalStorage
function obtenerSalones() {
    return JSON.parse(localStorage.getItem(SALONES_KEY)) || [];
}

// Mostrar los salones en la página
function mostrarSalones() {
    const salones = obtenerSalones();
    const contenedor = document.getElementById("contenedorSalones");
    contenedor.innerHTML = "";

    salones.forEach(salon => {
        const articulo = document.createElement("article");
        articulo.classList.add("descripciondesalon");

        articulo.innerHTML = `
            <div class="contenido-salon">
                <div class="texto-salon">
                    <h2>${salon.nombre}</h2>
                    <p>Ubicado en ${salon.ubicacion}, con capacidad para ${salon.capacidad} personas.</p>
                    <p>${salon.descripcion}</p>
                    <p>Nuestros horarios disponibles</p>
                    <ul>
                        <li>11:00 am - 18:00 pm</li>
                        <li>12:00 pm - 19:00 pm</li>
                        <li>19:00 pm - 22:00 pm</li>
                        <li>22:00 pm - 01:00 am</li>
                    </ul>
                    <a href="#auraid" class="botonservicios">Solicitar presupuesto</a>
                </div>
                <div class="imagen-salon">
                    <img src="${salon.imagen}" alt="Imagen de ${salon.nombre}" style="max-width:100%; border-radius: 10px;">
                </div>
            </div>
        `;
        contenedor.appendChild(articulo);
    });
}

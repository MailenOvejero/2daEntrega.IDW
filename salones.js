document.addEventListener("DOMContentLoaded", mostrarSalones);

const SALONES_KEY = "salonesEventos";

// Lista completa de salones preestablecidos (NO dependen de LocalStorage)
const SALONES_PREDEFINIDOS = [
    { id: 1, nombre: "Caritas", capacidad: 80, ubicacion: "Belgrano", descripcion: "Megajuego, alberca de pelotas, laberinto de ligas, toboganes.", imagen: "imagenes/imgservicios/salonvertical.jpg", precio: 30000 },
    { id: 2, nombre: "Travesuras", capacidad: 90, ubicacion: "Pellegrini 865", descripcion: "Juegos para niños, plaza blanda, pantalla temática.", imagen: "imagenes/imgservicios/trave2.jpg", precio: 32000 },
    { id: 3, nombre: "Smile Eventos", capacidad: 100, ubicacion: "Avenida Belgrano 765", descripcion: "Pista de baile, videojuegos, castillo inflable, metegol.", imagen: "imagenes/imgservicios/aura1.jpg", precio: 34000 },
    { id: 4, nombre: "Sueño Eventos", capacidad: 150, ubicacion: "Bolivia 234", descripcion: "Espacio para ceremonia, salón ambientado con luces cálidas, fotocabina.", imagen: "imagenes/imgservicios/boda.png", precio: 38000 },
    { id: 5, nombre: "Amor Eterno", capacidad: 120, ubicacion: "Belgrano", descripcion: "Alberca de pelotas, laberintos, mesa de hockey, toboganes.", imagen: "imagenes/imgservicios/amoreterno.jpg", precio: 36000 },
    { id: 6, nombre: "White Eventos", capacidad: 150, ubicacion: "La Rioja 222", descripcion: "Vista imponente, ambiente sofisticado, catering gourmet, barra de tragos premium.", imagen: "imagenes/imgservicios/white3.jpg", precio: 45000 },
    { id: 7, nombre: "Next Party", capacidad: 200, ubicacion: "Matanza 567", descripcion: "Espacio moderno con pista de luces y sonido envolvente.", imagen: "imagenes/imgservicios/general.jpg", precio: 39000 },
    { id: 8, nombre: "Urban Eventos", capacidad: 180, ubicacion: "La Rioja 222", descripcion: "Diseño elegante, estilo minimalista, ideal para recepciones empresariales.", imagen: "imagenes/imgservicios/urban.jpg", precio: 41000 },
    { id: 9, nombre: "Aura", capacidad: 100, ubicacion: "San Justo 567", descripcion: "Decoración cálida, efectos de luces, ideal para eventos infantiles y baby showers.", imagen: "imagenes/imgservicios/au1.jpg", precio: 35000 }
];

// Obtener salones agregados dinámicamente desde LocalStorage
function obtenerSalones() {
    return JSON.parse(localStorage.getItem(SALONES_KEY)) || [];
}

//  Nueva función para obtener TODOS los salones (predefinidos + nuevos agregados)
function obtenerTodosLosSalones() {
    const salonesDinamicos = obtenerSalones();
    const salonesPredefinidos = SALONES_PREDEFINIDOS.map(salon => {
        let editado = JSON.parse(localStorage.getItem(`salon_editado_${salon.id}`));
        return editado ? { ...salon, ...editado } : salon;
    });

    return [...salonesPredefinidos, ...salonesDinamicos];
}

//  Mostrar todos los salones en la página
function mostrarSalones() {
    const todosLosSalones = obtenerTodosLosSalones();
    const contenedor = document.getElementById("contenedorSalones");
    contenedor.innerHTML = "";

    todosLosSalones.forEach(salon => {
        const articulo = document.createElement("article");
        articulo.classList.add("descripciondesalon");

        articulo.innerHTML = `
      <div class="contenido-salon">
        <div class="texto-salon">
          <h2>${salon.nombre}</h2>
          <p>Ubicado en ${salon.ubicacion}, con capacidad para ${salon.capacidad} personas.</p>
          <p>${salon.descripcion}</p>
          <p class="fw-bold text-success">Precio desde: $${salon.precio?.toLocaleString("es-AR") || "Consultar"}</p>
          <p>Nuestros horarios disponibles</p>
          <ul>
            <li>11:00 am - 18:00pm</li>
            <li>12:00 pm - 19:00pm</li>
            <li>19:00 pm - 22:00pm</li>
            <li>22:00 pm - 01:00am</li>
          </ul>
          <a href="presupuesto.html" class="botonservicios">Solicitar presupuesto</a>
        </div>
        <div class="imagen-salon">
          <img src="${salon.imagen}" alt="Imagen de ${salon.nombre}" style="max-width:100%; border-radius: 10px;">
        </div>
      </div>
    `;
        contenedor.appendChild(articulo);
    });
}

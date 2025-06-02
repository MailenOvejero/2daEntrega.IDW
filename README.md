# Trabajo Integrador - Introducción al Desarrollo Web

## Estructura del Proyecto

### TP1 - Primera Entrega
Carpeta principal que contiene los archivos del trabajo práctico.

- **Home**: `index.html` (Página principal)
- **Nosotros**: `nosotros.html` (Información institucional)
- **Presupuesto**: `presupuesto.html` (Sección elegida en grupo)
- **Servicios**: `servicios.html` (Sección de todos los servicios ofrecidos)
- **Imágenes**: Contiene subcarpetas para cada sección:
  - `imagenesnosotros/`
  - `imagenesservicios/` E imágenes del Home. 
- **Estilos**:
  - `style.css` (Archivo CSS principal)


  

## Segunda Entrega - Mejoras Implementadas

### Objetivos
En esta segunda entrega, se incorporaron mejoras para aplicar técnicas avanzadas de diseño y mejorar la accesibilidad del sitio:
- Uso de **elementos semánticos de HTML5** para una mejor estructura del contenido.
- Implementación de **Responsive Web Design (RWD)** para adaptar el sitio a múltiples tamaños de pantalla.
- Integración del **framework Bootstrap 5** para facilitar la maquetación y el diseño responsivo.

### Requerimientos Cumplidos
- Reemplazo de estilos propios en `style.css` por **clases de Bootstrap** (sistema de grillas, espaciados, botones, etc.).
- Exhibición de un **catálogo de salones de eventos** utilizando el sistema de grillas de Bootstrap.
- Incorporación de una **barra de navegación funcional**, coherente con la estructura del sitio y con acceso a todas las páginas.

## Tecnologías Utilizadas
- **HTML5**: Para la estructura del contenido, incluyendo etiquetas semánticas (`header`, `nav`, `main`, `section`, `article`, `footer`, etc.).
- **CSS3**: Para el diseño y presentación visual.
- **Bootstrap 5**: Para la maquetación responsiva y componentes reutilizables.

## Entrega
- Trabajo realizado en grupo, indicando los nombres de los integrantes en un archivo .txt
- Repositorio disponible en GitHub/GitLab, cargado en el Campus Virtual.
- Entrega dentro de la fecha límite establecida.




## Tercera Entrega - Aplicación Web Interactiva

### Objetivos
En esta tercera etapa se buscó transformar el sitio web en una **aplicación web interactiva**, incorporando funcionalidades dinámicas con JavaScript, gestión del DOM, uso de formularios HTML y persistencia de datos mediante LocalStorage. Se aplicaron todos los conocimientos adquiridos durante el cuatrimestre, enfocándonos en mejorar la experiencia del usuario y permitir la **administración completa de los salones de eventos**.

### Requerimientos Cumplidos
- **Gestión completa de salones de eventos**:
  - Funcionalidades de **Listar, Crear, Visualizar, Modificar y Eliminar** salones.
  - Uso de formularios HTML adaptados a cada tipo de dato.
  - Visualización de los salones en una **tabla HTML** en la vista de administración.

- **Persistencia de datos con LocalStorage**:
  - Los salones agregados o modificados se guardan permanentemente en el navegador del usuario.
  - Se definió una constante en un archivo JavaScript para inicializar el LocalStorage la primera vez que se carga el sitio.
  - El catálogo de salones se actualiza dinámicamente a partir de los datos almacenados en LocalStorage.

- **Interactividad con JavaScript**:
  - Manipulación del DOM para actualizar vistas sin recargar la página.
  - Validaciones básicas en los formularios.
  - Posibilidad de cargar imágenes y modificarlas.

### Funcionalidad Extra (Opcional)
- Aunque no se crearon secciones separadas para “Servicios” o “Imágenes” con CRUD, se implementó dentro de la vista de **salones** la posibilidad de:
  - **Modificar la imagen de cada salón**, ya sea preestablecido o cargado por el usuario.
  - **Eliminar completamente cualquier salón**, incluyendo su imagen y datos.

Esto cumple parcialmente con el requerimiento opcional, integrando la gestión de imágenes directamente en la administración de salones.

### Tecnologías Utilizadas
- **HTML5**: Estructura del contenido y formularios.
- **CSS3 + Bootstrap 5**: Estilos, maquetación responsiva y componentes reutilizables.
- **JavaScript (vanilla)**: Lógica para interactividad, manipulación del DOM y uso de LocalStorage.
- **LocalStorage API**: Almacenamiento de datos en el navegador.

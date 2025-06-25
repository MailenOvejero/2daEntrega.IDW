document.addEventListener("DOMContentLoaded", async () => {
  // Protección
  if (!sessionStorage.getItem("accessToken")) {
    window.location.href = "iniciosesion.html";
    return;
  }

  const contenedor = document.getElementById("usuarios-lista");

  try {
    const res = await fetch("https://dummyjson.com/users");
    const data = await res.json();

    data.users.forEach(usuario => {
      const div = document.createElement("div");
      div.className = "col-md-4 mb-3";
      div.innerHTML = `
        <div class="card h-100">
          <div class="card-body">
            <h5 class="card-title">${usuario.firstName} ${usuario.lastName}</h5>
            <p class="card-text">
              <strong>Usuario:</strong> ${usuario.username}<br>
              <strong>Email:</strong> ${usuario.email}<br>
              <strong>Teléfono:</strong> ${usuario.phone}<br>
              <strong>País:</strong> ${usuario.address?.city || "Sin datos"}
            </p>
          </div>
        </div>
      `;
      contenedor.appendChild(div);
    });

  } catch (error) {
    contenedor.innerHTML = `<p class="text-danger">Error al cargar los usuarios.</p>`;
  }
});

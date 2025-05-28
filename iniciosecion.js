document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.querySelector("#formLogin");

    formulario.addEventListener("submit", (event) => {
        event.preventDefault(); // Evita recargar la página
        
        let email = document.querySelector("#email").value;
        let password = document.querySelector("#password").value;

        iniciarSesion(email, password);
    });
});

const USUARIOS_KEY = "usuariosRegistrados";

function iniciarSesion(email, password) {
    let usuarios = JSON.parse(localStorage.getItem(USUARIOS_KEY)) || [];

    // Verificamos si el usuario existe en LocalStorage
    let usuarioEncontrado = usuarios.find(usuario => usuario.email === email && usuario.password === password);

    if (usuarioEncontrado) {
        // 👉 Guardamos al usuario logueado
        localStorage.setItem("usuarioLogueado", usuarioEncontrado.email);

        alert("Inicio de sesión exitoso. ¡Bienvenido!");
        window.location.href = "administrador.html"; // Redirigir al panel de administración
    } else {
        alert("Correo o contraseña incorrectos. Intente nuevamente.");
    }
}

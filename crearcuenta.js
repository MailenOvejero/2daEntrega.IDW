document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.querySelector(".sesionadmi");
    
    formulario.addEventListener("submit", (event) => {
        event.preventDefault(); // Evita recargar la página
        
        let email = document.querySelector(".datossesion[type='email']").value;
        let password = document.querySelector(".datossesion[type='password']").value;

        registrarUsuario(email, password);
    });
});
const USUARIOS_KEY = "usuariosRegistrados";

// Función para registrar el usuario
function registrarUsuario(email, password) {
    let usuarios = JSON.parse(localStorage.getItem(USUARIOS_KEY)) || [];

    // Verificamos si el usuario ya existe
    let usuarioExiste = usuarios.some(usuario => usuario.email === email);
    if (usuarioExiste) {
        alert("Este correo ya está registrado. Intente con otro.");
        return;
    }

    // Agregamos el nuevo usuario
    let nuevoUsuario = { email, password };
    usuarios.push(nuevoUsuario);
    localStorage.setItem(USUARIOS_KEY, JSON.stringify(usuarios));

    alert("Cuenta creada exitosamente.");
    window.location.href = "iniciosesion.html"; // Redirigir a inicio de sesión
}

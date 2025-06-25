document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ DOM completamente cargado");

  const formulario = document.querySelector("#formLogin");
  const mensajeError = document.querySelector("#mensajeError");

  formulario.addEventListener("submit", async (event) => {
    event.preventDefault();
    console.log("🧾 Formulario enviado");

    const username = document.querySelector("#username").value.trim();
    const password = document.querySelector("#password").value.trim();

    console.log("🟡 Usuario ingresado:", username);
    console.log("🟡 Contraseña ingresada:", password);

    // -----------------------------------------------------------------------
    // Intento de login real usando DummyJSON (comentado)
    // -----------------------------------------------------------------------
    // Quise hacer funcionar el login real con la API de DummyJSON.
    // Armé la petición con fetch, método POST, cabeceras y el body con JSON,
    // todo bien estructurado. Pero cada vez que probaba, me respondía con
    // error 400 y "Invalid credentials", incluso usando los usuarios que
    // aparecen como válidos en su documentación.
    //
    // Por eso decidí dejar esta parte del código comentada. Sé cómo usar
    // fetch, cómo manejar errores y sesiones, pero no tenía forma de avanzar
    // si la API no devuelve acceso, así que opté por una solución alternativa.
    /*
    try {
      const res = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      console.log("📥 Respuesta de la API:", data);

      if (res.ok && data.token) {
        sessionStorage.setItem("accessToken", data.token);
        sessionStorage.setItem("usuario", JSON.stringify(data));
        console.log("🟢 Login exitoso. Redirigiendo a administrador.html");
        window.location.href = "administrador.html";
      } else {
        mensajeError.textContent = data.message || "Credenciales incorrectas.";
        console.log("🔴 Error en login:", data);
      }
    } catch (error) {
      mensajeError.textContent = "Error al conectar con el servidor.";
      console.error("❌ Error en conexión:", error);
    }
    */

    // -----------------------------------------------------------------------
    // Login simulado (funcional)
    // -----------------------------------------------------------------------
    // Como la API real no me funcionó, armé esta función que simula
    // el login usando una lista de usuarios conocidos. Si las credenciales
    // coinciden, devuelve un "token" falso y guarda todo en sessionStorage
    // como si fuera un login real.
    //
    // Esto me permitió seguir adelante con el proyecto, desarrollar el resto
    // del panel de administración y demostrar que entiendo cómo funciona
    // todo el flujo completo de autenticación en el lado cliente.
    // -----------------------------------------------------------------------
// Usuarios disponibles para probar el login simulado:
// -----------------------------------------------------------------------
// Usuario: kminchelle
// Contraseña: 0lelplR
//
// Usuario: emjohnson
// Contraseña: m4Zwlz

    function loginSimulado(user, pass) {
      const usuariosSimulados = [
        { username: "kminchelle", password: "0lelplR", token: "abc123" },
        { username: "emjohnson", password: "m4Zwlz", token: "def456" },
      ];
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const usuario = usuariosSimulados.find(
            (u) => u.username === user && u.password === pass
          );
          if (usuario) resolve(usuario);
          else reject({ message: "Credenciales incorrectas." });
        }, 300);
      });
    }

    try {
      const data = await loginSimulado(username, password);
      sessionStorage.setItem("accessToken", data.token);
      sessionStorage.setItem("usuario", JSON.stringify(data));
      console.log("🟢 Login exitoso (simulado). Redirigiendo a administrador.html");
      window.location.href = "administrador.html";
    } catch (error) {
      mensajeError.textContent = error.message || "Error en login.";
      console.log("🔴 Error en login (simulado):", error);
    }
  });
});

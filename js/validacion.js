document.addEventListener("DOMContentLoaded", function(){
    function getCookie(name) {
        const cookieArray = document.cookie.split('; ');
        for (const cookie of cookieArray) {
            const [cookieName, cookieValue] = cookie.split('=');
            if (cookieName === name) {
                return decodeURIComponent(cookieValue);
            }
        }
        return null; 
    }
    
    let recuerdameValue = getCookie('recuerdame');
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    let usuarioChange = JSON.parse(localStorage.getItem("usuarioChange"));
    console.log(usuarioChange);
    
    if (usuarioChange.email !== null) {
    let cambiarUsuario = document.getElementById("cuenta");
    cambiarUsuario.innerHTML = usuarioChange.email;
    }
    
    if (!window.location.pathname.includes("login.html")) {
        if (recuerdameValue !== 'true' && !localStorage.getItem("sesionIniciada")) {
            setTimeout(function() {
                window.location.href = "login.html";
            }, 2000);
        } 
    } 

    document.getElementById("mi-carrito").addEventListener("click", function () {
        // Redirige a la página de "Mi Carrito"
        window.location.href = "ruta_a_mi_carrito.html";
      });
      
      document.getElementById("mi-perfil").addEventListener("click", function () {
        // Redirige a la página de "Mi Perfil"
        window.location.href = "ruta_a_mi_perfil.html";
      });
      
      document.getElementById("cerrar-sesion").addEventListener("click", function () {
        // Redirige a la página de inicio de sesión y elimina la sesión del usuario
        window.location.href = "ruta_a_inicio_de_sesion.html";
        // Puedes implementar aquí la lógica para cerrar la sesión del usuario
      });

});
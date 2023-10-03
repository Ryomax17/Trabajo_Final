function toggleMode() {
    const body = document.body
    body.classList.toggle('day-mode');
    body.classList.toggle('night-mode');
  }
 
  if (localStorage.getItem('claseBody')) {
    const claseGuardada = localStorage.getItem('claseBody');
    document.body.className = claseGuardada; // Establece la clase del body
  }
  
  // Escucha el evento 'beforeunload' para guardar la clase antes de recargar
  window.addEventListener('beforeunload', function() {
    const claseActual = document.body.className;
    localStorage.setItem('claseBody', claseActual); // Almacena la clase actual del body
  });


document.addEventListener("DOMContentLoaded", function () {
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
        cambiarUsuario.innerHTML = `
           <div id="dropdown"> ${usuarioChange.email} 
            <ul id="dropdown-contain">
                <li class="dropdown-item"><a href="my-profile.html">Mi perfil</a></li>
                <li class="dropdown-item"><a href="cart.html" >Carrito</a></li>
                <li class="dropdown-item" id="cerrarSesion">Cerrar sesion</li>
            </ul>
            </div>
            `
    }
    
    if (!window.location.pathname.includes("login.html")) {
        if (recuerdameValue !== 'true' && !localStorage.getItem("sesionIniciada")) {
            setTimeout(function () {
                window.location.href = "login.html";
            }, 2000);
        }
    }
    let cerrarSesion = document.getElementById("cerrarSesion");
    cerrarSesion.addEventListener("click", function (e) {
        localStorage.removeItem("usuarioChange");
        localStorage.removeItem("sesionIniciada");
        console.log(usuarioChange);    
        e.stopPropagation()
         
 
    });

})
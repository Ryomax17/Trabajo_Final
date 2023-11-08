function toggleMode() {
    const body = document.body
    body.classList.toggle('day-mode');
    body.classList.toggle('night-mode');
  }
 
  if (localStorage.getItem('claseBody')) {
    const claseGuardada = localStorage.getItem('claseBody');
    document.body.className = claseGuardada;
  }
  
  window.addEventListener('beforeunload', function() {
    const claseActual = document.body.className;
    localStorage.setItem('claseBody', claseActual);
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
    
    let rememberMeValue = getCookie('rememberMe');
    let loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
    console.log(loggedUser);
    
    if (loggedUser.email !== null) {
        let account = document.getElementById("cuenta");
        account.removeAttribute("href");
        account.innerHTML = `
           <div id="dropdown"> ${loggedUser.email} 
            <ul id="dropdown-contain">
                <li class="dropdown-item"><a href="my-profile.html">Mi perfil</a></li>
                <li class="dropdown-item"><a href="cart.html" >Carrito</a></li>
                <li class="dropdown-item" id="cerrarSesion">Cerrar sesion</li>
            </ul>
            </div>
            `;
    }
    
    if (!window.location.pathname.includes("login.html")) {
        if (rememberMeValue !== 'true' && !localStorage.getItem("loggedIn")) {
            setTimeout(function () {
                window.location.href = "login.html";
            }, 2000);
        }
    }
    let logOut = document.getElementById("cerrarSesion");
    logOut.addEventListener("click", function (e) {
        localStorage.removeItem("loggedUser");
        localStorage.removeItem("loggedIn");
        console.log(loggedUser);    
        e.stopPropagation()
         
 
    });

})
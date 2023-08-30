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
    let usuarioChange = localStorage.getItem("usuarioChange");
    
    if (!window.location.pathname.includes("login.html")) {
        if (recuerdameValue !== 'true' && !localStorage.getItem("sesionIniciada")) {
            setTimeout(function() {
                window.location.href = "login.html";
            }, 2000);
        } else { let cambiarUsuario = document.getElementById("cuenta");
        cambiarUsuario.innerHTML = usuarioChange;
    }
    } 
    
    console.log(usuarioChange);
    console.log(usuarios);
});
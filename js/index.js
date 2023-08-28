document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
    
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
        } let cambiarUsuario = document.getElementById("cuenta");
        cambiarUsuario.innerHTML = usuarioChange;
        
    } 
    
    console.log(usuarioChange);
    console.log(usuarios);
});
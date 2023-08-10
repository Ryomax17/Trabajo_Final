document.addEventListener("DOMContentLoaded", function() {
    if (localStorage.getItem("sesionIniciada") !== "true") {
        setTimeout(function() {
            window.location.href = "login.html";
        }, 2000);
    }

    let regBtn = document.getElementById("regBtn");
    
    regBtn.addEventListener("click", function() {
        if (localStorage.getItem("sesionIniciada") === "true") {
            window.location.href = "index.html";
        }
    });
});
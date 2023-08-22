document.addEventListener("DOMContentLoaded", function() {
 
    let regBtn = document.getElementById("regBtn");
    console.log(regBtn);
    regBtn.addEventListener("click", function() {
        let email = document.getElementById("email1").value;
        let password = document.getElementById("password1").value;

        let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

        let usuarioEncontrado = usuarios.find(user => user.email === email && user.password === password);

        if (!usuarioEncontrado) {
            showAlertError();
            return;
        }

        showAlertSuccess();
    });

    let expirationDate = new Date();

    function showAlertSuccess() {
        document.getElementById("alert-success").classList.add("show");
        localStorage.setItem("sesionIniciada", "true");
        let recuerdameCheckbox = document.getElementById("recuerdame");
        if (recuerdameCheckbox.checked) {
            expirationDate.setDate(expirationDate.getDate() + 7);
            const cookieValue = "recuerdame=true; expires=" + expirationDate.toUTCString() + "; path=/";
            document.cookie = cookieValue;
        } else {
            document.cookie = "recuerdame=true; path=/";
        }
        setTimeout(function() {
            window.location.href = "index.html";
        }, 500);
    }

    function showAlertError() {
        document.getElementById("alert-danger").classList.add("show");
    }
});
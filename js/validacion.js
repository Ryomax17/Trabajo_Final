function showAlertSuccess() {
    document.getElementById("alert-success").classList.add("show");
    setTimeout(function() {
        window.location.href = "index.html";
    }, 500);
    localStorage.setItem("sesionIniciada", "true");
}

function showAlertError() {
    document.getElementById("alert-danger").classList.add("show");
}


document.addEventListener("DOMContentLoaded", function() {
    let regBtn = document.getElementById("regBtn");
    
    regBtn.addEventListener("click", function() {
        let nombre = document.getElementById("nombre").value;
        let password1 = document.getElementById("password1").value;

        if (nombre.trim() === "") {
            showAlertError();
            return;
        }

        if (password1.length < 6) {
            showAlertError();
            return;
        }

        let terminosCheckbox = document.getElementById("terminos");
        if (!terminosCheckbox.checked) {
            showAlertError();
            return;
        }
        showAlertSuccess();
    });
});
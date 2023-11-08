function showAlertSuccess() {
    document.getElementById("alert-success").classList.add("show");

    let user = {
        name: document.getElementById("nombre").value,
        lastname: document.getElementById("apellido").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password1").value
    };

    let usersArray = JSON.parse(localStorage.getItem("usersArray")) || [];

    usersArray.push(user);
    localStorage.setItem("usersArray", JSON.stringify(usersArray));
    
    setTimeout(function() {
        window.location.href = "login.html";
    }, 1500);
}
function showAlertError() {
    document.getElementById("alert-danger").classList.add("show");
}

document.addEventListener("DOMContentLoaded", function() {
    let regBtn = document.getElementById("regBtn");
    
    regBtn.addEventListener("click", function() {
        let name = document.getElementById("nombre").value;
        let lastname = document.getElementById("apellido").value;
        let email = document.getElementById("email").value;
        let password1 = document.getElementById("password1").value;
        let password2 = document.getElementById("password2").value;

        if (name.trim() === "" || lastname.trim() === "") {
            showAlertError();
            return;
        }

        if (email.trim() === "") {
            showAlertError();
            return;
        }

        if (password1.length < 6) {
            showAlertError();
            return;
        }

        if (password1 !== password2) {
            showAlertError();
            return;
        }

        let termsCheckBox = document.getElementById("terminos");
        if (!termsCheckBox.checked) {
            showAlertError();
            return;
        }
        showAlertSuccess();
    });
});
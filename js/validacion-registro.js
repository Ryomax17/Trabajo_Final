function showAlertSuccess() {
    document.getElementById("alert-success").classList.add("show");

    let usersArray = JSON.parse(localStorage.getItem("usersArray")) || [];
    
    let lastUserId = localStorage.getItem("lastUserId");
    lastUserId = lastUserId ? parseInt(lastUserId, 10) : 0;
    const newUserId = lastUserId + 1;


    let user = {
        id: newUserId,
        email: document.getElementById("email").value,
        password: document.getElementById("password1").value
    };

    localStorage.setItem("lastUserId", newUserId.toString());

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
        let email = document.getElementById("email").value;
        let password1 = document.getElementById("password1").value;
        let password2 = document.getElementById("password2").value;

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
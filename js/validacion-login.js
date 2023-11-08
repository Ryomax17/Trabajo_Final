document.addEventListener("DOMContentLoaded", function() {
 
    let regBtn = document.getElementById("regBtn");
    regBtn.addEventListener("click", function() {
        let email = document.getElementById("email1").value;
        let password = document.getElementById("password1").value;

        let usersArray = JSON.parse(localStorage.getItem("usersArray")) || [];

        let userFound = usersArray.find(user => user.email === email && user.password === password);

        if (!userFound) {
            showAlertError();
            return;
        }
        userString = JSON.stringify(userFound);
        localStorage.setItem("loggedUser", userString);
        showAlertSuccess();
    });

    let expirationDate = new Date();

    function showAlertSuccess() {
        document.getElementById("alert-success").classList.add("show");
        localStorage.setItem("loggedIn", "true");
        let rememberMeCheckbox = document.getElementById("recuerdame");
        if (rememberMeCheckbox.checked) {
            expirationDate.setDate(expirationDate.getDate() + 7);
            const cookieValue = "rememberMe=true; expires=" + expirationDate.toUTCString() + "; path=/";
            document.cookie = cookieValue;
        } else {
            document.cookie = "rememberMe=true; path=/";
        }
        setTimeout(function() {
            window.location.href = "index.html";
        }, 500);
    }

    function showAlertError() {
        document.getElementById("alert-danger").classList.add("show");
    }
});
function toggleMode() {
  const body = document.body;
  body.classList.toggle("day-mode");
  body.classList.toggle("night-mode");
}

if (localStorage.getItem("claseBody")) {
  const claseGuardada = localStorage.getItem("claseBody");
  document.body.className = claseGuardada;
}

window.addEventListener("beforeunload", function () {
  const claseActual = document.body.className;
  localStorage.setItem("claseBody", claseActual);
});

function getCookie(name) {
  const cookieArray = document.cookie.split("; ");
  for (const cookie of cookieArray) {
    const [cookieName, cookieValue] = cookie.split("=");
    if (cookieName === name) {
      return decodeURIComponent(cookieValue);
    }
  }
  return null;
}

function deleteCookie(name) {
  document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

document.addEventListener("DOMContentLoaded", function () {
  let rememberMeCookie = getCookie("rememberMe");
  console.log(rememberMeCookie);
  let loggedUser = JSON.parse(localStorage.getItem("loggedUser"));

  if (
    !localStorage.getItem("loggedIn") ||
    localStorage.getItem("loggedIn") !== "true"
  ) {
    if (rememberMeCookie) {
      let userId = parseInt(rememberMeCookie, 10);
      console.log(userId);
      let usersArray = JSON.parse(localStorage.getItem("usersArray")) || [];

      let lastLoggedInUser = usersArray.find((user) => user.id === userId);
      console.log(lastLoggedInUser);
      if (lastLoggedInUser) {
        localStorage.setItem("loggedIn", "true");
        userString = JSON.stringify(lastLoggedInUser);
        localStorage.setItem("loggedUser", userString);
        window.location.reload();
      } else {
        localStorage.setItem("loggedIn", "false");
        localStorage.removeItem("loggedUser");
        window.location.reload();
      }
    }
  }

  if (loggedUser && loggedUser.email !== null) {
    let account = document.getElementById("cuenta");
    account.removeAttribute("href");
    account.innerHTML = `
        <button id="dropdown" class="dropdown btn-dark">
            ${loggedUser.email} 
    <ul id="dropdown-contain" class="text-start btn">
        <li class="dropdown-item"><a href="my-profile.html">Mi perfil</a></li>
        <li class="dropdown-item"><a href="cart.html">Carrito</a></li>
        <li class="dropdown-item" id="cerrarSesion">Cerrar sesión</li>
    </ul>

        </button>
        `;
  }

  if (window.location.pathname.includes("login.html")) {
  } else if (!rememberMeCookie || localStorage.getItem("loggedIn") !== "true") {
    setTimeout(function () {
      window.location.href = "login.html";
    }, 2000);
  }

  let logOut = document.getElementById("cerrarSesion");

  if (logOut) {
    logOut.addEventListener("click", function (e) {
      localStorage.removeItem("loggedUser");
      localStorage.removeItem("loggedIn");
      console.log(loggedUser);
      e.stopPropagation();
      deleteCookie("rememberMe");
      window.location.reload();
    });
  }
});

cartArray = [];
let subtotal = 0;
let costoEnvio = 0;
let precioFinal = 0;

async function getPrechargedProduct() {
  const respuesta = await fetch(
    `https://japceibal.github.io/emercado-api/user_cart/${25801}.json`
  );
  response = await respuesta.json();
  userCart = response.articles[0];
  userCart.quantity = userCart.count;
  return userCart;
}

function prechargedProduct(products) {
  let htmlContentToAppend = "";
  htmlContentToAppend = `
      <td class= "h-25" style="width: 100px"> <img src="${
        products.image
      }" alt="${products.name}" class="img-thumbnail"> </td>
      <td>${products.name}</td>
      <td>${products.currency} ${products.unitCost}</td>
      <td>
      <button class="btn btn-sm btn-primary" onclick="reducirCantidadPrecharged('${
        products.id
      }')">-</button>
      <span class="mx-2">${products.quantity}</span>
      <button class="btn btn-sm btn-primary" onclick="aumentarCantidadPrecharged('${
        products.id
      }')">+</button>
      </td>
      <td id="total_${products.id}"><b>${products.currency} ${
    products.unitCost * products.quantity
  }</b></td>
      <td><input id="id${
        products.id
      }" class="cartbttn" type="button" value="Sacar del carrito""></td>
      `;

  document.getElementById("cart-container").innerHTML += htmlContentToAppend;
}

function aumentarCantidadPrecharged() {
  if (userCart.quantity) {
    userCart.quantity += 1;
    vaciarCarrito();
    prechargedProduct(userCart);
    getUserCart();
  }
}

function reducirCantidadPrecharged() {
  if (userCart.quantity && userCart.quantity > 1) {
    userCart.quantity -= 1;
    vaciarCarrito();
    prechargedProduct(userCart);
    getUserCart();
  }
}

function getUserCart() {
  cartArray = JSON.parse(localStorage.getItem("cart")) || [];
  let htmlContentToAppend = "";
  subtotal = 0;
  for (let i = 0; i < cartArray.length; i++) {
    let cart = cartArray[i];
    let costoTotal;

    if (cart.currency === "UYU") {
      costoTotal = (cart.cost / 39) * cart.quantity;
    } else {
      costoTotal = cart.cost * cart.quantity;
    }

    subtotal += costoTotal;
    htmlContentToAppend += `<tr>
        <td class= "h-25" style="width: 100px">
        <img src="${cart.image}" alt="${cart.name}" class="img-thumbnail"></td>
        <td>${cart.name}</td>
        <td>${cart.currency} ${cart.cost}</td>
        <td>
        <button class="btn btn-sm btn-primary" onclick="reducirCantidad('${
          cart.id
        }')">-</button>
        <span class="mx-2">${cart.quantity}</span>
        <button class="btn btn-sm btn-primary" onclick="aumentarCantidad('${
          cart.id
        }')">+</button>
        </td>
        <td id="total_${cart.id}"><b>${cart.currency} ${
      cart.cost * cart.quantity
    }</b></td>
        <td><input id="id${
          cart.id
        }" class="cartbttn" type="button" value="Sacar del carrito" onclick="eliminarDelCarrito(${
      cart.id
    })"></td>
        </tr>`;
  }

  document.getElementById("subtotal-final").textContent = `USD ${subtotal.toFixed(2)}`;
  document.getElementById("cart-container").innerHTML = htmlContentToAppend;
  calcularEnvio();
}

function aumentarCantidad(productoId) {
  var product = cartArray.find((p) => p.id == productoId);
  if (product) {
    product.quantity += 1;
    actualizarCarritoEnLocalStorage();
    vaciarCarrito();
    prechargedProduct(userCart);
    getUserCart();
  }
}

function reducirCantidad(productoId) {
  var product = cartArray.find((p) => p.id == productoId);
  if (product) {
    if (product.quantity > 1) {
      product.quantity -= 1;
      actualizarCarritoEnLocalStorage();
      vaciarCarrito();
      prechargedProduct(userCart);
      getUserCart();
    }
  }
}

function vaciarCarrito() {
  var cartContainer = document.getElementById("cart-container");
  if (cartContainer) {
    cartContainer.innerHTML = "";
  }
}

function actualizarCarritoEnLocalStorage() {
  var cartString = JSON.stringify(cartArray);
  localStorage.setItem("cart", cartString);
}
function eliminarDelCarrito(productoId) {
  const index = cartArray.findIndex((p) => p.id === productoId);
  if (index !== -1) {
    cartArray.splice(index, 1);
    const productoCarrito = document.getElementById(productoId);
    if (productoCarrito) {
      productoCarrito.remove();
    }

    const precioTotalElement = document.getElementById("precioTotalElement");
    if (precioTotalElement) {
      precioTotal = cartArray.reduce((total, p) => total + p.cost, 0);
      precioTotalElement.textContent = `Precio Total: $${precioTotal}`;
    }
    localStorage.setItem("cart", JSON.stringify(cartArray));
    actualizarCarritoEnLocalStorage();
    vaciarCarrito();
    prechargedProduct(userCart);
    getUserCart();
  }
}

async function main() {
  try {
    const userCart = await getPrechargedProduct();
    prechargedProduct(userCart);
    getUserCart();
  } catch (error) {
    console.error("Error al obtener el carrito:", error);
  }
}

main();

let calle = document.getElementById("calle");
let esquina = document.getElementById("esquina");
let numero = document.getElementById("numero");
let form = document.getElementById("form");
let checked1 = document.getElementById("inlineRadio1");
let checked2 = document.getElementById("inlineRadio2");
let checked3 = document.getElementById("inlineRadio3");
let containalert = document.getElementById("containAlert");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  validateInputs();
});

function validateInputs() {
  let calleIsValidated = false;
  let esquinaIsValidated = false;
  let numeroIsValidated = false;
  let checkedIsValidated = false;

  let calleval = calle.value.trim();
  let esquinaval = esquina.value.trim();
  let numeroval = numero.value.trim();

  if (calleval === "") {
    calle.classList.add("is-invalid");
  } else {
    calle.classList.remove("is-invalid");
    calleIsValidated = true;
  }
  if (esquinaval === "") {
    esquina.classList.add("is-invalid");
  } else {
    esquina.classList.remove("is-invalid");
    esquinaIsValidated = true;
  }
  if (numeroval === "") {
    numero.classList.add("is-invalid");
  } else {
    numero.classList.remove("is-invalid");
    numeroIsValidated = true;
  }
  if (checked1.checked || checked2.checked || checked3.checked) {
    checkedIsValidated = true;
  }
  form.classList.add("was-validated");
  if (
    calleIsValidated === true &&
    esquinaIsValidated === true &&
    numeroIsValidated === true &&
    checkedIsValidated === true
  ) {
    //aca va la alerta
  }
}

//Porcentajes de envio
function calcularEnvio() {
  const radioButtons = document.getElementsByName("inlineRadioOptions");
  radioButtons.forEach(function (radio) {
    radio.addEventListener("change", function () {
      calcularEnvio();
      const selectedValue = this.value.toLowerCase();

      let porcentajeEnvio = 0.0;
      if (selectedValue === "premium") {
        porcentajeEnvio = 0.15;
      } else if (selectedValue === "express") {
        porcentajeEnvio = 0.07;
      } else if (selectedValue === "estandar") {
        porcentajeEnvio = 0.05;
      }
            //Tipo de cambio = 39UYU
      costoEnvio = (subtotal * porcentajeEnvio);
      precioFinal = subtotal + costoEnvio;
console.log(subtotal)
      document.getElementById("costo-envio").textContent = `USD ${costoEnvio.toFixed(2)}`;
      document.getElementById("subtotal-final").textContent = `USD ${subtotal.toFixed(2)}`;
      document.getElementById("precio-final").textContent = `Total a pagar: USD ${precioFinal.toFixed(2)}`;
    });
  });
}

const metodoCredito = document.getElementById("credito");
const metodoTransferencia = document.getElementById("transferencia");
const formularioCredito = document.getElementById("formularioCredito");
const formularioTransferencia = document.getElementById(
  "formularioTransferencia"
);
const mpseleccionado = document.getElementById("mpseleccionado");

metodoCredito.addEventListener("change", function () {
  if (metodoCredito.checked) {
    formularioCredito.style.display = "block";
    formularioTransferencia.style.display = "none";
    mpseleccionado.textContent = "Tarjeta de crédito";
  }
});

metodoTransferencia.addEventListener("change", function () {
  if (metodoTransferencia.checked) {
    formularioTransferencia.style.display = "block";
    formularioCredito.style.display = "none";
    mpseleccionado.textContent = "Transferencia";
  }
});

const guardarmp = document.getElementById("guardarmp");
guardarmp.addEventListener("click", function () {
  if (metodoCredito.checked) {
    mpseleccionado.textContent = "Tarjeta de crédito";
  }

  if (metodoTransferencia.checked) {
    mpseleccionado.textContent = "Transferencia";
  }
});

cartArray = [];
let subtotal = 0;
let shippingCost = 0;
let finalPrice = 0;

async function getPrechargedProduct() {
  const respone = await fetch(
    `https://japceibal.github.io/emercado-api/user_cart/${25801}.json`
  );
  data = await respone.json();
  userCart = data.articles[0];
  userCart.quantity = userCart.count;
  return userCart;
}

function prechargedProduct(products) {
  let htmlContentToAppend = "";
  subtotal = 0;
  subtotal += userCart.unitCost * userCart.quantity;
  htmlContentToAppend = `
      <td class= "h-25" style="width: 100px"> <img src="${
        products.image
      }" alt="${products.name}" class="img-thumbnail"> </td>
      <td>${products.name}</td>
      <td>${products.currency} ${products.unitCost}</td>
      <td>
      <button class="btn btn-sm btn-primary" onclick="qntyDownPrecharged('${
        products.id
      }')">-</button>
      <span class="mx-2">${products.quantity}</span>
      <button class="btn btn-sm btn-primary" onclick="qntyUpPrecharged('${
        products.id
      }')">+</button>
      </td>
      <td id="total_${products.id}"><b>${products.currency} ${
    products.unitCost * products.quantity
  }</b></td>
  <td>
  <button id="id${products.id}" class="btn btn-delete" type="button" style="border: 1px solid red; onclick="removeFromCart(${products.id})">
    <i class="fas fa-trash" style="color: red;"></i>
  </button>
</td>
      `;
  document.getElementById("precio-final").textContent = `Total a pagar: ${products.currency} ${subtotal.toFixed(2)}`;
  calcularEnvio();
  document.getElementById("cart-container").innerHTML += htmlContentToAppend;
}

function qntyUpPrecharged() {
  if (userCart.quantity) {
    userCart.quantity += 1;
    clearCart();
    prechargedProduct(userCart);
    getUserCart();
  }
}

function qntyDownPrecharged() {
  if (userCart.quantity && userCart.quantity > 1) {
    userCart.quantity -= 1;
    clearCart();
    prechargedProduct(userCart);
    getUserCart();
  }
}

function getUserCart() {
  cartArray = JSON.parse(localStorage.getItem("cart")) || [];
  let htmlContentToAppend = "";
  subtotal = 0;
  subtotal += userCart.unitCost * userCart.quantity;
  for (let i = 0; i < cartArray.length; i++) {
    let cart = cartArray[i];
    let costoTotal = cart.cost * cart.quantity;
    if (cart.currency === "UYU") {
      costoTotal = (cart.cost / 40) * cart.quantity;
      cart.currency = "USD"
      cart.cost = cart.cost / 40;
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
        <button class="btn btn-sm btn-primary" onclick="qntyDown('${cart.id}')">-</button>
        <span class="mx-2">${cart.quantity}</span>
        <button class="btn btn-sm btn-primary" onclick="qntyUp('${cart.id}')">+</button>
        </td>
        <td id="total_${cart.id}"><b>${cart.currency} ${cart.cost * cart.quantity}</b></td>
        <td>
        <button id="id${cart.id}" style="border: 1px solid red;" class="btn btn-delete" type="button" onclick="removeFromCart(${cart.id})">
          <i class="fas fa-trash" style="color: red;"></i>
        </button>
      </td>        </tr>`;
  }
  if (cartArray && cartArray.length > 0) {
    document.getElementById("precio-final").textContent = `Total a pagar: ${userCart.currency} ${subtotal.toFixed(2)}`;
    calcularEnvio();
  }
  document.getElementById("cart-container").innerHTML += htmlContentToAppend;
  return subtotal;
}

function qntyUp(productoId) {
  var product = cartArray.find((p) => p.id == productoId);
  if (product) {
    product.quantity += 1;
    uptadeCartOnLocalStorage();
    clearCart();
    prechargedProduct(userCart);
    getUserCart();
  }
}

function qntyDown(productoId) {
  var product = cartArray.find((p) => p.id == productoId);
  if (product) {
    if (product.quantity > 1) {
      product.quantity -= 1;
      uptadeCartOnLocalStorage();
      clearCart();
      prechargedProduct(userCart);
      getUserCart();
    }
  }
}

function clearCart() {
  var cartContainer = document.getElementById("cart-container");
  if (cartContainer) {
    cartContainer.innerHTML = "";
  }
}

function uptadeCartOnLocalStorage() {
  var cartString = JSON.stringify(cartArray);
  localStorage.setItem("cart", cartString);
}
function removeFromCart(productoId) {
  const index = cartArray.findIndex((p) => p.id === productoId);
  if (index !== -1) {
    cartArray.splice(index, 1);
    const cartProduct = document.getElementById(productoId);
    if (cartProduct) {
      cartProduct.remove();
    }

    const precioTotalElement = document.getElementById("precioTotalElement");
    if (precioTotalElement) {
      precioTotal = cartArray.reduce((total, p) => total + p.cost, 0);
      precioTotalElement.textContent = `Precio Total: $${precioTotal}`;
    }
    localStorage.setItem("cart", JSON.stringify(cartArray));
    uptadeCartOnLocalStorage();
    clearCart();
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
let mpseleccionadoError = document.getElementById("mpseleccionadoError");
let mpseleccionadoincompleto = document.getElementById("mpseleccionadoincompleto");

let formname =document.getElementById("ccname");
let formnumber=document.getElementById("ccnumber");
let formexpiration=document.getElementById("ccexpiration");
let formcvv=document.getElementById("cccvv");
let formtransf=document.getElementById("cctransf");



document.addEventListener("DOMContentLoaded", function () {
  var form = document.getElementById("form");
  var cartelCompra = document.getElementById("cartelCompra");

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

    let forname =formname.value.trim();
    let fornumber=formnumber.value.trim();
    let forexpiration=formexpiration.value.trim();
    let forcvv=formcvv.value.trim();
    let fortransf=formtransf.value.trim();
    
    let fnamess = false;
    let fnumber= false;
    let fexpiration = false;
    let fcvv = false;
    let ftransf = false;

    if (forname !== "") {
      fnamess = true;
    }
    if (fornumber !== "") {
      fnumber = true;
    }
    if (forexpiration !== "") {
      fexpiration = true;
    }
    if (forcvv !== "") {
      fcvv = true;
    }
    if (fortransf !== "") {
      ftransf = true;
    }

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

    if (!metodoCredito.checked && !metodoTransferencia.checked) {
      mpseleccionadoError.classList.add("text-danger");
      mpseleccionadoError.classList.remove("invalid-feedback");

      mpseleccionado.classList.add("d-none");
    }
    if (metodoCredito.checked || metodoTransferencia.checked) {
      mpseleccionadoError.classList.add("invalid-feedback");
      mpseleccionado.classList.remove("d-none");
    }

    if (metodoCredito.checked || metodoTransferencia.checked) {
    if (fortransf == "" || forcvv == "" || forexpiration == "" || fornumber== "" || forname == "" ) {
      mpseleccionadoincompleto.classList.add("text-danger");
      mpseleccionadoincompleto.classList.remove("invalid-feedback");
    }
  }

    if (
      calleIsValidated === true &&
      esquinaIsValidated === true &&
      numeroIsValidated === true &&
      checkedIsValidated === true &&
      ftransf === true

    ) {
      cartelCompra.style.display = "block";
      mpseleccionadoincompleto.classList.add("invalid-feedback");

    }

    if (
      calleIsValidated === true &&
      esquinaIsValidated === true &&
      numeroIsValidated === true &&
      fnamess === true &&
      fnumber === true &&
      fexpiration === true &&
      fcvv === true &&
      checkedIsValidated ===  true
    ) {
      cartelCompra.style.display = "block";
      mpseleccionadoincompleto.classList.add("invalid-feedback");

    }

    form.classList.add("was-validated");
  }
});

function calcularEnvio() {
  const radioButtons = document.getElementsByName("inlineRadioOptions");
  radioButtons.forEach(function (radio) {
    radio.addEventListener("change", function () {
      const selectedValue = this.value.toLowerCase();

      let porcentajeEnvio = 0.0;
      if (selectedValue === "premium") {
        porcentajeEnvio = 0.15;
      } else if (selectedValue === "express") {
        porcentajeEnvio = 0.07;
      } else if (selectedValue === "estandar") {
        porcentajeEnvio = 0.05;
      }

      shippingCost = subtotal * porcentajeEnvio;
      finalPrice = subtotal + shippingCost;
      console.log(subtotal);
      document.getElementById("costo-envio").textContent = `${userCart.currency} ${shippingCost.toFixed(2)}`;
      document.getElementById("subtotal-final").textContent = `${userCart.currency} ${subtotal.toFixed(2)}`;
      document.getElementById("precio-final").textContent = `Total a pagar: ${userCart.currency} ${finalPrice.toFixed(2)}`;

    });
  });
}

const metodoCredito = document.getElementById("credito");
const metodoTransferencia = document.getElementById("transferencia");
const formularioCredito = document.getElementById("formularioCredito");
const formularioTransferencia = document.getElementById("formularioTransferencia");
const mpseleccionado = document.getElementById("mpseleccionado");

document.getElementById("guardarmp").addEventListener("click", function () {
  if (metodoCredito.checked) {
    mpseleccionado.textContent = "Tarjeta de crédito";
  } else if (metodoTransferencia.checked) {
    mpseleccionado.textContent = "Transferencia";
  }
});

document.getElementById("credito").addEventListener("click", function () {
  formularioCredito.style.display = "block";
  formularioTransferencia.style.display = "none";
});

document.getElementById("transferencia").addEventListener("click", function () {
  formularioTransferencia.style.display = "block";
  formularioCredito.style.display = "none";
});

cartArray = []

async function getPrechargedProduct() {
    const respuesta = await fetch(`https://japceibal.github.io/emercado-api/user_cart/${25801}.json`);
    response = await respuesta.json();
    userCart = response.articles[0];
    userCart.quantity = userCart.count;
    return userCart;
  }

  
function prechargedProduct(products) {
    let htmlContentToAppend = "";
    htmlContentToAppend = `
      <td class= "h-25" style="width: 100px">
      <img src="${products.image}" alt="${products.name}" class="img-thumbnail"></td>
      <td>${products.name}</td>
      <td>${products.currency} ${products.unitCost}</td>
      <td>
      <button class="btn btn-sm btn-primary" onclick="reducirCantidadPrecharged('${products.id}')">-</button>
      <span class="mx-2">${products.quantity}</span>
      <button class="btn btn-sm btn-primary" onclick="aumentarCantidadPrecharged('${products.id}')">+</button>
      </td>
      <td id="total_${products.id}"><b>${products.currency} ${products.unitCost*products.quantity}</b></td>
      <td><input id="id${products.id}" class="cartbttn" type="button" value="Sacar del carrito""></td>
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
    for (let i = 0; i < cartArray.length; i++) {
      let cart = cartArray[i];
      htmlContentToAppend += `<tr>
      <td class= "h-25" style="width: 100px">
      <img src="${cart.image}" alt="${cart.name}" class="img-thumbnail"></td>
      <td>${cart.name}</td>
      <td>${cart.currency} ${cart.cost}</td>
      <td>
      <button class="btn btn-sm btn-primary" onclick="reducirCantidad('${cart.id}')">-</button>
      <span class="mx-2">${cart.quantity}</span>
      <button class="btn btn-sm btn-primary" onclick="aumentarCantidad('${cart.id}')">+</button>
      </td>
      <td id="total_${cart.id}"><b>${cart.currency} ${cart.cost*cart.quantity}</b></td>
      <td><input id="id${cart.id}" class="cartbttn" type="button" value="Sacar del carrito" onclick="eliminarDelCarrito(${cart.id})"></td>
      </tr>
      
      `; 
    }
    document.getElementById("cart-container").innerHTML += htmlContentToAppend;
  }
 

  function aumentarCantidad(productoId) {
    var product = cartArray.find(p => p.id == productoId);
    if (product) {
      product.quantity += 1;
      actualizarCarritoEnLocalStorage();
      vaciarCarrito();
      prechargedProduct(userCart);
      getUserCart();
    }
  }
  
  function reducirCantidad(productoId) {
    var product = cartArray.find(p => p.id == productoId);
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
  localStorage.setItem('cart', cartString);
}
  function eliminarDelCarrito(productoId) {
    const index = cartArray.findIndex((p) => p.id === productoId);
    if (index !== -1) {
      cartArray.splice(index, 1);
      const productoCarrito = document.getElementById(productoId);
      if (productoCarrito) {
        productoCarrito.remove();
      }
  
      const precioTotalElement = document.getElementById('precioTotalElement');
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

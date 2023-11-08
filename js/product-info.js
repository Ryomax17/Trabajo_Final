const selectedProductJSON = localStorage.getItem('selectedProduct');
const selectedProduct = JSON.parse(selectedProductJSON);
const user = JSON.parse(localStorage.getItem("loggedUser"));
let productData = {};
let commentsData = [];
let rate = 0;

async function getData(select) {
  const respuesta = await fetch(`https://japceibal.github.io/emercado-api/products/${select}.json`);
  productData = await respuesta.json();
  return productData;
}

function addStars(starsQty) {
  if (starsQty < 1 || starsQty > 5) {
    return '';
  }

  let starsHTML = '';

  for (let i = 0; i < starsQty; i++) {
    starsHTML += '<span class="fa fa-star checked stari"></span>';
  }

  for (let i = starsQty; i < 5; i++) {
    starsHTML += '<span class="fa fa-star stari"></span>';
  }

  return starsHTML;
}

function getRate(rate) {
  let buttons = document.querySelectorAll('.fa.fa-star.checked-btn');

  buttons.forEach(button => {
    button.classList = 'fa fa-star checked-btn';
  });

  let selectedButton = buttons[rate - 1];
  selectedButton.classList.add('-active');
}

function getDate() {
  const actualTime = new Date();
  const year = actualTime.getFullYear();
  const month = String(actualTime.getMonth() + 1).padStart(2, '0');
  const day = String(actualTime.getDate()).padStart(2, '0');
  const hours = String(actualTime.getHours()).padStart(2, '0');
  const minutes = String(actualTime.getMinutes()).padStart(2, '0');
  const seconds = String(actualTime.getSeconds()).padStart(2, '0');

  const formatedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  return formatedDate;
}

function addComments() {
  let newComment = document.getElementById("add-comments-box");
  let commentsSection = "";
  let actualTime = getDate();
  if (rate > 0 && rate < 6) {
    commentsSection += `
        <div class="comment">
          <span style="font-weight: bold">${user.name}_${user.lastname}</span>
          <span> - ${actualTime} - </span>
          ${addStars(rate)}
          <p>${newComment.value}</p>
        </div>
      `;
    document.getElementById("comments-box").innerHTML += commentsSection;
  } else {
    alert("Selecciona una puntuación");
  }
}

function createCommentsList(array) {
  for (let i = 0; i < array.length; i++) {
    let comments = array[i];
    let commentsSection = "";
    commentsSection += `
        <div class="comment">
          <span style="font-weight: bold">${comments.user}</span>
          <span> - ${comments.dateTime} - </span>
          ${addStars(comments.score)}
          <p>${comments.description}</p>
        </div>`;
    document.getElementById("comments-box").innerHTML += commentsSection;
  }
}

function clearComments() {
  const commentsContainer = document.getElementById("comments-box");
  commentsContainer.innerHTML = "";
}

function getCommentsList(productId) {
  fetch(`https://japceibal.github.io/emercado-api/products_comments/${productId}.json`)
    .then(response => response.json())
    .then(data => {
      commentsData = data;
      console.log(commentsData);
      createCommentsList(commentsData);
      return selectedProduct;
    });

}

function addImages(imagesQty, objImages) {
  let imagesHTML = '';
  
  imagesHTML +=
    `<div class="carousel-item active">
        <img src="${objImages[0]}" class="d-block w-100 max-img img-thumbnail" alt="...">
      </div>`;

  for (let i = 1; i < imagesQty; i++) {
    imagesHTML +=
      `<div class="carousel-item ">
        <img src="${objImages[i]}" class="d-block w-100 max-img img-thumbnail" alt="...">
      </div>`;
  }
  return imagesHTML;
}

function addToCart(productsId) {
  var cart = JSON.parse(localStorage.getItem('cart')) || [];
  var productsArray = JSON.parse(localStorage.getItem('productsArray')) || [];
  var productToAdd = productsArray.find(product => product.id == productsId);

  if (productToAdd) {
    const existingProduct = cart.find(p => p.id === productToAdd.id);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      productToAdd.quantity = 1;
      cart.push(productToAdd);
    }


    var cartString = JSON.stringify(cart);
    localStorage.setItem('cart', cartString);
  }
}

function chargeProducts(productData) {
  const productosinfo = document.getElementById('product-info');

  productosinfo.innerHTML = `
    <h2>${productData.name}</h2>
    <p>${productData.description}</p>
    <p>Precio: ${productData.currency} ${productData.cost}</p>
    <button class="btn btn-primary m-2 comprar-btn" data-id="${productData.id}" onclick="alert('Producto agregado al carrito!'); addToCart('${productData.id}'); scrollUp();">Comprar</button>
  `;

  const productImages = productData.images;
  const length = productImages.length;
  const productImage = document.getElementById('carousel-container');

  productImage.innerHTML = ` 
    <div class="carousel-inner row">
      ${addImages(length, productImages)}
    
      <button class="carousel-control-prev" type="button" data-bs-target="#carousel-container" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carousel-container" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
    </div>
  `;

  const relProducts = document.getElementById('related-products');
  relProducts.innerHTML = `
    <h3>Productos relacionados</h3>
    <div class="row row-cols-1 row-cols-md-3 g-4">
      <div  id="rel-${productData.relatedProducts[0].id}" class="col" onclick="chargeSelectedProduct('${productData.relatedProducts[0].id}'); window.scrollTo({ top: 0, behavior: 'smooth' });">
        <img src="${productData.relatedProducts[0].image}" alt="${productData.relatedProducts[0].name}" class="img-thumbnail">
        <p>${productData.relatedProducts[0].name}</p>
      </div>
      <div  id="rel-${productData.relatedProducts[1].id}" class="col" onclick="chargeSelectedProduct('${productData.relatedProducts[1].id}'); window.scrollTo({ top: 0, behavior: 'smooth' });">
        <img src="${productData.relatedProducts[1].image}" alt="${productData.relatedProducts[1].name}" class="img-thumbnail">
        <p>${productData.relatedProducts[1].name}</p>
      </div>
    </div>
  `;
}

function chargeSelectedProduct(productId) {
  getData(productId)
    .then(data => {
      productData = data;
      chargeProducts(productData);
      clearComments();
      getCommentsList(productId);
    })
    .catch(error => {
      console.error("Error al cargar los detalles del producto:", error);
    });
}

document.addEventListener("DOMContentLoaded", function () {
  if (selectedProduct) {
    getCommentsList(selectedProduct.id);
    getData(selectedProduct.id)

      .then(data => {
        productData = data;
        chargeProducts(productData);
      })
      .catch(error => {
        console.error("Error al cargar los detalles del producto:", error);
      });
  } else {
    console.error("No se ha seleccionado un producto.");
  }
});



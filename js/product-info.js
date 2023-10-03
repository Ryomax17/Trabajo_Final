  const selectedProductJSON = localStorage.getItem('selectedProduct');
  const selectedProduct = JSON.parse(selectedProductJSON);
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  const user = JSON.parse(localStorage.getItem("usuarioChange"));
  let productData = {};
  let commentsData = [];
  let rate = 0;

  async function obtenerDatos(select) {
    const respuesta = await fetch(`https://japceibal.github.io/emercado-api/products/${select}.json`);
    productData = await respuesta.json();
    return productData;
  }

  function addStars(starsQty) {
    if (starsQty < 1 || starsQty > 5) {
      return '';
    }

    let estrellasHTML = '';

    for (let i = 0; i < starsQty; i++) {
      estrellasHTML += '<span class="fa fa-star checked stari"></span>';
    }

    for (let i = starsQty; i < 5; i++) {
      estrellasHTML += '<span class="fa fa-star stari"></span>';
    }

    return estrellasHTML;
  }

  function getRate(puntuacion) {
    rate = puntuacion;
    let botones = document.querySelectorAll('.fa.fa-star.checked-btn');

    botones.forEach(boton => {
      boton.classList = 'fa fa-star checked-btn';
    });

    let botonSeleccionado = botones[puntuacion - 1];
    botonSeleccionado.classList.add('-active');
  }

  function obtenerFechaActual() {
    const fechaHoraActual = new Date();
    const anio = fechaHoraActual.getFullYear();
    const mes = String(fechaHoraActual.getMonth() + 1).padStart(2, '0'); // Sumamos 1 a getMonth porque los meses comienzan desde 0
    const dia = String(fechaHoraActual.getDate()).padStart(2, '0');
    const horas = String(fechaHoraActual.getHours()).padStart(2, '0');
    const minutos = String(fechaHoraActual.getMinutes()).padStart(2, '0');
    const segundos = String(fechaHoraActual.getSeconds()).padStart(2, '0');

    const fechaHoraFormateada = `${anio}-${mes}-${dia} ${horas}:${minutos}:${segundos}`;
    return fechaHoraFormateada;
  }

  function addComments() {
    let newComment = document.getElementById("add-comments-box");
    let commentsSection = "";
    let fechaHoraActual = obtenerFechaActual();
    if (rate > 0 && rate < 6) {
      commentsSection += `
        <div class="comment">
          <span style="font-weight: bold">${user.nombre}_${user.apellido}</span>
          <span> - ${fechaHoraActual} - </span>
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
    let htmlContentToAppend = "";
    for (let i = 0; i < array.length; i++) {
      let comments = array[i];
      // console.log(comments);
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

    console.log(imagesQty);
    console.log(objImages);

    imagesHTML += 
      `<div class="carousel-item active">
        <img src="${objImages[0]}" class="d-block w-100" alt="...">
      </div>`;

    for (let i = 1; i < imagesQty; i++) {
      imagesHTML += 
      `<div class="carousel-item">
        <img src="${objImages[i]}" class="d-block w-100" alt="...">
      </div>`;
    }
    console.log(imagesHTML);

    return imagesHTML;
  }

  function cargarProducto(productData) {
    const productosinfo = document.getElementById('product-info');
    
    productosinfo.innerHTML = `
      <h2>${productData.name}</h2>
      <p>${productData.description}</p>
      <p>Precio: ${productData.currency} ${productData.cost}</p>`;

      
    const productImages = productData.images;
    const length = productImages.length;
    const productImage = document.getElementById('carousel-container');
    

    productImage.innerHTML = ` 
      <div class="carousel-inner">
        ${addImages(length, productImages)}
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carousel-container" data-bs-slide="prev">
       <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
     </button>
     <button class="carousel-control-next" type="button" data-bs-target="#carousel-container" data-bs-slide="next">
       <span class="carousel-control-next-icon" aria-hidden="true"></span>
       <span class="visually-hidden">Next</span>
      </button>`

    const relProducts = document.getElementById('related-products');
    relProducts.innerHTML = `
      <h3>Productos relacionados</h3>
      <div class="row row-cols-1 row-cols-md-3 g-4">
        <div  id="${productData.relatedProducts[0].id}" class="col" onclick="cargarProductoSeleccionado('${productData.relatedProducts[0].id}')">
          <img src="${productData.relatedProducts[0].image}" alt="${productData.relatedProducts[0].name}" class="img-thumbnail">
          <p>${productData.relatedProducts[0].name}</p>
        </div>
        <div  id="${productData.relatedProducts[1].id}" class="col" onclick="cargarProductoSeleccionado('${productData.relatedProducts[1].id}')">
          <img src="${productData.relatedProducts[1].image}" alt="${productData.relatedProducts[1].name}" class="img-thumbnail">
          <p>${productData.relatedProducts[1].name}</p>
        </div>
      `;

  }

  function cargarProductoSeleccionado(productId) {
    obtenerDatos(productId)
      .then(data => {
        productData = data;
        cargarProducto(productData);
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
      obtenerDatos(selectedProduct.id)
      
        .then(data => {
          productData = data;
          cargarProducto(productData);
        })
        .catch(error => {
          console.error("Error al cargar los detalles del producto:", error);
        });
} else {
    console.error("No se ha seleccionado un producto.");
}
    });

    

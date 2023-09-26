const selectedProductJSON = localStorage.getItem('selectedProduct');
const selectedProduct = JSON.parse(selectedProductJSON);
const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
const user = JSON.parse(localStorage.getItem("usuarioChange"));
console.log(user);
productData = [];
let rate = 0;

  async function obtenerDatos(select) {
    const respuesta = await fetch(`https://japceibal.github.io/emercado-api/products/${select}.json`);
    productData = await respuesta.json();
    return productData;
    console.log(productData);
  }

  function addStars(starsQty) {
    if (starsQty < 1 || starsQty > 5) {
      return ''; 
    }
  
    let estrellasHTML = '';
  
    for (let i = 0; i < starsQty; i++) {
      estrellasHTML += '<span class="fa fa-star checked"></span>';
    }
  
    for (let i = starsQty; i < 5; i++) {
      estrellasHTML += '<span class="fa fa-star"></span>';
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
  
  function addComments(){
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
            document.getElementById("comments-container").innerHTML += commentsSection;
    } else {
      alert("Seleciona una puntacion");
    }
  }
  

  function getCommentsList(array) {
    let htmlContentToAppend = "";
    for (let i = 0; i < array.length; i++) {
        let comments = array[i];
        console.log(comments);
        let commentsSection = "";
        
        
            commentsSection += `
                <div class="comment">
                <span style="font-weight: bold">${comments.user}</span>
                <span> - ${comments.dateTime} - </span>
                ${addStars(comments.score)}
                <p>${comments.description}</p>
                </div>
            `;
            document.getElementById("comments-container").innerHTML += commentsSection;  
      }
    }

document.addEventListener("DOMContentLoaded", function() {


if (selectedProduct) {
    obtenerDatos(selectedProduct.id);
    fetch(`https://japceibal.github.io/emercado-api/products_comments/${selectedProduct.id}.json`) 
    .then(response => response.json())
    .then(data => {
        let commentsData = data;
        console.log(commentsData);
        const productosinfo = document.getElementById('product-info');
        productosinfo.innerHTML = `
        <h2>${productData.name}</h2>
        <p>${productData.description}</p>
        <p>Precio: ${productData.currency} ${productData.cost}</p>
        `;
        
        
        const productImages = productData.images;
        const productImage = document.getElementById('product-image');
        const prevButton = document.getElementById('prev-button');
        const nextButton = document.getElementById('next-button');
        let currentImageIndex = 0;
        
        function updateImage() {
            const imageUrl = productImages[currentImageIndex];
            productImage.src = imageUrl;
        }
        
        prevButton.addEventListener('click', () => {
                if (currentImageIndex > 0) {
                    currentImageIndex--;
                    updateImage();
                }
            });
            
            nextButton.addEventListener('click', () => {
                if (currentImageIndex < productImages.length - 1) {
                    currentImageIndex++;
                    updateImage();
                }
            });
            updateImage();
            getCommentsList(commentsData);
        })
        .catch(error => {
            console.error("Error al cargar los detalles del producto:", error);
        });
} else {
    console.error("No se ha seleccionado un producto.");
}
    });

    function toggleMode() {
      const body = document.body;
      body.classList.toggle('day-mode');
      body.classList.toggle('night-mode');
    }